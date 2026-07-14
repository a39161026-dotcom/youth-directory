package com.wooriban.repository;

import com.wooriban.domain.ClassGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassGroupRepository extends JpaRepository<ClassGroup, Long> {
    List<ClassGroup> findAllByOrderBySortOrderAscNameAsc();
}
