import api, { saveTokens, clearTokens } from "./client";

export async function login(username, password) {
  const res = await api.post("/auth/login/", { username, password });
  await saveTokens({ access: res.data.access, refresh: res.data.refresh });
  return res.data;
}

export async function signup({ username, email, firstName, password }) {
  const res = await api.post("/auth/signup/", {
    username,
    email,
    first_name: firstName,
    password,
  });
  return res.data;
}

export async function logout() {
  await clearTokens();
}

// 로그인 직후 반드시 호출: 선생님 승인 여부 확인
export async function fetchMyTeacherStatus() {
  const res = await api.get("/youth-directory/me/");
  return res.data; // { is_teacher, is_admin?, name?, org?, photo_url?, email? }
}

// 회원가입 완료 후 1회 호출: "선생님 승인해주세요" 요청 생성
export async function requestTeacherAccess(classGroupId = null) {
  const params = {};
  if (classGroupId) params.class_group_id = classGroupId;
  const res = await api.post("/youth-directory/request-access/", null, { params });
  return res.data; // { status, is_active, created }
}
