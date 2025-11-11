import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { PropsWithChildren } from "react";
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
  return (
    <Modal animationType="slide" transparent visible={isVisible}>

      <TouchableWithoutFeedback onPress={()=> {}}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#25292e",
    borderRadius: 18,
    maxHeight: "55%",
    paddingBottom:0,
    position: "absolute",
    top: "35%",
    left: 0,
    right: 0,
  },
  titleContainer: {
    backgroundColor: "#464C55",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  contentContainer: {
    padding: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    boxShadow: "0px -2px 20px #161718ff",
  },
});
