# Task: TASK-003 - Footer Terangkat Saat Keyboard Close

## 📋 Deskripsi

Bug: Setelah input ke text input dan menutup keyboard, bagian bawah layar berwarna putih seakan footer terangkat.

## 🎯 Tujuan

Footer tetap di posisi yang benar setelah keyboard ditutup, tidak ada warna putih di bawah.

## 🔍 Analisis Masalah

### Gejala
- ✅ Terjadi di emulator dan device
- ✅ Setelah input ke text input
- ✅ Saat keyboard menutup (close)
- ✅ Bagian bawah berwarna putih
- ✅ Footer seperti terangkat

### Root Cause (Diduga)

1. **KeyboardAvoidingView behavior**
   - `behavior={Platform.OS === "ios" ? "padding" : "height"}`
   - Android menggunakan `height` yang bisa menyebabkan layout shift

2. **Keyboard listener tidak clean up**
   - Event listener mungkin masih aktif setelah keyboard close

3. **Layout tidak re-render setelah keyboard close**
   - Component tidak detect keyboard state change

## 📝 Sub-Tasks

### Task 3.1: Investigasi
- [ ] Identifikasi screen mana yang mengalami bug ini
- [ ] Test di berbagai screen dengan text input
- [ ] Catat pola kejadian bug

### Task 3.2: Perbaikan NewWrapper - Keyboard Handling
- [ ] Tambah keyboard event listener
- [ ] Handle keyboard show/hide events
- [ ] Force re-render saat keyboard close
- [ ] Test tanpa merusak existing functionality

### Task 3.3: Perbaikan KeyboardAvoidingView
- [ ] Evaluasi behavior untuk Android
- [ ] Coba gunakan `KeyboardAwareScrollView` jika perlu
- [ ] Test smooth keyboard transition

### Task 3.4: Testing & Validasi
- [ ] Test di emulator Android
- [ ] Test di device Android
- [ ] Test di emulator iOS
- [ ] Test di device iOS
- [ ] Pastikan tidak ada regression

## ✅ Acceptance Criteria

1. **Footer tetap di posisi** setelah keyboard close
2. **Tidak ada warna putih** di bagian bawah
3. **Keyboard transition smooth** (no lag)
4. **Input tetap berfungsi** normal
5. **No regression** di fitur lain

## 📚 Referensi

- [React Native KeyboardAvoidingView](https://reactnative.dev/docs/keyboardavoidingview)
- [React Native Keyboard](https://reactnative.dev/docs/keyboard)
- [KeyboardAwareScrollView](https://github.com/APSL/react-native-keyboard-aware-scroll-view)

## 🔄 Status

**Status**: ❌ Reverted
**Created**: 2026-04-01
**Updated**: 2026-04-01
**Completed**: -

## 📝 Notes

Implementation sudah dilakukan tetapi di-revert karena berefek pada tampilan lain.
Perlu pendekatan yang berbeda untuk fix bug ini.

### Root Cause (Identified)

1. **Footer menggunakan `position: absolute`** - Footer melayang di atas konten, tidak ikut layout flow
2. **`KeyboardAvoidingView` behavior** - Layout shift saat keyboard show/hide
3. **View wrapper dengan `flex: 0`** - ScrollView tidak expand dengan benar

### Implementation Attempted

**File**: `components/_ShareComponent/NewWrapper.tsx`

#### Perubahan yang dicoba:
- Hapus `View` wrapper dengan `flex: 1` di FlatList mode
- Hapus `View` wrapper dengan `flex: 0` di ScrollView mode
- Footer menggunakan `SafeAreaView` (normal flow, bukan position absolute)
- Hapus `styles.footerContainer` dengan `position: absolute`

### Why Reverted

❌ Berdampak pada tampilan lain (footer terangkat/berantakan)
❌ Perlu pendekatan yang lebih hati-hati
❌ Perlu test lebih menyeluruh di semua screen

### Next Steps

1. **Analisis lebih detail** - Cek screen mana saja yang affected
2. **Pendekatan bertahap** - Fix per screen atau per type
3. **Test menyeluruh** - Pastikan tidak ada regression
4. **Alternative solution** - Mungkin perlu custom keyboard handling
