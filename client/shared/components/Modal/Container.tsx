import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { PropsWithChildren, useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "@/shared/components/Button/Container";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  onSave: () => void;
  onSaveTitle?: string;
}>;

export default function ModalContainer({
  isVisible,
  children,
  onClose,
  title,
  onSave,
  onSaveTitle,
}: Props) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showListener = Platform.OS === "ios"
      ? Keyboard.addListener("keyboardWillShow", (e) => setKeyboardHeight(e.endCoordinates.height))
      : Keyboard.addListener("keyboardDidShow", (e) => setKeyboardHeight(e.endCoordinates.height));

    const hideListener = Platform.OS === "ios"
      ? Keyboard.addListener("keyboardWillHide", () => setKeyboardHeight(0))
      : Keyboard.addListener("keyboardDidHide", () => setKeyboardHeight(0));

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Keyboard aware modal */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.modalWrapper, { marginBottom: keyboardHeight}]} // ajusta conforme o teclado real
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#fff" size={22} />
              </Pressable>
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>{children}</View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                onPress={onClose}
                title="Cancel"
                theme="soft"
                style={{ width: 150, height: 55 }}
              />
              <Button
                onPress={onSave}
                title={onSaveTitle || "Save"}
                theme="primary"
                style={{ width: 150, height: 55 }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContainer: {
    backgroundColor: "#25292e",
    borderRadius: 18,
    paddingBottom: 8,
    marginBottom: 20,
  },
  titleContainer: {
    backgroundColor: "#464C55",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  contentContainer: {
    padding: 20,
    gap: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
});
