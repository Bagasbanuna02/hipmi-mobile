# TASK-005: OS_Wrapper Implementation

## 📋 Overview
Migrasi dari `NewWrapper` dan `NewWrapper_V2` ke `OS_Wrapper` yang otomatis menyesuaikan dengan platform (iOS/Android).

## 🎯 Goals
- ✅ Mengganti penggunaan `NewWrapper` → `OS_Wrapper` di user screens
- ✅ Mengganti penggunaan `NewWrapper_V2` → `OS_Wrapper` di form screens (dengan keyboard handling props)
- ✅ Memastikan tabs dan UI konsisten di iOS dan Android
- ✅ Backward compatible (wrapper lama tetap ada)
- ✅ **SIMPLIFIED**: Satu komponen `OS_Wrapper` untuk semua use cases (tidak ada `PageWrapper` terpisah)

## 📦 Available Wrappers

### 1. **OS_Wrapper** (Recommended - Unified API)
Auto-detect platform dan routing ke wrapper yang sesuai:
- iOS → `IOSWrapper` (berbasis NewWrapper)
- Android → `AndroidWrapper` (berbasis NewWrapper_V2 dengan keyboard handling)

**Props:**
```tsx
// Base props (kedua platform)
withBackground?: boolean;
headerComponent?: React.ReactNode;
footerComponent?: React.ReactNode;
floatingButton?: React.ReactNode;
hideFooter?: boolean;
edgesFooter?: Edge[];
style?: ViewStyle;
refreshControl?: RefreshControl;

// Keyboard handling (Android only - iOS mengabaikan)
enableKeyboardHandling?: boolean;      // Default: false
keyboardScrollOffset?: number;         // Default: 100
contentPaddingBottom?: number;         // Default: 100
contentPadding?: number;               // Default: 0
```

### 2. **IOSWrapper** / **AndroidWrapper** (Direct Usage)
Untuk kasus khusus yang butuh platform-specific behavior.

## 📝 Migration Guide

### Before (Old Way)
```tsx
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
// atau
import { NewWrapper_V2 } from "@/components/_ShareComponent/NewWrapper_V2";
```

### After (New Way - Unified API)
```tsx
import { OS_Wrapper } from "@/components";

// Static mode (simple content)
<OS_Wrapper>
  <YourContent />
</OS_Wrapper>

// List mode (with pagination)
<OS_Wrapper
  listData={data}
  renderItem={({ item }) => <ItemCard item={item} />}
  ListEmptyComponent={<EmptyState />}
  onEndReached={loadMore}
/>

// Form mode (with keyboard handling - Android only)
<OS_Wrapper
  enableKeyboardHandling
  contentPaddingBottom={250}  // ← HANYA untuk screens dengan TextInput
>
  <FormContent />
</OS_Wrapper>
```

## 🚀 Implementation Status

### ✅ Phase 1: Job Screens - COMPLETED (2026-04-06 to 2026-04-07)

**Files migrated: 9**

#### Job List Screens (OS_Wrapper):
- ✅ `screens/Job/ScreenBeranda.tsx` - ViewWrapper → OS_Wrapper + PADDING_INLINE
- ✅ `screens/Job/ScreenBeranda2.tsx` - NewWrapper_V2 → OS_Wrapper + PADDING_INLINE
- ✅ `screens/Job/ScreenArchive.tsx` - ViewWrapper → OS_Wrapper + PADDING_INLINE
- ✅ `screens/Job/ScreenArchive2.tsx` - NewWrapper_V2 → OS_Wrapper + PADDING_INLINE
- ✅ `screens/Job/MainViewStatus.tsx` - ViewWrapper → OS_Wrapper + PADDING_INLINE
- ✅ `screens/Job/MainViewStatus2.tsx` - NewWrapper_V2 → OS_Wrapper + PADDING_INLINE

#### Job Form Screens (OS_Wrapper with keyboard handling):
- ✅ `screens/Job/ScreenJobCreate.tsx` - NewWrapper_V2 → OS_Wrapper + enableKeyboardHandling + contentPaddingBottom={250}
- ✅ `screens/Job/ScreenJobEdit.tsx` - NewWrapper_V2 → OS_Wrapper + enableKeyboardHandling + contentPaddingBottom={250}

