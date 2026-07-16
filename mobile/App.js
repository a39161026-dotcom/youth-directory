import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text, BackHandler } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PendingApprovalScreen from "./screens/PendingApprovalScreen";
import DirectoryScreen from "./screens/DirectoryScreen";
import AdminApprovalScreen from "./screens/AdminApprovalScreen";
import { login, logout, fetchMyTeacherStatus } from "./api/auth";
import { loadStoredTokens } from "./api/client";

// Render 무료 서버는 15분 넘게 요청이 없으면 잠드는데, 깨어나는 데
// 몇십 초 걸릴 수 있어서 바로 실패 처리하지 않고 몇 번 재시도함
async function fetchMyTeacherStatusWithRetry(maxAttempts = 4) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fetchMyTeacherStatus();
    } catch (e) {
      if (attempt === maxAttempts) throw e;
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
  }
}

// stage: 'boot' | 'login' | 'signup' | 'checking' | 'pending' | 'main' | 'admin'
export default function App() {
  const [stage, setStage] = useState("boot");
  const [teacher, setTeacher] = useState(null);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (stage === "admin") {
        setStage("main");
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [stage]);

  // 앱을 껐다 켜도 저장된 토큰이 있으면 자동으로 로그인 상태 유지
  useEffect(() => {
    (async () => {
      const hasToken = await loadStoredTokens();
      if (!hasToken) {
        setStage("login");
        return;
      }
      try {
        const status = await fetchMyTeacherStatusWithRetry();
        if (status.is_teacher) {
          setTeacher({
            name: status.name,
            org: status.org,
            photoUrl: status.photo_url,
            isAdmin: status.is_admin,
            onLogout: handleLogout,
            onOpenAdmin: () => setStage("admin"),
          });
          setStage("main");
        } else {
          setPendingEmail(status.email);
          setStage("pending");
        }
      } catch (e) {
        setStage("login");
      }
    })();
  }, []);

  const handleLogin = async (username, password) => {
    setStage("checking");
    setLoginError(null);
    try {
      await login(username, password);
      const status = await fetchMyTeacherStatus();

      if (status.is_teacher) {
        setTeacher({
          name: status.name,
          org: status.org,
          photoUrl: status.photo_url,
          isAdmin: status.is_admin,
          onLogout: handleLogout,
          onOpenAdmin: () => setStage("admin"),
        });
        setStage("main");
      } else {
        setPendingEmail(status.email);
        setStage("pending");
      }
    } catch (e) {
      setLoginError("로그인에 실패했어요. 아이디/비밀번호를 확인해주세요.");
      setStage("login");
    }
  };

  const handleLogout = async () => {
    await logout();
    setTeacher(null);
    setPendingEmail(null);
    setStage("login");
  };

  if (stage === "boot" || stage === "checking") {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#6B4FA8" size="large" />
      </View>
    );
  }

  if (stage === "pending") {
    return <PendingApprovalScreen email={pendingEmail} onLogout={handleLogout} />;
  }

  if (stage === "main") {
    return <DirectoryScreen teacher={teacher} />;
  }

  if (stage === "admin") {
    return (
      <View style={{ flex: 1 }}>
        <AdminApprovalScreen />
        <TouchableOpacity
          style={styles.backToMain}
          onPress={() => setStage("main")}
        >
          <Text style={styles.backToMainText}>‹ 주소록으로</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (stage === "signup") {
    return (
      <SignupScreen
        onSignedUp={() => setStage("pending")}
        onBackToLogin={() => setStage("login")}
      />
    );
  }

  return (
    <LoginScreen
      onLogin={handleLogin}
      onGoSignup={() => setStage("signup")}
      error={loginError}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FBF7F0" },
  backToMain: {
    position: "absolute",
    top: 54,
    left: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    elevation: 3,
  },
  backToMainText: { color: "#1F2A44", fontWeight: "700" },
});
