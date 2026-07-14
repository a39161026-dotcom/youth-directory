import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";

const NAVY = "#232A3B";

export default function FilterDrawer({
  visible,
  onClose,
  teacherName,
  teacherOrg,
  photoUrl,
  onLogout,
  onToggleTheme,
  onSelectClassGroup,
  onSelectGradeSection,
}) {
  const [openSection, setOpenSection] = useState(null); // '분반' | '학년구분' | null

  const toggle = (key) => setOpenSection(openSection === key ? null : key);

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.drawer}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={{ color: "#fff" }}>{teacherName?.[0] ?? "?"}</Text>
              </View>
            )}
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={onToggleTheme} style={styles.circleBtn}>
                <Text style={styles.circleIcon}>☀️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogout} style={styles.circleBtn}>
                <Text style={styles.circleIcon}>⏻</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.name}>{teacherOrg} {teacherName}</Text>
          <Text style={styles.sub}>중고등부 선생님</Text>
        </View>

        <View style={styles.list}>
          <FilterRow
            icon="👥"
            label="분반"
            open={openSection === "분반"}
            onPress={() => toggle("분반")}
            options={["전체", "중등1반", "중등2반", "고등1반", "고등2반"]}
            onSelect={(v) => {
              onSelectClassGroup?.(v);
              setOpenSection(null);
              onClose?.();
            }}
          />
          <FilterRow
            icon="🏫"
            label="학년구분"
            open={openSection === "학년구분"}
            onPress={() => toggle("학년구분")}
            options={["전체", "중등부", "고등부"]}
            onSelect={(v) => {
              onSelectGradeSection?.(v);
              setOpenSection(null);
              onClose?.();
            }}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>광주봉선교회 중고등부</Text>
        </View>
      </View>
    </Modal>
  );
}

function FilterRow({ icon, label, open, onPress, options, onSelect }) {
  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={onPress}>
        <Text style={styles.rowIcon}>{icon}</Text>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowArrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.optionList}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.optionItem}
              onPress={() => onSelect(opt)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "82%",
    backgroundColor: "#fff",
  },
  header: { backgroundColor: NAVY, padding: 20, paddingTop: 50 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  avatarPlaceholder: { backgroundColor: "#555", alignItems: "center", justifyContent: "center" },
  headerActions: { flexDirection: "row", gap: 10 },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  circleIcon: { fontSize: 14 },
  name: { color: "#F4C95D", fontSize: 18, fontWeight: "700", marginTop: 14 },
  sub: { color: "#CCC", fontSize: 13, marginTop: 4 },
  list: { paddingTop: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rowIcon: { fontSize: 18, marginRight: 14 },
  rowLabel: { flex: 1, fontSize: 16, color: "#2B2B2B" },
  rowArrow: { fontSize: 12, color: "#999" },
  optionList: { backgroundColor: "#FAFAFA" },
  optionItem: { paddingVertical: 12, paddingHorizontal: 54 },
  optionText: { fontSize: 14, color: "#555" },
  footer: { position: "absolute", bottom: 24, left: 0, right: 0, alignItems: "center" },
  footerText: { fontSize: 12, color: "#999" },
});
