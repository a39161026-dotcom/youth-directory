package com.wooriban.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

// 지금은 서버 로컬 디스크에 저장. 나중에 배포 시엔 S3 등으로 바꿔도
// 이 클래스만 교체하면 되게 분리해둠.
@Service
public class FileStorageService {

    private final Path root;

    public FileStorageService(@Value("${app.upload.dir}") String uploadDir) {
        this.root = Paths.get(uploadDir);
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("업로드 폴더 생성 실패", e);
        }
    }

    /** 저장 후 "/uploads/파일명" 형태의 상대 경로(URL 경로)를 반환 */
    public String store(MultipartFile file, String subDir) {
        if (file == null || file.isEmpty()) return null;

        try {
            Path dir = root.resolve(subDir);
            Files.createDirectories(dir);

            String ext = getExtension(file.getOriginalFilename());
            String filename = UUID.randomUUID() + ext;

            Path target = dir.resolve(filename);
            Files.copy(file.getInputStream(), target);

            return "/uploads/" + subDir + "/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패", e);
        }
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return ".jpg";
        return filename.substring(filename.lastIndexOf('.'));
    }
}
