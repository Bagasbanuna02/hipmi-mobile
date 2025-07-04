import { AccentColor, MainColor } from "@/constants/color-palet";
import { TEXT_SIZE_LARGE } from "@/constants/constans-value";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AlertCustomProps {
  isVisible: boolean;
  onLeftPress: () => void;
  onRightPress: () => void;
  title?: string;
  message?: string;
  textLeft?: string;
  textRight?: string;
  colorLeft?: string;
  colorRight?: string;
}

export default function AlertCustom({
  isVisible,
  onLeftPress,
  onRightPress,
  title,
  message,
  textLeft,
  textRight,
  colorLeft,
  colorRight,
}: AlertCustomProps) {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.alertBox}>
        {title && message ? (
          <>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
          </>
        ) : title ? (
          <Text style={styles.alertTitle}>{title}</Text>
        ) : (
          <Text style={styles.alertMessage}>{message}</Text>
        )}
        <View style={styles.alertButtons}>
          <TouchableOpacity
            style={[
              styles.alertButton,
              colorLeft ? { backgroundColor: colorLeft } : styles.leftButton,
            ]}
            onPress={onLeftPress}
          >
            <Text style={styles.buttonText}>{textLeft}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.alertButton,
              colorRight ? { backgroundColor: colorRight } : styles.rightButton,
            ]}
            onPress={onRightPress}
          >
            <Text style={styles.buttonText}>{textRight}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    color: MainColor.white,
  },
  alertMessage: {
    textAlign: "center",
    marginBottom: 20,
    color: MainColor.white,
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
