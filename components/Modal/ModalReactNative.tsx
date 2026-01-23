import { Modal, View } from "react-native";

export default function ModalReactNative({
  children,
  isVisible,
}: {
  children: React.ReactNode;
  isVisible: boolean;
}) {
  return (
    <Modal
      animationType="slide"
      backdropColor={"rgba(0, 0, 0, 0.5)"}
      visible={isVisible}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        //   margin: 10,
        marginBlock: 30,
          padding: 10,
          borderRadius: 10,
          paddingTop: 30
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
