package com.wooriban.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

// ImgBB에 업로드해서 영구적인 이미지 URL을 받아옴.
// Render 무료 플랜은 로컬 디스크가 재배포/재시작될 때 초기화되기 때문에,
// 서버 자체 디스크 저장 대신 외부 이미지 호스팅(ImgBB)을 사용함.
@Service
public class FileStorageService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.imgbb.key:4bbf53f39b1da4906d64f55fdb95b3cf}")
    private String imgbbKey;

    /** 업로드 후 이미지의 전체 URL(https://...)을 반환 */
    public String store(MultipartFile file, String subDir) {
        if (file == null || file.isEmpty()) return null;
        try {
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename() != null ? file.getOriginalFilename() : "photo.jpg";
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", resource);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            String url = "https://api.imgbb.com/1/upload?key=" + imgbbKey;
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.postForObject(url, requestEntity, Map.class);

            if (response == null || !Boolean.TRUE.equals(response.get("success"))) {
                throw new RuntimeException("ImgBB 업로드 실패: " + response);
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> data = (Map<String, Object>) response.get("data");
            return (String) data.get("url");
        } catch (IOException e) {
            throw new RuntimeException("파일 읽기 실패", e);
        }
    }
}
