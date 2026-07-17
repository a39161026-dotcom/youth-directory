package com.wooriban.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MeResponse {

    @JsonProperty("is_teacher")
    private boolean teacher;

    @JsonProperty("is_admin")
    private Boolean admin;

    @JsonProperty("name")
    private String name;

    @JsonProperty("org")
    private String org;

    @JsonProperty("photo_url")
    private String photoUrl;

    @JsonProperty("email")
    private String email;

    @JsonProperty("assigned_class_group_id")
    private Long assignedClassGroupId;

    @JsonProperty("assigned_class_group_name")
    private String assignedClassGroupName;
}