#### Job Detail Screen:
- ✅ `app/(application)/(user)/job/[id]/[status]/detail.tsx` - NewWrapper_V2 → OS_Wrapper

**Testing Status:**
- ✅ TypeScript: No errors
- ✅ Build: Success
- ✅ iOS Testing: Complete ✅
- ✅ Android Testing: Complete ✅

**Implementation Notes:**
- **contentPaddingBottom pattern**:
  - Default: `100` (list screens)
  - Forms: `250` (screens with TextInput/TextArea)
  - Override per-screen sesuai kebutuhan
- **PADDING_INLINE constant**: `16px` untuk konsisten padding horizontal
- Semua form screens menggunakan `enableKeyboardHandling` untuk keyboard auto-scroll di Android
- Semua list screens menggunakan pagination dengan `onEndReached`
- Floating button dan sticky header berfungsi dengan baik
- Footer component tetap di posisi bawah
- Tap anywhere untuk dismiss keyboard sudah implementasi

### ⏳ Phase 2: Other User Screens (Priority: HIGH)

#### Profile Screens:
- [ ] `screens/Profile/ScreenProfile.tsx`
- [ ] `screens/Profile/ScreenProfileEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Profile/ScreenProfileCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Forum/Discussion:
- [ ] `screens/Forum/ScreenForum.tsx`
- [ ] `screens/Forum/ScreenForumDetail.tsx`
- [ ] `screens/Forum/ScreenForumCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Portfolio:
- [ ] `screens/Portfolio/ScreenPortfolio.tsx`
- [ ] `screens/Portfolio/ScreenPortfolioCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Portfolio/ScreenPortfolioEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

### ⏳ Phase 3: Admin Screens (Priority: MEDIUM)

#### Event Management:
- [ ] `screens/Admin/Event/ScreenEventList.tsx`
- [ ] `screens/Admin/Event/ScreenEventCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Admin/Event/ScreenEventEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Voting Management:
- [ ] `screens/Admin/Voting/ScreenVotingList.tsx`
- [ ] `screens/Admin/Voting/ScreenVotingCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Admin/Voting/ScreenVotingEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Donation Management:
- [ ] `screens/Admin/Donation/ScreenDonationList.tsx`
- [ ] `screens/Admin/Donation/ScreenDonationCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Admin/Donation/ScreenDonationEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

### ⏳ Phase 4: Other Screens (Priority: LOW)
- [ ] `screens/Investasi/` - Investment screens
- [ ] `screens/Kolaborasi/` - Collaboration screens
- [ ] Other user-facing screens

## ✅ Testing Checklist

Setiap screen yang sudah di-migrate, test:

### iOS Testing
- [ ] UI tampil sesuai design
- [ ] Tabs berfungsi dengan baik
- [ ] ScrollView/FlatList scroll dengan smooth
- [ ] Keyboard tidak menutupi input (jika pakai `enableKeyboardHandling`)
- [ ] Footer muncul di posisi yang benar
- [ ] Pull to refresh berfungsi (jika ada)

### Android Testing
- [ ] UI tampil sesuai design
- [ ] Tabs berfungsi dengan baik
- [ ] ScrollView/FlatList scroll dengan smooth
- [ ] Keyboard handling: auto scroll saat input focus (jika pakai `enableKeyboardHandling`)
- [ ] Footer muncul di posisi yang benar (tidak tertutup navigation bar)
- [ ] Pull to refresh berfungsi (jika ada)

### Common Testing
- [ ] Background image muncul (jika `withBackground={true}`)
- [ ] Sticky header berfungsi (jika ada `headerComponent`)
- [ ] Footer fixed di bottom (jika ada `footerComponent`)
- [ ] Floating button muncul (jika ada `floatingButton`)
- [ ] Loading skeleton muncul saat pagination
- [ ] Empty state muncul saat data kosong
- [ ] Tap anywhere dismiss keyboard berfungsi
- [ ] contentPaddingBottom: 100 (list) / 250 (form) sesuai kebutuhan

## 📌 Notes

### Usage Pattern:

