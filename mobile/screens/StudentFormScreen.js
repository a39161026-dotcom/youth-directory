import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  createStudent,
  updateStudent,
  deactivateStudent,
} from "../api/studentForm";

const PURPLE = "#6B4FA8";
const NAVY = "#1F2A44";

// student: 수정 모드일 때 기존 값 (없으면 신규 등록)
// classGroups: [{id, name}]
export default function StudentFormScreen({ student, classGroups = [], onSaved, onCancel }) {
  const isEdit = Boolean(student?.id);

  const [name, setName] = useState(student?.name ?? "");
  const [gender, setGender] = useState(student?.gender ?? "M");
  const [classGroupId, setClassGroupId] = useState(student?.class_group ?? null);
  const [schoolGrade, setSchoolGrade] = useState(student?.school_grade ?? "");
  const [phone, setPhone] = useState(student?.phone ?? "");
  const [parentPhone, setParentPhone] = useState(student?.parent_phone ?? "");
  const [memo, setMemo] = useState(student?.memo ?? "");
  const [photo, setPhoto] = useState(null); // 새로 고른 사진 (ImagePicker 결과)
  const [existingPhotoUrl] = useState(student?.photo_url ?? null);
  const [saving, setSaving] = useState(false);

  const pickPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("사진 접근 권한이 필요해요.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("이름을 입력해주세요.");
      return;
    }
    setSaving(true);
    try {
      const values = {
        name,
        gender,
        class_group: classGroupId,
        school_grade: schoolGrade,
        phone,
        parent_phone: parentPhone,
        memo,
        ...(photo ? { photo } : {}),
      };
      const saved = isEdit
        ? await updateStudent(student.id, values)
        : await createStudent(values);
      onSaved?.(saved);
    } catch (e) {
      Alert.alert("저장 실패", "입력값을 확인하고 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = () => {
    Alert.alert("비활성화하시겠어요?", "목록에서 더 이상 보이지 않게 됩니다 (삭제 아님).", [
      { text: "취소", style: "cancel" },
      {
        text: "비활성화",
        style: "destructive",
        onPress: async () => {
          await deactivateStudent(student.id);
          onSaved?.({ ...student, is_active: false });
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.header}>{isEdit ? "학생 정보 수정" : "학생 추가"}</Text>

      <TouchableOpacity style={styles.photoPicker} onPress={pickPhoto}>
        {photo?.uri || existingPhotoUrl ? (
          <Image
            source={{ uri: photo?.uri ?? existingPhotoUrl }}
            style={styles.photoPreview}
          />
        ) : (
          <Text style={styles.photoPlaceholder}>📷{"\n"}사진 추가</Text>
        )}
      </TouchableOpacity>

      <Field label="이름">
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </Field>

      <Field label="구분">
        <View style={styles.segmentRow}>
          {[["M", "형제"], ["F", "자매"]].map(([value, label]) => (
            <TouchableOpacity
              key={value}
              style={[styles.segment, gender === value && styles.segmentActive]}
              onPress={() => setGender(value)}
            >
              <Text style={[styles.segmentText, gender === value && styles.segmentTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Field>

      <Field label="분반">
        <View style={styles.chipRow}>
          {classGroups.map((g) => (
            <TouchableOpacity
              key={g.id}
              style={[styles.chip, classGroupId === g.id && styles.chipActive]}
              onPress={() => setClassGroupId(g.id)}
            >
              <Text style={[styles.chipText, classGroupId === g.id && styles.chipTextActive]}>
                {g.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Field>

      <Field label="학년 (예: 중2, 고1)">
        <TextInput style={styles.input} value={schoolGrade} onChangeText={setSchoolGrade} />
      </Field>

      <Field label="연락처">
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="010-0000-0000"
        />
      </Field>

      <Field label="학부모 연락처">
        <TextInput
          style={styles.input}
          value={parentPhone}
          onChangeText={setParentPhone}
          keyboardType="phone-pad"
          placeholder="010-0000-0000"
        />
      </Field>

      <Field label="메모">
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
          value={memo}
          onChangeText={setMemo}
          multiline
        />
      </Field>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
        <Text style={styles.saveBtnText}>{saving ? "저장 중..." : "저장"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <Text style={styles.cancelBtnText}>취소</Text>
      </TouchableOpacity>

      {isEdit && (
        <TouchableOpacity style={styles.deactivateBtn} onPress={handleDeactivate}>
          <Text style={styles.deactivateText}>이 학생 비활성화</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function Field({ label, children }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FBF7F0" },
  header: { fontSize: 20, fontWeight: "800", color: NAVY, marginBottom: 20 },
  photoPicker: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F0EBE1",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  photoPreview: { width: 96, height: 96 },
  photoPlaceholder: { fontSize: 12, color: "#9A948B", textAlign: "center" },
  field: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, color: "#6B6B6B", marginBottom: 6, fontWeight: "600" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE6D8",
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  segmentRow: { flexDirection: "row", gap: 8 },
  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F0EBE1",
    alignItems: "center",
  },
  segmentActive: { backgroundColor: PURPLE },
  segmentText: { color: "#6B6B6B", fontWeight: "600" },
  segmentTextActive: { color: "#fff" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F0EBE1",
  },
  chipActive: { backgroundColor: "#4C5C8C" },
  chipText: { fontSize: 13, color: "#6B6B6B", fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  saveBtn: {
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  cancelBtn: { paddingVertical: 14, alignItems: "center" },
  cancelBtnText: { color: "#6B6B6B", fontSize: 14 },
  deactivateBtn: { paddingVertical: 14, alignItems: "center" },
  deactivateText: { color: "#B0453A", fontSize: 13, fontWeight: "600" },
});
