import { AccentColor, MainColor } from "@/constants/color-palet";

export const dummyMasterStatusTransaction = [
  { value: "berhasil", label: "Berhasil", color: MainColor.green },
  { value: "proses", label: "Proses", color: AccentColor.skyblue },
  { value: "menunggu", label: "Menunggu", color: MainColor.yellow },
  { value: "gagal", label: "Gagal", color: MainColor.red },
];
