package com.wooriban.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

// 필드명을 일부러 "is_" 접두사 없이 만들고 @JsonProperty로 JSON 키를 직접 고정함.
// (Lombok의 boolean is-getter와 Jackson의 프로퍼티 추론이 겹치면
//  "is_active"가 아니라 "active"로 어긋나는 경우가 있어서, 여기서는 그 문제를 피하려고
//  명시적으로 못박아 둠 - 프론트가 기대하는 snake_case 키와 100% 일치시키기 위함)
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
}
