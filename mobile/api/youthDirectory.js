// 말씀체크에 이미 있는 인증된 axios 인스턴스를 그대로 가져다 씀
// (baseURL + 토큰 헤더 세팅이 이미 되어있다고 가정, 파일 경로만 맞춰줘)
import api from "./client";

export async function fetchClassGroups() {
  const res = await api.get("/youth-directory/class-groups/");
  return res.data;
}

export async function fetchStudents({ search = "", classGroupId = null, gradeLabel = null } = {}) {
  const params = {};
  if (search) params.search = search;
  if (classGroupId) params.class_group = classGroupId;
  if (gradeLabel) params.grade_label = gradeLabel;

  const res = await api.get("/youth-directory/students/", { params });
  return res.data;
}

// 403이면 "선생님 권한 없음" 상태로 분기하기 쉽게 에러를 그대로 던짐

// 이미 승인된 선생님이 나중에 담당 분반을 설정/변경할 때
export async function updateAssignedClassGroup(classGroupId) {
  const params = {};
  if (classGroupId) params.class_group_id = classGroupId;
  const res = await api.patch("/youth-directory/me/assigned-class-group/", null, { params });
  return res.data;
}
