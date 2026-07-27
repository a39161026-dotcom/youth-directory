import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import {
  fetchTeacherRequests,
  revokeTeacher,
  promoteTeacher,
  demoteTeacher,
  importStudentsCsv,
} from "../api/adminTeachers";
import { confirmAction, showAlert } from "../utils/crossAlert";

const NAVY = "#1F2A44";

export default function AdminApprovalScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTeacherRequests("all");
      setItems(data);
    } catch (e) {
      showAlert("불러오기 실패", "권한이 없거나 네트워크 오류입니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleRevoke = (id, name) => {
    confirmAction(
      "권한을 회수할까요?",
      `${name} 선생님의 주소록 접근 권한을 회수합니다.`,
      async () => { await revokeTeacher(id); load(); }
    );
  };

  const handlePromote = (id, name) => {
    confirmAction(
      "관리자로 지정할까요?",
      `${name} 선생님에게 관리자 권한을 부여합니다.`,
      async () => { await promoteTeacher(id); load(); }
    );
  };

  const handleDemote = (id, name) => {
    confirmAction(
      "관리자 권한을 해제할까요?",
      `${name} 선생님의 관리자 권한을 해제합니다.`,
      async () => { await demoteTeacher(id); load(); }
    );
  };

  const handleCsvUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["text/csv", "text/comma-separated-values", "application/vnd.ms-excel", "*/*"],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets || result.assets.length === 0) return;

      const asset = result.assets[0];
      setUploading(true);

      const fileToUpload = asset.file
        ? asset.file
        : { uri: asset.uri, name: asset.name || "students.csv", type: "text/csv" };

      const res = await importStudentsCsv(fileToUpload);
      const fail = (res.totalRows ?? 0) - (res.successCount ?? 0);
      const errorPreview = (res.errors ?? []).slice(0, 5).join("\n");
      showAlert(
        "업로드 완료",
        `성공: ${res.successCount ?? 0}건\n실패: ${fail}건` +
          (errorPreview ? `\n\n[오류]\n${errorPreview}` : "")
      );
    } catch (e) {
      showAlert("업로드 실패", "CSV 형식을 확인하고 다시 시도해주세요.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>선생님 관리</Text>

      <TouchableOpacity
        style={styles.csvBtn}
        onPress={handleCsvUpload}
        disabled={uploading}
      >
        <Text style={styles.csvBtnText}>
          {uploading ? "업로드 중..." : "📄 CSV로 학생 일괄 등록"}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} color={NAVY} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <Text style={styles.empty}>등록된 선생님이 없어요.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>
                  {item.name}{item.is_staff ? " 👑 관리자" : ""}
                </Text>
                <Text style={styles.email}>{item.email || item.username}</Text>
              </View>

              <View style={styles.btnRow}>
                {item.is_staff ? (
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.demoteBtn]}
                    onPress={() => handleDemote(item.id, item.name)}
                  >
                    <Text style={styles.actionText}>관리자 해제</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.promoteBtn]}
                    onPress={() => handlePromote(item.id, item.name)}
                  >
                    <Text style={styles.actionText}>관리자 지정</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.actionBtn, styles.revokeBtn]}
                  onPress={() => handleRevoke(item.id, item.name)}
                >
                  <Text style={styles.actionText}>권한 회수</Text>
                </TouchableOpacity>
              </View>
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
  csvBtn: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: NAVY,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  csvBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
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
  btnRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  revokeBtn: { backgroundColor: "#B0453A" },
  promoteBtn: { backgroundColor: "#8B6F1E" },
  demoteBtn: { backgroundColor: "#9A948B" },
  actionText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  empty: { textAlign: "center", color: "#9A948B", marginTop: 40 },
});
