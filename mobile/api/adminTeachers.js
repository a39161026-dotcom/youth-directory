import api from "./client";

export async function fetchTeacherRequests(status = "pending") {
  const res = await api.get("/youth-directory/admin/teacher-requests/", {
    params: { status },
  });
  return res.data;
}

export async function approveTeacher(id) {
  const res = await api.post(`/youth-directory/admin/teacher-requests/${id}/approve/`);
  return res.data;
}

export async function rejectTeacher(id) {
  const res = await api.post(`/youth-directory/admin/teacher-requests/${id}/reject/`);
  return res.data;
}

export async function revokeTeacher(id) {
  const res = await api.post(`/youth-directory/admin/teacher-requests/${id}/revoke/`);
  return res.data;
}
