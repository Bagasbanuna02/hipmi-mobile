// components/Button/buttonStyles.js

import { MainColor } from "@/constants/color-palet";
import { TEXT_SIZE_MEDIUM } from "@/constants/constans-value";
import { StyleSheet } from "react-native";

export const stylesButton = StyleSheet.create({
    button: {
      backgroundColor: MainColor.yellow,
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: "row", // 👈 Tambahkan baris ini
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    buttonText: {
      color: MainColor.black,
      fontSize: TEXT_SIZE_MEDIUM,
      fontWeight: "600",
    },
    disabled: {
      backgroundColor: MainColor.disabled,
    },
  });
