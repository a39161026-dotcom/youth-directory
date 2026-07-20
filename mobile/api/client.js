import axios from "axios";
import * as SecureStore from "expo-secure-store";

// 실제 배포 주소로 바꿔줘 (Render 배포 URL)
const BASE_URL = "https://youth-directory.onrender.com/api";
const SERVER_ORIGIN = "https://youth-directory.onrender.com";

// 서버가 상대경로("/uploads/...")로 주는 사진 주소를 절대경로로 바꿔줌
export function getMediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${SERVER_ORIGIN}${path}`;
}

const api = axios.create({ baseURL: BASE_URL });

let accessToken = null;
let refreshToken = null;

export async function loadStoredTokens() {
  accessToken = await SecureStore.getItemAsync("access_token");
  refreshToken = await SecureStore.getItemAsync("refresh_token");
  if (accessToken) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  return Boolean(accessToken);
}

export async function saveTokens({ access, refresh }) {
  accessToken = access;
  refreshToken = refresh;
  api.defaults.headers.common.Authorization = `Bearer ${access}`;
  await SecureStore.setItemAsync("access_token", access);
  if (refresh) await SecureStore.setItemAsync("refresh_token", refresh);
}

export async function clearTokens() {
  accessToken = null;
  refreshToken = null;
  delete api.defaults.headers.common.Authorization;
  await SecureStore.deleteItemAsync("access_token");
  await SecureStore.deleteItemAsync("refresh_token");
}

// access token 만료(401) 시 refresh token으로 한 번 자동 재발급 후 재요청
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && refreshToken && !original._retry) {
      original._retry = true;
      try {
        const res = await axios.post(`${BASE_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });
        await saveTokens({ access: res.data.access, refresh: refreshToken });
        original.headers.Authorization = `Bearer ${res.data.access}`;
        return api(original);
      } catch (refreshError) {
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
