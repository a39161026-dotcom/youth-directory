package com.wooriban.controller;

import com.wooriban.dto.*;
import com.wooriban.service.YouthDirectoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/youth-directory")
@RequiredArgsConstructor
public class YouthDirectoryController {

    private final YouthDirectoryService service;

    @GetMapping("/me/")
    public ResponseEntity<MeResponse> me() {
        return ResponseEntity.ok(service.me());
    }

    @PatchMapping("/me/assigned-class-group/")
    public ResponseEntity<MeResponse> updateAssignedClassGroup(
            @RequestParam(value = "class_group_id", required = false) Long classGroupId
    ) {
        return ResponseEntity.ok(service.updateMyAssignedClassGroup(classGroupId));
    }

    @PostMapping("/request-access/")
    public ResponseEntity<?> requestAccess(
            @RequestParam(value = "class_group_id", required = false) Long classGroupId
    ) {
        service.requestAccess(classGroupId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/class-groups/")
    public ResponseEntity<List<ClassGroupResponse>> classGroups() {
        return ResponseEntity.ok(service.listClassGroups());
    }

    @GetMapping("/students/")
    public ResponseEntity<List<StudentResponse>> students(
            @RequestParam(required = false) String search,
            @RequestParam(value = "class_group", required = false) Long classGroup,
            @RequestParam(value = "grade_label", required = false) String gradeLabel
    ) {
        return ResponseEntity.ok(service.listStudents(search, classGroup, gradeLabel));
    }

    // multipart/form-data는 @ModelAttribute로 받으면 Jackson을 거치지 않아서
    // snake_case 폼 필드명(class_group, parent_phone 등)이 Java 프로퍼티명(camelCase)과
    // 자동으로 안 맞는다. 그래서 각 필드를 명시적으로 @RequestParam(name=...)으로 받는다.
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/students/", consumes = "multipart/form-data")
    public ResponseEntity<StudentResponse> createStudent(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String gender,
            @RequestParam(value = "class_group", required = false) Long classGroup,
            @RequestParam(value = "school_grade", required = false) String schoolGrade,
            @RequestParam(required = false) String phone,
            @RequestParam(value = "parent_phone", required = false) String parentPhone,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String memo,
            @RequestParam(value = "is_active", required = false) Boolean isActive,
            @RequestParam(required = false) MultipartFile photo
    ) {
        StudentUpsertRequest req = buildRequest(name, gender, classGroup, schoolGrade, phone, parentPhone, region, memo, isActive);
        return ResponseEntity.ok(service.createStudent(req, photo));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping(value = "/students/{id}/", consumes = "multipart/form-data")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String gender,
            @RequestParam(value = "class_group", required = false) Long classGroup,
            @RequestParam(value = "school_grade", required = false) String schoolGrade,
            @RequestParam(required = false) String phone,
            @RequestParam(value = "parent_phone", required = false) String parentPhone,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String memo,
            @RequestParam(value = "is_active", required = false) Boolean isActive,
            @RequestParam(required = false) MultipartFile photo
    ) {
        StudentUpsertRequest req = buildRequest(name, gender, classGroup, schoolGrade, phone, parentPhone, region, memo, isActive);
        return ResponseEntity.ok(service.updateStudent(id, req, photo));
    }

    // CSV 학생 일괄 등록
    // CSV 헤더 순서: 이름,반,학년,성별,학생연락처,부모연락처,구역,생년월일
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/students/import-csv/", consumes = "multipart/form-data")
    public ResponseEntity<StudentImportResult> importStudentsCsv(
            @RequestParam("file") MultipartFile file
    ) {
        return ResponseEntity.ok(service.importStudentsFromCsv(file));
    }

    private StudentUpsertRequest buildRequest(
            String name, String gender, Long classGroup, String schoolGrade,
            String phone, String parentPhone, String region, String memo, Boolean isActive
    ) {
        StudentUpsertRequest req = new StudentUpsertRequest();
        req.setName(name);
        req.setGender(gender);
        req.setClassGroup(classGroup);
        req.setSchoolGrade(schoolGrade);
        req.setPhone(phone);
        req.setParentPhone(parentPhone);
        req.setRegion(region);
        req.setMemo(memo);
        req.setIsActive(isActive);
        return req;
    }
}
