import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Image,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchClassGroups, fetchStudents } from "../api/youthDirectory";
import AccessDeniedScreen from "./AccessDeniedScreen";
import FilterDrawer from "./FilterDrawer";
import StudentFormScreen from "./StudentFormScreen";

export default function DirectoryScreen({ teacher }) {
  const [classGroups, setClassGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null); // null = 전체
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formTarget, setFormTarget] = useState(undefined);
  const [activeGradeLabel, setActiveGradeLabel] = useState(null); // undefined=닫힘, null=신규, {..}=수정

  const loadGroups = useCallback(async () => {
    try {
      const data = await fetchClassGroups();
      setClassGroups(data);
    } catch (e) {
      if (e?.response?.status === 403) setDenied(true);
    }
  }, []);

  const loadStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStudents({
        search,
        classGroupId: activeGroup,
        gradeLabel: activeGradeLabel,
      });
      setStudents(data);
    } catch (e) {
      if (e?.response?.status === 403) setDenied(true);
    } finally {
      setLoading(false);
    }
  }, [search, activeGroup, activeGradeLabel]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (formTarget !== undefined) {
        setFormTarget(undefined);
        return true;
      }
      if (drawerVisible) {
        setDrawerVisible(false);
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [formTarget, drawerVisible]);

  if (denied) return <AccessDeniedScreen />;

  if (formTarget !== undefined) {
    return (
      <StudentFormScreen
        student={formTarget}
        classGroups={classGroups}
        onCancel={() => setFormTarget(undefined)}
        onSaved={() => {
          setFormTarget(undefined);
          loadStudents();
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#6B4FA8", "#C77DA8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerTopRow}>
          <Text style={styles.brand}>중고등부 주소록</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            {teacher?.isAdmin ? (
              <TouchableOpacity onPress={teacher.onOpenAdmin}>
                <Text style={styles.menuIcon}>⚙️</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={() => setDrawerVisible(true)}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileRow}>
          {teacher?.photoUrl ? (
            <Image source={{ uri: teacher.photoUrl }} style={styles.profilePhoto} />
          ) : (
            <View style={[styles.profilePhoto, styles.profilePhotoPlaceholder]}>
              <Text style={{ color: "#fff", fontSize: 18 }}>
                {teacher?.name?.[0] ?? "?"}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.profileOrg}>{teacher?.org ?? "광주봉선교회"}</Text>
            <Text style={styles.profileName}>
              중고등부  {teacher?.name ?? ""} 선생님
            </Text>
          </View>
        </View>
      </LinearGradient>

      <LinearGradient
        colors={["#F6D9E4", "#FBF7F0"]}
        style={styles.searchWrap}
      >
        <TextInput
          style={styles.search}
          placeholder="이름으로 검색"
          placeholderTextColor="#9A948B"
          value={search}
          onChangeText={setSearch}
        />
      </LinearGradient>

      <View style={styles.body}>

      {/* 분반 탭 (인덱스카드 느낌) */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[{ id: null, name: "전체" }, ...classGroups]}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.tabRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.tab, activeGroup === item.id && styles.tabActive]}
            onPress={() => setActiveGroup(item.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeGroup === item.id && styles.tabTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} color="#E8734A" />
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={styles.empty}>등록된 학생이 없어요.</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => setFormTarget(item)}
            >
              <View style={styles.avatar}>
                {item.photo_url ? (
                  <Image source={{ uri: item.photo_url }} style={styles.avatarImg} />
                ) : (
                  <Text style={styles.avatarInitial}>{item.name?.[0] ?? "?"}</Text>
                )}
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.name}>
                  {item.name}{" "}
                  <Text style={styles.gender}>
                    {item.gender === "M" ? "형제" : "자매"}
                  </Text>
                </Text>
                <View style={styles.tagRow}>
                  {item.school_grade ? (
                    <Text style={styles.tag}>{item.school_grade}</Text>
                  ) : null}
                  {item.class_group_name ? (
                    <Text style={[styles.tag, styles.tagBlue]}>
                      {item.class_group_name}
                    </Text>
                  ) : null}
                </View>
              </View>
              {item.phone ? (
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => Linking.openURL(`tel:${item.phone}`)}
                >
                  <Text style={styles.callIcon}>📞</Text>
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setFormTarget(null)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
      </View>

      <FilterDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        teacherName={teacher?.name}
        teacherOrg={teacher?.org ?? "광주봉선"}
        photoUrl={teacher?.photoUrl}
        onLogout={teacher?.onLogout}
        onToggleTheme={() => {}}
        classGroups={classGroups}
        onSelectClassGroup={(name) => {
          setActiveGradeLabel(null);
          if (name === "전체") {
            setActiveGroup(null);
          } else {
            const found = classGroups.find((g) => g.name === name);
            setActiveGroup(found ? found.id : null);
          }
        }}
        onSelectGradeSection={(label) => {
          setActiveGroup(null);
          setActiveGradeLabel(label === "전체" ? null : label);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FBF7F0" },
  headerGradient: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  brand: { fontSize: 22, fontWeight: "800", color: "#fff", letterSpacing: 0.5 },
  menuIcon: { fontSize: 22, color: "#fff" },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  profilePhoto: { width: 56, height: 56, borderRadius: 28 },
  profilePhotoPlaceholder: {
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileOrg: { color: "#fff", fontSize: 15, fontWeight: "700" },
  profileName: { color: "#F1E6F0", fontSize: 13, marginTop: 2 },
  searchWrap: { paddingHorizontal: 16, paddingVertical: 16 },
  body: { flex: 1, paddingHorizontal: 16 },
  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#EEE6D8",
  },
  tabRow: { paddingBottom: 12, gap: 8 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0EBE1",
    marginRight: 8,
  },
  tabActive: { backgroundColor: "#1F2A44" },
  tabText: { fontSize: 13, color: "#6B6B6B", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1EADC",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0EBE1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  avatarImg: { width: 44, height: 44 },
  avatarInitial: { fontSize: 16, fontWeight: "700", color: "#9A948B" },
  cardBody: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: "#2B2B2B" },
  gender: { fontSize: 12, fontWeight: "400", color: "#9A948B" },
  tagRow: { flexDirection: "row", gap: 6, marginTop: 6 },
  tag: {
    fontSize: 11,
    color: "#fff",
    backgroundColor: "#E8734A",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: "hidden",
  },
  tagBlue: { backgroundColor: "#4C5C8C" },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FDEDE6",
    alignItems: "center",
    justifyContent: "center",
  },
  callIcon: { fontSize: 16 },
  empty: { textAlign: "center", color: "#9A948B", marginTop: 40 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E8734A",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  fabIcon: { color: "#fff", fontSize: 28, fontWeight: "700", lineHeight: 30 },
});
