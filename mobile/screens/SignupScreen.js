import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { signup, login, requestTeacherAccess } from "../api/auth";

const TEAL = "#1E9E8C";

export default function SignupScreen({ onSignedUp, onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    setSubmitting(true);
    try {
      await signup({ username, email, firstName: name, password });
      // JWT는 자동 로그인이 안 되므로 가입 직후 바로 로그인해서 토큰 발급
      await login(username, password);
      await requestTeacherAccess();

      onSignedUp?.();
    } catch (e) {
      Alert.alert("회원가입 실패", "입력값을 확인하고 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.desc}>
          가입 후 중고등부 관리자 승인이 필요합니다.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSignup} disabled={submitting}>
          <Text style={styles.submitText}>{submitting ? "가입 중..." : "가입하기"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBackToLogin} style={{ marginTop: 16 }}>
          <Text style={styles.backText}>이미 계정이 있으신가요? 로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2F2F2" },
  container: { padding: 24, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: "800", color: "#2B2B2B", marginBottom: 8 },
  desc: { fontSize: 13, color: "#6B6B6B", marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  submitBtn: {
    backgroundColor: TEAL,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  backText: { textAlign: "center", color: "#6B6B6B", fontSize: 13 },
});
