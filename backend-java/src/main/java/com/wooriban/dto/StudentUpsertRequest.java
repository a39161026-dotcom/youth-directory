package com.wooriban.dto;

import lombok.Getter;
import lombok.Setter;

// multipart/form-data로 오는 학생 등록/수정 요청 (사진은 별도 MultipartFile 파라미터로 받음)
@Getter
@Setter
public class StudentUpsertRequest {
    private String name;
    private String gender; // "M" | "F"
    private Long classGroup;
    private String schoolGrade;
    private String phone;
    private String parentPhone;
    private String memo;
    private Boolean isActive;
}