#### Untuk List Screen:
```tsx
<OS_Wrapper
  listData={pagination.listData}
  renderItem={renderItem}
  contentPadding={PADDING_INLINE}
  ListEmptyComponent={ListEmptyComponent}
  ListFooterComponent={ListFooterComponent}
  onEndReached={pagination.loadMore}
  refreshControl={
    <RefreshControl
      refreshing={pagination.refreshing}
      onRefresh={pagination.onRefresh}
    />
  }
/>
```

#### Untuk Static Screen:
```tsx
<OS_Wrapper
  headerComponent={<HeaderSection />}
  footerComponent={<FooterSection />}
  contentPadding={PADDING_INLINE}
>
  <YourContent />
</OS_Wrapper>
```

#### Untuk Form Screen (dengan keyboard handling):
```tsx
<OS_Wrapper
  enableKeyboardHandling
  contentPaddingBottom={250}  // ← HANYA untuk screens dengan TextInput
  contentPadding={PADDING_INLINE}
  footerComponent={
    <BoxButtonOnFooter>
      <ButtonCustom onPress={handleSubmit}>Submit</ButtonCustom>
    </BoxButtonOnFooter>
  }
>
  <FormContent />
</OS_Wrapper>
```

### Migration Pattern:

```tsx
// OLD
import NewWrapper from "@/components/_ShareComponent/NewWrapper";

<NewWrapper
  listData={data}
  renderItem={renderItem}
  headerComponent={header}
  footerComponent={footer}
/>

// NEW
import { OS_Wrapper } from "@/components";
import { PADDING_INLINE } from "@/constants/constans-value";

<OS_Wrapper
  listData={data}
  renderItem={renderItem}
  contentPadding={PADDING_INLINE}
  headerComponent={header}
  footerComponent={footer}
/>
```

```tsx
// OLD (Form with keyboard handling)
import { NewWrapper_V2 } from "@/components/_ShareComponent/NewWrapper_V2";

<NewWrapper_V2
  enableKeyboardHandling
  keyboardScrollOffset={150}
>
  <FormContent />
</NewWrapper_V2>

// NEW (Unified API)
import { OS_Wrapper } from "@/components";

<OS_Wrapper
  enableKeyboardHandling
  contentPaddingBottom={250}  // ← Explicit untuk form screens
>
  <FormContent />
</OS_Wrapper>
```

## 🐛 Troubleshooting

### Issue: Tabs tidak muncul di Android
**Solution**: Pastikan tidak ada custom padding yang overriding default behavior. Jika masih bermasalah, cek apakah `contentPadding` atau `contentPaddingBottom` terlalu besar.

### Issue: Keyboard menutupi input di Android
**Solution**: Pastikan pakai `OS_Wrapper` dengan `enableKeyboardHandling={true}` dan `contentPaddingBottom={250}` untuk form screens.

### Issue: Footer terlalu jauh dari bottom
**Solution**: Kurangi `contentPaddingBottom` (default: 100 untuk list). Untuk form screens tetap 250.

### Issue: White space di bottom saat keyboard close (Android)
**Solution**: Ini sudah di-fix di AndroidWrapper. Pastikan screen pakai OS_Wrapper, bukan NewWrapper langsung.

## 📊 Progress Tracking

| Phase | Total Files | Migrated | Testing | Status |
|-------|-------------|----------|---------|--------|
| Phase 1 (Job) | 9 | 9 | ✅ Complete | ✅ Complete |
| Phase 2 (User) | TBD | 0 | 0 | ⏳ Pending |
| Phase 3 (Admin) | TBD | 0 | 0 | ⏳ Pending |
| Phase 4 (Other) | TBD | 0 | 0 | ⏳ Pending |
| **Total** | **9+** | **9** | **9** | **100% (Phase 1)** |

## 🔄 Rollback Plan

Jika ada issue yang tidak bisa di-fix dalam 1 jam:
1. Revert perubahan di file yang bermasalah
2. Kembali ke NewWrapper/NewWrapper_V2
3. Dokumentasikan issue di CHANGE_LOG.md
4. Investigasi lebih lanjut dan coba lagi

---

**Co-authored-by**: Qwen-Coder <qwen-coder@alibabacloud.com>
**Created**: 2026-04-06
**Last Updated**: 2026-04-08
**Status**: Phase 1 (Job Screens) Complete ✅
**Next**: Phase 2 - Other User Screens (Profile, Forum, Portfolio)