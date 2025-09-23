import { AccentColor, MainColor } from "@/constants/color-palet";
import { TEXT_SIZE_LARGE } from "@/constants/constans-value";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface AlertCustomProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export default function ModalCustom({
  children,
  isVisible,
}: AlertCustomProps) {
  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <View style={{ width: "100%" }}>{children}</View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    paddingVertical: 20,
  },
  alertBox: {
    width: "90%",
    backgroundColor: MainColor.darkblue,
    borderColor: AccentColor.blue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  alertTitle: {
    fontSize: TEXT_SIZE_LARGE,
    fontWeight: "bold",
    marginBottom: 20,
    color: MainColor.white_gray,
  },
  alertMessage: {
    textAlign: "center",
    marginBottom: 20,
    color: MainColor.white_gray,
  },
  alertButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  alertButton: {
    flex: 1,
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    alignItems: "center",
  },
  leftButton: {
    backgroundColor: "gray",
  },
  rightButton: {
    backgroundColor: MainColor.green,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
