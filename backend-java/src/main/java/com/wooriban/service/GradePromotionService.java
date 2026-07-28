package com.wooriban.service;

import com.wooriban.domain.Student;
import com.wooriban.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

// 매년 1월 1일, 학년을 한 단계씩 올리고 고3은 졸업 처리(삭제)한다.
@Slf4j
@Service
@RequiredArgsConstructor
public class GradePromotionService {

    private final StudentRepository studentRepository;

    private static final Map<String, String> NEXT_GRADE = Map.of(
            "중1", "중2",
            "중2", "중3",
            "중3", "고1",
            "고1", "고2",
            "고2", "고3"
    );

    // 매년 1월 1일 00:00 (한국 시간)에 자동 실행
    @Scheduled(cron = "0 0 0 1 1 *", zone = "Asia/Seoul")
    @Transactional
    public void promoteGrades() {
        run();
    }

    // 실제 처리 로직 (관리자가 수동으로도 호출 가능하도록 분리)
    @Transactional
    public GradePromotionResult run() {
        List<Student> students = studentRepository.findByIsActiveTrue();
        int promoted = 0;
        int graduated = 0;

        for (Student s : students) {
            String grade = s.getSchoolGrade();
            if (grade == null) continue;

            if ("고3".equals(grade)) {
                studentRepository.delete(s);
                graduated++;
            } else if (NEXT_GRADE.containsKey(grade)) {
                s.setSchoolGrade(NEXT_GRADE.get(grade));
                promoted++;
            }
        }

        log.info("학년 자동승급 완료: 승급 {}명, 졸업 처리(삭제) {}명", promoted, graduated);
        return new GradePromotionResult(promoted, graduated);
    }

    public record GradePromotionResult(int promotedCount, int graduatedCount) {}
}
