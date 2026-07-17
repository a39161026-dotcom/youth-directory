import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { signup, login, requestTeacherAccess } from "../api/auth";
import { fetchClassGroups } from "../api/youthDirectory";

const TEAL = "#1E9E8C";

export default function SignupScreen({ onSignedUp, onBackToLogin }) {
  const [step, setStep] = useState("form");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [classGroups, setClassGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    setSubmitting(true);
    try {
      await signup({ username, email, firstName: name, password });
      await login(username, password);

      setLoadingGroups(true);
      try {
        const groups = await fetchClassGroups();
        setClassGroups(groups);
      } catch (e) {
        setClassGroups([]);
      } finally {
        setLoadingGroups(false);
      }
      setStep("pickClass");
    } catch (e) {
      Alert.alert("회원가입 실패", "입력값을 확인하고 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const finishSignup = async () => {
    setSubmitting(true);
    try {
      await requestTeacherAccess(selectedGroupId);
      onSignedUp?.();
    } catch (e) {
      Alert.alert("처리 실패", "잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "pickClass") {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>담당 분반 선택</Text>
          <Text style={styles.desc}>
            담당하시는 분반을 선택해주세요. 로그인 후 이 분반이 먼저
            보이게 되고, 나중에 바꿀 수도 있어요. (선택 안 해도 괜찮아요)
          </Text>

          {loadingGroups ? (
            <ActivityIndicator color={TEAL} style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.chipRow}>
              {classGroups.map((g) => (
                <TouchableOpacity
                  key={g.id}
                  style={[
                    styles.chip,
                    selectedGroupId === g.id && styles.chipActive,
                  ]}
                  onPress={() => setSelectedGroupId(g.id)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedGroupId === g.id && styles.chipTextActive,
                    ]}
                  >
                    {g.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={finishSignup}
            disabled={submitting}
          >
            <Text style={styles.submitText}>
              {submitting ? "처리 중..." : "완료"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={finishSignup} style={{ marginTop: 16 }}>
            <Text style={styles.backText}>나중에 선택할게요 (건너뛰기)</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSignup}
          disabled={submitting}
        >
          <Text style={styles.submitText}>
            {submitting ? "가입 중..." : "가입하기"}
          </Text>
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
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#EFEFEF",
  },
  chipActive: { backgroundColor: TEAL },
  chipText: { fontSize: 14, color: "#555", fontWeight: "600" },
  chipTextActive: { color: "#fff" },
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
