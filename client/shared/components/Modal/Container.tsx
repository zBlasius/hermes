import { Modal, View, Text, Pressable, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function ModalContainer({ isVisible, children, onClose }: Props) {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      {/* Área de fundo escura para fechar ao clicar fora */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>

        {/* ScrollView evita overflow e permite scroll se o conteúdo crescer demais */}
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#25292e',
    borderRadius:18,
    maxHeight: '55%', 
    paddingBottom: 20,
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
  },
  titleContainer: {
    backgroundColor: '#464C55',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  contentContainer: {
    padding: 20,
  },
});
