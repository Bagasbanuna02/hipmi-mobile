import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { MainColor } from "@/constants/color-palet";

interface CopyButtonProps {
  textToCopy: string;
  copyLabel?: string; // Teks tombol saat normal, default: "Copy"
  copiedLabel?: string; // Teks tombol saat berhasil, default: "Copied!"
  onCopySuccess?: () => void; // Callback opsional saat berhasil menyalin
  duration?: number; // Durasi (ms) menampilkan "Copied!", default: 2000
  style?: any; // Gaya tambahan untuk tombol
  textStyle?: any; // Gaya tambahan untuk teks
}

const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  copyLabel = "Copy",
  copiedLabel = "Copied!",
  onCopySuccess,
  duration = 2000,
  style,
  textStyle,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(textToCopy);
      setIsCopied(true);
      onCopySuccess?.();

      // Reset kembali ke label "Copy" setelah durasi tertentu
      setTimeout(() => {
        setIsCopied(false);
      }, duration);
    } catch (error) {
      console.error("Failed to copy text:", error);
      // Opsional: tampilkan error toast jika diperlukan
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleCopy}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>
        {isCopied ? copiedLabel : copyLabel}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: MainColor.yellow,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: MainColor.darkblue,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default CopyButton;
