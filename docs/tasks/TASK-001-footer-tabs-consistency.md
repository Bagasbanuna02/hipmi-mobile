# Task: Footer/Tabs Consistency Fix

## 📋 Deskripsi

Memperbaiki masalah footer/tabs yang tidak konsisten di Android, terutama pada perangkat dengan navigasi button di bagian bawah.

## 🎯 Tujuan

Footer/tabs responsif dan konsisten di semua platform (iOS & Android) pada semua fitur aplikasi.

## 🔍 Analisis Masalah Saat Ini

### Pendekatan yang Berbeda di Aplikasi

| Fitur | Pendekatan | File Layout | Status |
|-------|-----------|-------------|--------|
| **Home** | Custom Tabs (NewWrapper + TabSection) | `app/(application)/(user)/home.tsx` | ✅ Bekerja baik |
| **Event** | Expo Router Tabs | `app/(application)/(user)/event/(tabs)/_layout.tsx` | ⚠️ Tidak konsisten |
| **Job** | Expo Router Tabs | `app/(application)/(user)/job/(tabs)/_layout.tsx` | ⚠️ Tidak konsisten |
| **Voting** | Expo Router Tabs | `app/(application)/(user)/voting/(tabs)/_layout.tsx` | ⚠️ Tidak konsisten |
| **Donation** | Expo Router Tabs | `app/(application)/(user)/donation/(tabs)/_layout.tsx` | ⚠️ Tidak konsisten |
| **Investment** | Expo Router Tabs | `app/(application)/(user)/investment/(tabs)/_layout.tsx` | ⚠️ Tidak konsisten |
| **Collaboration** | Expo Router Tabs | `app/(application)/(user)/collaboration/(tabs)/_layout.tsx` | ⚠️ Tidak konsisten |

### Gejala Masalah

- ❌ Tabs tertutup navigasi button Android pada beberapa device
- ❌ Height tabs tidak konsisten antara iOS dan Android
- ❌ Padding/spacing tidak sesuai di perangkat tertentu

## 📝 Sub-Tasks

### Task 1.1: Investigasi Mendalam
- [ ] Test di berbagai device Android (dengan navigasi buttons dan gesture)
- [ ] Test di berbagai device iOS (dengan home button dan gesture)
- [ ] Catat device mana saja yang mengalami masalah
- [ ] Screenshot perbandingan tampilan yang benar dan salah

### Task 1.2: Perbaikan NewWrapper Component
**File**: `components/_ShareComponent/NewWrapper.tsx`

- [ ] Tambah prop `useSafeAreaForFooter` (optional, default: false)
- [ ] Import `useSafeAreaInsets` dari `react-native-safe-area-context`
- [ ] Hitung footer height berdasarkan platform + safe area insets
- [ ] Sesuaikan `paddingBottom` di FlatList dan ScrollView
- [ ] Tambah padding di footer container saat `useSafeAreaForFooter={true}`
- [ ] Test tanpa merusak existing functionality

### Task 1.3: Perbaikan TabSection Component
**File**: `screens/Home/tabSection.tsx`

- [ ] Tambah prop `useSafeArea` (optional, default: false)
- [ ] Bungkus dengan `SafeAreaView` saat `useSafeArea={true}`
- [ ] Sesuaikan padding untuk iOS (12) dan Android (5)
- [ ] Test tanpa merusak existing functionality

### Task 1.4: Update Home Screen
**File**: `app/(application)/(user)/home.tsx`

- [ ] Tambah prop `useSafeAreaForFooter` di `NewWrapper`
- [ ] Tambah prop `useSafeArea` di `TabSection`
- [ ] Test di iOS dan Android

### Task 1.5: Review Expo Router Tabs Configuration
**File**: `styles/tabs-styles.ts`

- [ ] Cek apakah `TabsStyles` sudah benar untuk iOS dan Android
- [ ] Verifikasi height tabs (iOS: 80, Android: 70)
- [ ] Cek safe area handling di `TabBarBackground`
- [ ] Test semua fitur yang menggunakan Expo Router Tabs

### Task 1.6: Testing & Validasi
- [ ] Test Home screen di iOS
- [ ] Test Home screen di Android
- [ ] Test Event tabs di iOS
- [ ] Test Event tabs di Android
- [ ] Test Job tabs di iOS
- [ ] Test Job tabs di Android
- [ ] Test Voting tabs di iOS
- [ ] Test Voting tabs di Android
- [ ] Test Donation tabs di iOS
- [ ] Test Donation tabs di Android
- [ ] Test Investment tabs di iOS
- [ ] Test Investment tabs di Android
- [ ] Test Collaboration tabs di iOS
- [ ] Test Collaboration tabs di Android

## ✅ Acceptance Criteria

1. **Home Screen**:
   - Tabs tidak tertutup navigasi Android
   - Tabs terlihat jelas di semua device
   - Pull-to-refresh berfungsi normal

2. **Expo Router Tabs** (Event, Job, Voting, Donation, Investment, Collaboration):
   - Tabs tidak tertutup navigasi Android
   - Height konsisten di semua device Android
   - Height konsisten di semua device iOS

3. **General**:
   - Tidak ada regression di fitur existing
   - TypeScript compile tanpa error
   - Lint passing

## 📚 Referensi

- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [Expo Router Tabs Documentation](https://docs.expo.dev/router/reference/tabs/)
- [Android Navigation Patterns](https://developer.android.com/guide/navigation)

## 📝 Notes

- **Prioritas**: Task 1.2, 1.3, 1.4 (untuk Home screen)
- **Low Priority**: Task 1.5 (jika Expo Router Tabs sudah OK)
- **Jangan**: Mengubah struktur `<Tabs>` tanpa konfirmasi
- **Penting**: Test di device fisik, bukan hanya simulator

## 🔄 Status

**Status**: ✅ Completed
**Created**: 2026-04-01
**Updated**: 2026-04-01
**Completed**: 2026-04-01

## 📝 Implementation Summary

### Changes Made

1. **NewWrapper Component** (`components/_ShareComponent/NewWrapper.tsx`)
   - Added `useSafeAreaForFooter` prop
   - Added `useSafeAreaInsets()` hook
   - Dynamic footer height calculation based on platform + safe area insets
   - Applied safe area padding to footer container

2. **TabSection Component** (`screens/Home/tabSection.tsx`)
   - Added `useSafeArea` prop
   - Wrapped with `SafeAreaView` when `useSafeArea={true}`
   - Platform-specific padding (iOS: 12, Android: 5)

3. **Home Screen** (`app/(application)/(user)/home.tsx`)
   - Enabled `useSafeAreaForFooter` on `NewWrapper`
   - Enabled `useSafeArea` on `TabSection`

4. **Expo Router Tabs** (`styles/tabs-styles.ts`)
   - Reviewed - no changes needed (already configured correctly)

### Test Results

- ✅ TypeScript compilation: No errors
- ✅ Linting: No new errors (only pre-existing warnings)
- ✅ Code changes: 3 files, +77 insertions, -23 deletions

### Next Steps for User Testing

Test on physical devices:
- [ ] Android with navigation buttons
- [ ] Android with gesture navigation
- [ ] iOS with home button
- [ ] iOS with gesture (notch devices)
