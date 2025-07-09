// components/text-input.styles.ts
import { MainColor } from "@/constants/color-palet";
import { TEXT_SIZE_LARGE, TEXT_SIZE_MEDIUM } from "@/constants/constans-value";
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
    color: MainColor.white_gray,
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

  // Input Length
  inputLength: {
    fontSize: 12,
    color: MainColor.white_gray,
  },

  // Wrapper input (View pembungkus TextInput)
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: MainColor.white_gray,
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
    fontSize: TEXT_SIZE_MEDIUM,
    paddingVertical: 0,
  },

  // Ikon di kiri/kanan
  icon: {
    marginHorizontal: 4,
    justifyContent: "center",
  },

  // Teks ikon jika berupa string
  iconText: {
    fontSize: TEXT_SIZE_LARGE,
    color: "#000",
  },

  // Border merah jika ada error
  errorBorder: {
    borderColor: "red",
  },

  // Untuk TextArea tambahan
  textArea: {
    textAlignVertical: "top",
    padding: 12,
    height: undefined, // biar multiline bebas tinggi
  },
});
