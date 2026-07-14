package com.wooriban.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.wooriban.domain.ClassGroup;
import lombok.Getter;

@Getter
public class ClassGroupResponse {

    @JsonProperty("id")
    private final Long id;

    @JsonProperty("name")
    private final String name;

    @JsonProperty("grade_label")
    private final String gradeLabel;

    public ClassGroupResponse(ClassGroup g) {
        this.id = g.getId();
        this.name = g.getName();
        this.gradeLabel = g.getGradeLabel();
    }
}
