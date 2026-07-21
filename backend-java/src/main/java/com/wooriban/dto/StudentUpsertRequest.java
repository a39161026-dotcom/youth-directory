package com.wooriban.dto;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class StudentUpsertRequest {
    private String name;
    private String gender;
    private Long classGroup;
    private String schoolGrade;
    private String school;
    private String phone;
    private String parentPhone;
    private String parentName;
    private String region;
    private String memo;
    private Boolean isActive;
}
