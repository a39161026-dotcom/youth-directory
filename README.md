# 우리반 백엔드 (Java / Spring Boot)

Django 버전을 대체하는 Spring Boot 백엔드. API 경로와 JSON 응답 형태는
기존 모바일 앱(`mobile/`)과 100% 동일하게 맞춰놨어서 **앱 쪽 코드는 손 안 대도 돼.**

## ⚠️ 알아둘 것
이 프로젝트는 이 환경(샌드박스)에서 **Maven Central 접속이 막혀있어서 실제 컴파일 검증을 못 했어.**
Django 버전은 `migrate`까지 직접 돌려서 확인했지만, 이 Java 버전은 코드 리뷰로 논리적 정합성만
꼼꼼히 확인한 상태야. 그러니 **처음 실행할 때 컴파일 에러가 날 수 있고, 나면 그 에러 메시지
그대로 알려줘 — 바로 고쳐줄게.**

## 1. 로컬 실행 (가장 빠른 방법 — H2 인메모리 DB)

```bash
cd backend-java
mvn spring-boot:run
```

별도 설정 없이 바로 실행돼. 데이터베이스는 메모리에 저장되는 H2를 기본값으로 써서
서버를 끄면 데이터가 사라져 (테스트용).

서버 켜지면:
- API: `http://localhost:8000`
- H2 콘솔(DB 내용 브라우저에서 보기/입력하기): `http://localhost:8000/h2-console`
  - JDBC URL: `jdbc:h2:mem:wooriban`
  - Username: `sa`, Password: (비워두기)

## 2. Neon(PostgreSQL)에 연결하기

Neon에서 받은 연결 문자열은 보통 이런 형태야:
```
postgresql://user:password@ep-xxxx.neon.tech/dbname?sslmode=require
```

**Java(JDBC)는 형식이 조금 달라서 이렇게 바꿔줘야 해:**
```
jdbc:postgresql://ep-xxxx.neon.tech/dbname?sslmode=require
```
(맨 앞에 `jdbc:` 붙이고, `postgresql://` 뒤 유저명:비번 부분은 따로 분리)

환경변수로 실행:
```bash
export DATABASE_URL="jdbc:postgresql://ep-xxxx.neon.tech/dbname?sslmode=require"
export DATABASE_USERNAME="네온에서_받은_유저명"
export DATABASE_PASSWORD="네온에서_받은_비밀번호"
export JWT_SECRET="충분히_길고_랜덤한_문자열로_바꾸기"

mvn spring-boot:run
```

## 3. 초기 데이터 넣기 (분반, 관리자 승인)

Django admin 같은 화면이 Spring Boot엔 기본으로 없어서, 아래 중 하나로 대체:

**로컬(H2) 테스트 중이면** → `/h2-console` 접속해서 SQL로 직접 입력:
```sql
INSERT INTO class_groups (name, grade_label, sort_order) VALUES ('중1반', '중등', 1);

-- 회원가입 먼저 앱에서 하고 나서, users 테이블에서 id 확인 후:
INSERT INTO youth_teachers (user_id, status, is_active, requested_at)
VALUES (1, 'APPROVED', true, NOW());

-- 본인 계정을 관리자로 만들고 싶으면:
UPDATE users SET is_staff = true WHERE username = '본인아이디';
```

**Neon 쓸 때** → Neon 대시보드 안에 내장된 SQL 편집기에서 위와 동일한 쿼리 실행하면 돼.

## 4. API 목록 (Django 버전과 동일)

- `POST /api/auth/signup/` — 회원가입
- `POST /api/auth/login/` — 로그인 → `{ access, refresh }`
- `POST /api/auth/refresh/` — 토큰 갱신
- `GET /api/youth-directory/me/` — 내 승인 상태 확인
- `POST /api/youth-directory/request-access/` — 선생님 승인 요청
- `GET /api/youth-directory/class-groups/` — 분반 목록
- `GET /api/youth-directory/students/?search=&class_group=` — 학생 목록
- `POST /api/youth-directory/students/` — 학생 등록 (multipart, 사진 포함)
- `PATCH /api/youth-directory/students/{id}/` — 학생 수정
- `GET /api/youth-directory/admin/teacher-requests/?status=pending` — (관리자) 승인 대기 목록
- `POST /api/youth-directory/admin/teacher-requests/{id}/approve/` — (관리자) 승인
- `POST /api/youth-directory/admin/teacher-requests/{id}/reject/` — (관리자) 거절
- `POST /api/youth-directory/admin/teacher-requests/{id}/revoke/` — (관리자) 권한 회수

## 5. 모바일 앱 연결

`mobile/api/client.js`의 `BASE_URL`을 이 서버 주소로 맞추면 끝.
JWT 방식(`Bearer 토큰`)이라 앱 쪽 `api/auth.js`, `api/client.js`는 수정 없이 그대로 써도 돼.
