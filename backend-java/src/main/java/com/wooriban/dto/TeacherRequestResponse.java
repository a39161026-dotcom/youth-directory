package com.wooriban.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.wooriban.domain.YouthTeacher;
import lombok.Getter;

@Getter
public class TeacherRequestResponse {

    @JsonProperty("id")
    private final Long id;

    @JsonProperty("email")
    private final String email;

    @JsonProperty("username")
    private final String username;

    @JsonProperty("name")
    private final String name;

    @JsonProperty("status")
    private final String status;

    @JsonProperty("is_active")
    private final boolean active;

    @JsonProperty("requested_at")
    private final String requestedAt;

    @JsonProperty("decided_at")
    private final String decidedAt;

    public TeacherRequestResponse(YouthTeacher t) {
        this.id = t.getId();
        this.email = t.getUser().getEmail();
        this.username = t.getUser().getUsername();
        this.name = (t.getUser().getFirstName() != null && !t.getUser().getFirstName().isBlank())
                ? t.getUser().getFirstName() : t.getUser().getUsername();
        this.status = t.getStatus().name().toLowerCase();
        this.active = t.isActive();
        this.requestedAt = t.getRequestedAt() != null ? t.getRequestedAt().toString() : null;
        this.decidedAt = t.getDecidedAt() != null ? t.getDecidedAt().toString() : null;
    }
}
