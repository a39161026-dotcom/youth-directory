// 말씀체크에 이미 있는 인증된 axios 인스턴스를 그대로 가져다 씀
// (baseURL + 토큰 헤더 세팅이 이미 되어있다고 가정, 파일 경로만 맞춰줘)
import api from "./client";

export async function fetchClassGroups() {
  const res = await api.get("/youth-directory/class-groups/");
  return res.data;
}

export async function fetchStudents({ search = "", classGroupId = null } = {}) {
  const params = {};
  if (search) params.search = search;
  if (classGroupId) params.class_group = classGroupId;

  const res = await api.get("/youth-directory/students/", { params });
  return res.data;
}

// 403이면 "선생님 권한 없음" 상태로 분기하기 쉽게 에러를 그대로 던짐
