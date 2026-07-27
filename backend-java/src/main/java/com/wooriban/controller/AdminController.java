package com.wooriban.controller;

import com.wooriban.dto.TeacherRequestResponse;
import com.wooriban.service.YouthDirectoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 관리자(ROLE_ADMIN = User.isStaff)만 접근 가능
@RestController
@RequestMapping("/api/youth-directory/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final YouthDirectoryService service;

    @GetMapping("/teacher-requests/")
    public ResponseEntity<List<TeacherRequestResponse>> list(
            @RequestParam(required = false, defaultValue = "pending") String status
    ) {
        return ResponseEntity.ok(service.listTeacherRequests(status));
    }

    @PostMapping("/teacher-requests/{id}/approve/")
    public ResponseEntity<TeacherRequestResponse> approve(@PathVariable Long id) {
        return ResponseEntity.ok(service.approveTeacher(id));
    }

    @PostMapping("/teacher-requests/{id}/reject/")
    public ResponseEntity<TeacherRequestResponse> reject(@PathVariable Long id) {
        return ResponseEntity.ok(service.rejectTeacher(id));
    }

    @PostMapping("/teacher-requests/{id}/revoke/")
    public ResponseEntity<TeacherRequestResponse> revoke(@PathVariable Long id) {
        return ResponseEntity.ok(service.revokeTeacher(id));
    }
    @PostMapping("/teacher-requests/{id}/promote/")
    public ResponseEntity<TeacherRequestResponse> promote(@PathVariable Long id) {
        return ResponseEntity.ok(service.promoteToAdmin(id));
    }
    @PostMapping("/teacher-requests/{id}/demote/")
    public ResponseEntity<TeacherRequestResponse> demote(@PathVariable Long id) {
        return ResponseEntity.ok(service.demoteFromAdmin(id));
    }
    @DeleteMapping("/teacher-requests/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteTeacher(id);
        return ResponseEntity.noContent().build();
    }
}
