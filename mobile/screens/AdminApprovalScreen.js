import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  fetchTeacherRequests,
  approveTeacher,
  rejectTeacher,
  revokeTeacher,
} from "../api/adminTeachers";

const NAVY = "#1F2A44";
const TEAL = "#1E9E8C";

export default function AdminApprovalScreen() {
  const [tab, setTab] = useState("pending"); // 'pending' | 'approved'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTeacherRequests(tab);
      setItems(data);
    } catch (e) {
      Alert.alert("불러오기 실패", "권한이 없거나 네트워크 오류입니다.");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const handleApprove = async (id) => {
    await approveTeacher(id);
    load();
  };

  const handleReject = async (id) => {
    Alert.alert("거절하시겠어요?", "이 신청을 거절합니다.", [
      { text: "취소", style: "cancel" },
      { text: "거절", style: "destructive", onPress: async () => { await rejectTeacher(id); load(); } },
    ]);
  };

  const handleRevoke = async (id) => {
    Alert.alert("권한을 회수할까요?", "이 선생님의 주소록 접근 권한을 회수합니다.", [
      { text: "취소", style: "cancel" },
      { text: "회수", style: "destructive", onPress: async () => { await revokeTeacher(id); load(); } },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>선생님 승인 관리</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "pending" && styles.tabBtnActive]}
          onPress={() => setTab("pending")}
        >
          <Text style={[styles.tabText, tab === "pending" && styles.tabTextActive]}>
            승인 대기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "approved" && styles.tabBtnActive]}
          onPress={() => setTab("approved")}
        >
          <Text style={[styles.tabText, tab === "approved" && styles.tabTextActive]}>
            승인됨
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} color={NAVY} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              {tab === "pending" ? "대기 중인 신청이 없어요." : "승인된 선생님이 없어요."}
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email || item.username}</Text>
                <Text style={styles.date}>
                  신청일: {new Date(item.requested_at).toLocaleDateString()}
                </Text>
              </View>

              {tab === "pending" ? (
                <View style={styles.btnRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.approveBtn]}
                    onPress={() => handleApprove(item.id)}
                  >
                    <Text style={styles.actionText}>승인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.rejectBtn]}
                    onPress={() => handleReject(item.id)}
                  >
                    <Text style={styles.actionText}>거절</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.actionBtn, styles.revokeBtn]}
                  onPress={() => handleRevoke(item.id)}
                >
                  <Text style={styles.actionText}>권한 회수</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FBF7F0" },
  header: {
    fontSize: 20,
    fontWeight: "800",
    color: NAVY,
    paddingHorizontal: 16,
    paddingTop: 100,
    paddingBottom: 12,
  },
  tabRow: { flexDirection: "row", paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0EBE1",
  },
  tabBtnActive: { backgroundColor: NAVY },
  tabText: { fontSize: 13, fontWeight: "600", color: "#6B6B6B" },
  tabTextActive: { color: "#fff" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1EADC",
  },
  name: { fontSize: 15, fontWeight: "700", color: "#2B2B2B" },
  email: { fontSize: 12, color: "#6B6B6B", marginTop: 2 },
  date: { fontSize: 11, color: "#9A948B", marginTop: 4 },
  btnRow: { flexDirection: "row", gap: 6 },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  approveBtn: { backgroundColor: TEAL },
  rejectBtn: { backgroundColor: "#B0453A" },
  revokeBtn: { backgroundColor: "#B0453A" },
  actionText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  empty: { textAlign: "center", color: "#9A948B", marginTop: 40 },
});
