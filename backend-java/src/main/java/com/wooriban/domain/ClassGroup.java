package com.wooriban.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "class_groups")
@Getter
@Setter
@NoArgsConstructor
public class ClassGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "grade_label")
    private String gradeLabel;

    private Integer sortOrder = 0;

    public ClassGroup(String name, String gradeLabel, Integer sortOrder) {
        this.name = name;
        this.gradeLabel = gradeLabel;
        this.sortOrder = sortOrder;
    }
}
