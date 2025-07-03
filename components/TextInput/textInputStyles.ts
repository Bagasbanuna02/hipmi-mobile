// components/text-input.styles.ts
import { AccentColor, MainColor } from "@/constants/color-palet";
import { StyleSheet } from "react-native";

export const textInputStyles = StyleSheet.create({
  // Container utama input (View luar)
  container: {
    marginBottom: 16,
  },

  // Label di atas input
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
    color: MainColor.white,
  },

  // Tanda bintang merah untuk required
  required: {
    color: "red",
  },

  // Pesan error di bawah input
  errorMessage: {
    marginTop: 4,
    fontSize: 12,
    color: MainColor.red,
  },

  // Wrapper input (View pembungkus TextInput)
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AccentColor.white,
    backgroundColor: MainColor.white,
    paddingHorizontal: 12,
    height: 50,
  },

  // Style saat disabled
  disabled: {
    backgroundColor: "#f9f9f9",
    borderColor: "#e0e0e0",
  },

  // Input utama (TextInput)
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },

  // Ikon di kiri/kanan
  icon: {
    marginHorizontal: 4,
    justifyContent: "center",
  },

  // Teks ikon jika berupa string
  iconText: {
    fontSize: 16,
    color: "#000",
  },

  // Border merah jika ada error
  errorBorder: {
    borderColor: "red",
  },
});
