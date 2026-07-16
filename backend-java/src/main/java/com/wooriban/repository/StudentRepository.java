package com.wooriban.repository;

import com.wooriban.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByIsActiveTrueAndNameContainingIgnoreCase(String name);
    List<Student> findByIsActiveTrueAndClassGroup_Id(Long classGroupId);
    List<Student> findByIsActiveTrueAndNameContainingIgnoreCaseAndClassGroup_Id(String name, Long classGroupId);
    List<Student> findByIsActiveTrue();

    List<Student> findByIsActiveTrueAndClassGroup_GradeLabel(String gradeLabel);
    List<Student> findByIsActiveTrueAndNameContainingIgnoreCaseAndClassGroup_GradeLabel(String name, String gradeLabel);
}
