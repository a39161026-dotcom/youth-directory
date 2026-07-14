package com.wooriban.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.wooriban.domain.Student;
import lombok.Getter;

@Getter
public class StudentResponse {

    @JsonProperty("id")
    private final Long id;

    @JsonProperty("name")
    private final String name;

    @JsonProperty("gender")
    private final String gender;

    @JsonProperty("class_group")
    private final Long classGroup;

    @JsonProperty("class_group_name")
    private final String classGroupName;

    @JsonProperty("school_grade")
    private final String schoolGrade;

    @JsonProperty("photo_url")
    private final String photoUrl;

    @JsonProperty("phone")
    private final String phone;

    @JsonProperty("parent_phone")
    private final String parentPhone;

    @JsonProperty("memo")
    private final String memo;

    @JsonProperty("is_active")
    private final boolean active;

    public StudentResponse(Student s) {
        this.id = s.getId();
        this.name = s.getName();
        this.gender = s.getGender() != null ? s.getGender().name() : null;
        this.classGroup = s.getClassGroup() != null ? s.getClassGroup().getId() : null;
        this.classGroupName = s.getClassGroup() != null ? s.getClassGroup().getName() : null;
        this.schoolGrade = s.getSchoolGrade();
        this.photoUrl = s.getPhotoUrl();
        this.phone = s.getPhone();
        this.parentPhone = s.getParentPhone();
        this.memo = s.getMemo();
        this.active = s.isActive();
    }
}
