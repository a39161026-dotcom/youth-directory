package com.wooriban.repository;

import com.wooriban.domain.User;
import com.wooriban.domain.YouthTeacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface YouthTeacherRepository extends JpaRepository<YouthTeacher, Long> {
    Optional<YouthTeacher> findByUser(User user);
    List<YouthTeacher> findByStatusOrderByRequestedAtDesc(YouthTeacher.Status status);
    List<YouthTeacher> findAllByOrderByRequestedAtDesc();
}
