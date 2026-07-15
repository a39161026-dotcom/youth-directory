import api from "./client";

function buildFormData(values) {
  const form = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (key === "photo" && value?.uri) {
      form.append("photo", {
        uri: value.uri,
        name: value.fileName || "photo.jpg",
        type: value.mimeType || "image/jpeg",
      });
      return;
    }
    form.append(key, String(value));
  });
  return form;
}

export async function createStudent(values) {
  const res = await api.post("/youth-directory/students/", buildFormData(values), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateStudent(id, values) {
  const res = await api.patch(
    `/youth-directory/students/${id}/`,
    buildFormData(values),
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
}

export async function deactivateStudent(id) {
  const form = new FormData();
  form.append("is_active", "false");
  const res = await api.patch(`/youth-directory/students/${id}/`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
