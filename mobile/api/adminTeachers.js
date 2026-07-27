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
export async function promoteTeacher(id) {
  const res = await api.post(`/youth-directory/admin/teacher-requests/${id}/promote/`);
  return res.data;
}
export async function demoteTeacher(id) {
  const res = await api.post(`/youth-directory/admin/teacher-requests/${id}/demote/`);
  return res.data;
}
export async function importStudentsCsv(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/youth-directory/students/import-csv/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
