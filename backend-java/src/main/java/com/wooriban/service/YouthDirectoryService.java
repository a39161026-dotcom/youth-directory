package com.wooriban.service;

import com.wooriban.domain.*;
import com.wooriban.dto.*;
import com.wooriban.repository.*;
import com.wooriban.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
            return new MeResponse(false, null, null, null, null, user.getEmail(), null, null);
        }

        String displayName = (user.getFirstName() != null && !user.getFirstName().isBlank())
                ? user.getFirstName() : user.getUsername();

        Long assignedId = teacher.getAssignedClassGroup() != null ? teacher.getAssignedClassGroup().getId() : null;
        String assignedName = teacher.getAssignedClassGroup() != null ? teacher.getAssignedClassGroup().getName() : null;

        return new MeResponse(true, user.isStaff(), displayName, "광주봉선교회", user.getPhotoUrl(), user.getEmail(), assignedId, assignedName);
    }

    // ---------- 승인 요청 생성 ----------
    @Transactional
    public YouthTeacher requestAccess(Long classGroupId) {
        User user = currentUserProvider.get();
        YouthTeacher teacher = youthTeacherRepository.findByUser(user)
                .orElseGet(() -> new YouthTeacher(user));

        if (classGroupId != null) {
            classGroupRepository.findById(classGroupId).ifPresent(teacher::setAssignedClassGroup);
        }

        return youthTeacherRepository.save(teacher);
    }

    @Transactional
    public MeResponse updateMyAssignedClassGroup(Long classGroupId) {
        User user = currentUserProvider.get();
        YouthTeacher teacher = youthTeacherRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("선생님 정보를 찾을 수 없습니다."));

        if (classGroupId == null) {
            teacher.setAssignedClassGroup(null);
        } else {
            ClassGroup group = classGroupRepository.findById(classGroupId)
                    .orElseThrow(() -> new IllegalArgumentException("분반을 찾을 수 없습니다."));
            teacher.setAssignedClassGroup(group);
        }
        youthTeacherRepository.save(teacher);

        return me();
    }

    // ---------- 분반 ----------
    public List<ClassGroupResponse> listClassGroups() {
        return classGroupRepository.findAllByOrderBySortOrderAscNameAsc()
                .stream().map(ClassGroupResponse::new).collect(Collectors.toList());
    }

    // ---------- 학생 ----------
    public List<StudentResponse> listStudents(String search, Long classGroupId, String gradeLabel) {
        List<Student> students;
        boolean hasSearch = search != null && !search.isBlank();
        boolean hasGroup = classGroupId != null;
        boolean hasGrade = gradeLabel != null && !gradeLabel.isBlank();

        if (hasSearch && hasGroup) {
            students = studentRepository.findByIsActiveTrueAndNameContainingIgnoreCaseAndClassGroup_Id(search, classGroupId);
        } else if (hasSearch && hasGrade) {
            students = studentRepository.findByIsActiveTrueAndNameContainingIgnoreCaseAndClassGroup_GradeLabel(search, gradeLabel);
        } else if (hasSearch) {
            students = studentRepository.findByIsActiveTrueAndNameContainingIgnoreCase(search);
        } else if (hasGroup) {
            students = studentRepository.findByIsActiveTrueAndClassGroup_Id(classGroupId);
        } else if (hasGrade) {
            students = studentRepository.findByIsActiveTrueAndClassGroup_GradeLabel(gradeLabel);
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
        if (req.getRegion() != null) student.setRegion(req.getRegion());
        if (req.getMemo() != null) student.setMemo(req.getMemo());
        if (req.getIsActive() != null) student.setActive(req.getIsActive());
    }

    // ---------- CSV 학생 일괄 등록 ----------
    // 예상 헤더 순서: 이름,반,학년,성별,학생연락처,부모연락처,구역,생년월일
    private static final DateTimeFormatter[] DATE_FORMATS = {
            DateTimeFormatter.ofPattern("yyyy-MM-dd"),
            DateTimeFormatter.ofPattern("yyyy.MM.dd"),
            DateTimeFormatter.ofPattern("yyyy/MM/dd"),
    };

    @Transactional
    public StudentImportResult importStudentsFromCsv(MultipartFile file) {
        StudentImportResult result = new StudentImportResult();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            String line = reader.readLine(); // 헤더 줄은 건너뜀
            int rowNumber = 1;

            while ((line = reader.readLine()) != null) {
                rowNumber++;
                if (line.isBlank()) continue;

                // 간단한 콤마 분리 (필드 안에 콤마가 없다는 전제)
                String[] cols = line.split(",", -1);
                for (int i = 0; i < cols.length; i++) {
                    cols[i] = cols[i].trim();
                    if (cols[i].startsWith("\"") && cols[i].endsWith("\"") && cols[i].length() >= 2) {
                        cols[i] = cols[i].substring(1, cols[i].length() - 1);
                    }
                }

                try {
                    String name = col(cols, 0);
                    if (name == null || name.isBlank()) {
                        result.addError(rowNumber, "이름이 비어있음");
                        continue;
                    }

                    Student student = new Student();
                    student.setName(name);

                    String className = col(cols, 1);
                    if (className != null && !className.isBlank()) {
                        ClassGroup group = classGroupRepository.findByNameIgnoreCase(className).orElse(null);
                        if (group == null) {
                            result.addError(rowNumber, "'" + className + "' 반을 찾을 수 없음");
                            continue;
                        }
                        student.setClassGroup(group);
                    }

                    student.setSchoolGrade(col(cols, 2));

                    String genderRaw = col(cols, 3);
                    if (genderRaw != null && !genderRaw.isBlank()) {
                        student.setGender(parseGender(genderRaw));
                    }

                    student.setPhone(col(cols, 4));
                    student.setParentPhone(col(cols, 5));
                    student.setRegion(col(cols, 6));

                    String birthRaw = col(cols, 7);
                    if (birthRaw != null && !birthRaw.isBlank()) {
                        LocalDate parsed = parseDate(birthRaw);
                        if (parsed == null) {
                            result.addError(rowNumber, "생년월일 형식을 읽을 수 없음: " + birthRaw);
                            continue;
                        }
                        student.setBirthdate(parsed);
                    }

                    studentRepository.save(student);
                    result.addSuccess();
                } catch (Exception rowEx) {
                    result.addError(rowNumber, "처리 중 오류: " + rowEx.getMessage());
                }
            }
        } catch (IOException e) {
            throw new IllegalArgumentException("CSV 파일을 읽을 수 없습니다: " + e.getMessage());
        }

        return result;
    }

    private String col(String[] cols, int idx) {
        if (idx >= cols.length) return null;
        String v = cols[idx];
        return (v == null || v.isBlank()) ? null : v;
    }

    private Student.Gender parseGender(String raw) {
        String v = raw.trim();
        if (v.equalsIgnoreCase("M") || v.equals("남") || v.equals("남자")) return Student.Gender.M;
        if (v.equalsIgnoreCase("F") || v.equals("여") || v.equals("여자")) return Student.Gender.F;
        throw new IllegalArgumentException("알 수 없는 성별 값: " + raw);
    }

    private LocalDate parseDate(String raw) {
        for (DateTimeFormatter fmt : DATE_FORMATS) {
            try {
                return LocalDate.parse(raw.trim(), fmt);
            } catch (Exception ignored) {
            }
        }
        return null;
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
