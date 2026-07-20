package com.wooriban.repository;
import com.wooriban.domain.ClassGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface ClassGroupRepository extends JpaRepository<ClassGroup, Long> {
    List<ClassGroup> findAllByOrderBySortOrderAscNameAsc();
    Optional<ClassGroup> findByNameIgnoreCase(String name);
}
