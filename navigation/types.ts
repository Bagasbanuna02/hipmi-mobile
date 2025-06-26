// src/navigation/types.ts

import { NavigatorScreenParams } from "@react-navigation/native";

// Tipe untuk Tab Navigator utama di (home-tabs)
export type HomeTabParamList = {
  index: undefined; // Diperbarui: Tab default (sekarang dinamakan index)
  maps: undefined;
  profile: undefined;
};

// Tipe untuk Stack Navigator Event
export type EventStackParamList = {
  index: undefined; // Rute root untuk Event (misalnya, daftar event)
  // Anda bisa menambahkan rute event lain di sini, contoh:
  // '[id]': { id: string }; // Untuk detail event
};

// Tipe untuk Stack Navigator Autentikasi
export type AuthStackParamList = {
  index: undefined; // Layar Login
  register: undefined; // Layar Pendaftaran
  verification: undefined; // Layar Verifikasi
};

// Tipe untuk Stack Navigator Utama Aplikasi (setelah autentikasi)
export type AppStackParamList = {
  "(home-tabs)": NavigatorScreenParams<HomeTabParamList>; // Mengarah ke Tab Navigator
  event: NavigatorScreenParams<EventStackParamList>; // Mengarah ke Event Stack
  forum: undefined; // NEW: Halaman Forum, sebagai Stack Screen terpisah
  // Anda bisa menambahkan rute stack lain di sini yang tidak termasuk dalam grup di atas
};

// Gabungkan semua tipe rute utama ke dalam RootParamList global
// Ini memungkinkan penggunaan useNavigation dan useRouter dengan tipe yang benar
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList, AppStackParamList {}
  }
}
