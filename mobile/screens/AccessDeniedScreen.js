import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AccessDeniedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔒</Text>
      <Text style={styles.title}>중고등부 선생님만 볼 수 있어요</Text>
      <Text style={styles.desc}>
        이 메뉴는 중고등부 담당 선생님 계정으로만 열람할 수 있습니다.{"\n"}
        담당자 등록이 필요하면 관리자에게 문의해주세요.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#FBF7F0",
  },
  emoji: { fontSize: 40, marginBottom: 12 },
  title: { fontSize: 17, fontWeight: "700", color: "#2B2B2B", marginBottom: 8 },
  desc: {
    fontSize: 13,
    color: "#6B6B6B",
    textAlign: "center",
    lineHeight: 20,
  },
});
