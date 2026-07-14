import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function PendingApprovalScreen({ email, onLogout }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.emoji}>⏳</Text>
        <Text style={styles.title}>가입 신청이 완료되었습니다</Text>
        <Text style={styles.desc}>
          중고등부 관리자 승인 후 이용하실 수 있어요.{"\n"}승인되면 다시
          로그인해주세요.
        </Text>
        {email ? <Text style={styles.email}>{email}</Text> : null}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FBF7F0", justifyContent: "space-between" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  emoji: { fontSize: 40, marginBottom: 12 },
  title: { fontSize: 17, fontWeight: "700", color: "#2B2B2B", marginBottom: 8 },
  desc: { fontSize: 13, color: "#6B6B6B", textAlign: "center", lineHeight: 20 },
  email: { fontSize: 13, color: "#9A948B", marginTop: 16 },
  logoutBtn: { paddingVertical: 20, paddingBottom: 80, alignItems: "center" },
  logoutText: { color: "#B0453A", fontSize: 14, fontWeight: "600" },
});
