cat > ~/wooriban-full/mobile/screens/LoginScreen.js << 'EOF'
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function LoginScreen({ onLogin, onGoSignup, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            중고등부 선생님 전용{"\n"}학생 관리 공간입니다.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.form}>
          <View style={styles.fieldRow}>
            <Text style={styles.icon}>👤</Text>
            <Text style={styles.label}>아이디</Text>
          </View>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <View style={styles.fieldRow}>
            <Text style={styles.icon}>🔒</Text>
            <Text style={styles.label}>비밀번호</Text>
          </View>
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword((v) => !v)}
            >
              <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => onLogin?.(username, password)}
          >
            <Text style={styles.loginBtnText}>로그인</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>

      <TouchableOpacity style={styles.signupBar} onPress={onGoSignup}>
        <Text style={styles.signupText}>›  회원 가입</Text>
      </TouchableOpacity>

      <Text style={styles.copyright}>
        Copyright© 광주봉선교회 중고등부.{"\n"}All Rights Reserved.
      </Text>
    </SafeAreaView>
  );
}

const TEAL = "#1E9E8C";
const NAVY = "#1F2A44";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2F2F2", justifyContent: "space-between" },
  container: { paddingHorizontal: 24, paddingTop: 40 },
  noticeBox: { marginBottom: 24 },
  noticeText: { fontSize: 18, color: "#2B2B2B", lineHeight: 26 },
  divider: { height: 1, backgroundColor: "#DDD", marginBottom: 24 },
  form: {},
  fieldRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  icon: { fontSize: 16, marginRight: 8 },
  label: { fontSize: 15, color: "#2B2B2B" },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  passwordWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingRight: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  eyeIcon: { fontSize: 18 },
  loginBtn: {
    backgroundColor: TEAL,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  loginBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  errorText: { color: "#B0453A", fontSize: 13, textAlign: "center", marginTop: 12 },
  signupBar: {
    backgroundColor: NAVY,
    paddingVertical: 16,
    alignItems: "center",
  },
  signupText: { color: "#fff", fontSize: 14 },
  copyright: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginVertical: 24,
    lineHeight: 18,
  },
});
EOF
