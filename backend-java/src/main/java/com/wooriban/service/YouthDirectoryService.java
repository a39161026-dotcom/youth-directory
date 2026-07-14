package com.wooriban.service;

import com.wooriban.domain.*;
import com.wooriban.dto.*;
import com.wooriban.repository.*;
import com.wooriban.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class YouthDirectoryService {

    private final ClassGroupRepository classGroupRepository;
    private final StudentRepository studentRepository;
    private final YouthTeacherRepository youthTeacherRepository;
    private final CurrentUserProvider currentUserProvider;
    private final FileStorageService fileStorageService;

    // ---------- 내 상태 확인 ----------
    public MeResponse me() {
        User user = currentUserProvider.get();
        YouthTeacher teacher = youthTeacherRepository.findByUser(user).orElse(null);

        if (teacher == null || !teacher.isActive()) {
            return new MeResponse(false, null, null, null, null, user.getEmail());
        }

        String displayName = (user.getFirstName() != null && !user.getFirstName().isBlank())
                ? user.getFirstName() : user.getUsername();

        return new MeResponse(true, user.isStaff(), displayName, "광주봉선교회", user.getPhotoUrl(), user.getEmail());
    }

    // ---------- 승인 요청 생성 ----------
    @Transactional
    public YouthTeacher requestAccess() {
        User user = currentUserProvider.get();
        return youthTeacherRepository.findByUser(user)
                .orElseGet(() -> youthTeacherRepository.save(new YouthTeacher(user)));
    }

    // ---------- 분반 ----------
    public List<ClassGroupResponse> listClassGroups() {
        return classGroupRepository.findAllByOrderBySortOrderAscNameAsc()
                .stream().map(ClassGroupResponse::new).collect(Collectors.toList());
    }

    // ---------- 학생 ----------
    public List<StudentResponse> listStudents(String search, Long classGroupId) {
        List<Student> students;
        boolean hasSearch = search != null && !search.isBlank();
        boolean hasGroup = classGroupId != null;

        if (hasSearch && hasGroup) {
            students = studentRepository.findByIsActiveTrueAndNameContainingIgnoreCaseAndClassGroup_Id(search, classGroupId);
        } else if (hasSearch) {
            students = studentRepository.findByIsActiveTrueAndNameContainingIgnoreCase(search);
        } else if (hasGroup) {
            students = studentRepository.findByIsActiveTrueAndClassGroup_Id(classGroupId);
        } else {
            students = studentRepository.findByIsActiveTrue();
        }

        return students.stream().map(StudentResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public StudentResponse createStudent(StudentUpsertRequest req, MultipartFile photo) {
        Student student = new Student();
        applyUpsert(student, req);
        if (photo != null && !photo.isEmpty()) {
            student.setPhotoUrl(fileStorageService.store(photo, "students"));
        }
        return new StudentResponse(studentRepository.save(student));
    }

    @Transactional
    public StudentResponse updateStudent(Long id, StudentUpsertRequest req, MultipartFile photo) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("학생을 찾을 수 없습니다."));
        applyUpsert(student, req);
        if (photo != null && !photo.isEmpty()) {
            student.setPhotoUrl(fileStorageService.store(photo, "students"));
        }
        return new StudentResponse(studentRepository.save(student));
    }

    private void applyUpsert(Student student, StudentUpsertRequest req) {
        if (req.getName() != null) student.setName(req.getName());
        if (req.getGender() != null) student.setGender(Student.Gender.valueOf(req.getGender()));
        if (req.getClassGroup() != null) {
            ClassGroup group = classGroupRepository.findById(req.getClassGroup()).orElse(null);
            student.setClassGroup(group);
        }
        if (req.getSchoolGrade() != null) student.setSchoolGrade(req.getSchoolGrade());
        if (req.getPhone() != null) student.setPhone(req.getPhone());
        if (req.getParentPhone() != null) student.setParentPhone(req.getParentPhone());
        if (req.getMemo() != null) student.setMemo(req.getMemo());
        if (req.getIsActive() != null) student.setActive(req.getIsActive());
    }

    // ---------- 관리자: 선생님 승인 ----------
    public List<TeacherRequestResponse> listTeacherRequests(String status) {
        List<YouthTeacher> list;
        if (status == null || status.equalsIgnoreCase("all")) {
            list = youthTeacherRepository.findAllByOrderByRequestedAtDesc();
        } else {
            list = youthTeacherRepository.findByStatusOrderByRequestedAtDesc(
                    YouthTeacher.Status.valueOf(status.toUpperCase()));
        }
        return list.stream().map(TeacherRequestResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public TeacherRequestResponse approveTeacher(Long id) {
        YouthTeacher t = getTeacherOrThrow(id);
        t.setStatus(YouthTeacher.Status.APPROVED);
        t.setActive(true);
        t.setDecidedAt(LocalDateTime.now());
        return new TeacherRequestResponse(youthTeacherRepository.save(t));
    }

    @Transactional
    public TeacherRequestResponse rejectTeacher(Long id) {
        YouthTeacher t = getTeacherOrThrow(id);
        t.setStatus(YouthTeacher.Status.REJECTED);
        t.setActive(false);
        t.setDecidedAt(LocalDateTime.now());
        return new TeacherRequestResponse(youthTeacherRepository.save(t));
    }

    @Transactional
    public TeacherRequestResponse revokeTeacher(Long id) {
        YouthTeacher t = getTeacherOrThrow(id);
        t.setActive(false);
        t.setStatus(YouthTeacher.Status.REJECTED);
        t.setDecidedAt(LocalDateTime.now());
        return new TeacherRequestResponse(youthTeacherRepository.save(t));
    }

    private YouthTeacher getTeacherOrThrow(Long id) {
        return youthTeacherRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("요청을 찾을 수 없습니다."));
    }
}
