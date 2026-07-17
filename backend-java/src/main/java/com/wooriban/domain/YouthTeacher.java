package com.wooriban.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "youth_teachers")
@Getter
@Setter
@NoArgsConstructor
public class YouthTeacher {

    public enum Status { PENDING, APPROVED, REJECTED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = false;

    @Column(name = "requested_at")
    private LocalDateTime requestedAt = LocalDateTime.now();

    @Column(name = "decided_at")
    private LocalDateTime decidedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_class_group_id")
    private ClassGroup assignedClassGroup;

    public YouthTeacher(User user) {
        this.user = user;
    }
}
