// components/Button/buttonStyles.js

import { MainColor } from "@/constants/color-palet";
import { TEXT_SIZE_MEDIUM } from "@/constants/constans-value";
import { StyleSheet } from "react-native";

export default function buttonStyles({
  backgroundColor = "#007AFF",
  textColor = "#FFFFFF",
  borderRadius = 8,
}) {
  return StyleSheet.create({
    button: {
      backgroundColor,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius,
      flexDirection: "row", // 👈 Tambahkan baris ini
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    buttonText: {
      color: textColor,
      fontSize: TEXT_SIZE_MEDIUM,
      fontWeight: "600",
    },
    disabled: {
      backgroundColor: MainColor.disabled,
    },
  });
}
