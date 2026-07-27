import { Alert, Platform } from "react-native";

export function confirmAction(title, message, onConfirm) {
  if (Platform.OS === "web") {
    const ok = window.confirm(`${title}\n\n${message}`);
    if (ok) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: "취소", style: "cancel" },
    { text: "확인", style: "destructive", onPress: onConfirm },
  ]);
}

export function showAlert(title, message) {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
    return;
  }
  Alert.alert(title, message);
}
