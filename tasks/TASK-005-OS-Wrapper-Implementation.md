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

### ✅ Phase 2: Profile, Waiting Room, Delete Account - COMPLETED (2026-04-08)

**Files migrated: 10**

#### Profile Screens:
- ✅ `app/(application)/(user)/profile/[id]/index.tsx` - NewWrapper → OS_Wrapper (list with pull-to-refresh)
- ✅ `app/(application)/(user)/profile/[id]/edit.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `app/(application)/(user)/profile/create.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `app/(application)/(user)/profile/[id]/blocked-list.tsx` - NewWrapper → OS_Wrapper (pagination list)
- ✅ `app/(application)/(user)/profile/[id]/detail-blocked.tsx` - NewWrapper → OS_Wrapper (static with footer)
- ✅ `app/(application)/(user)/profile/[id]/update-background.tsx` - ViewWrapper → OS_Wrapper (static with footer)
- ✅ `app/(application)/(user)/profile/[id]/update-photo.tsx` - ViewWrapper → OS_Wrapper (static with footer)

#### Other Screens:
- ✅ `app/(application)/(user)/waiting-room.tsx` - NewWrapper → OS_Wrapper (static with refresh + footer)
- ✅ `app/(application)/(user)/delete-account.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})

### ✅ Phase 3: Portfolio Screens - COMPLETED (2026-04-08)

**Files migrated: 6**

#### Portfolio Screens:
- ✅ `app/(application)/(user)/portofolio/[id]/index.tsx` - ViewWrapper → OS_Wrapper (detail screen with pull-to-refresh)
- ✅ `app/(application)/(user)/portofolio/[id]/edit.tsx` - NewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `app/(application)/(user)/portofolio/[id]/edit-logo.tsx` - ViewWrapper → OS_Wrapper (static with footer)
- ✅ `app/(application)/(user)/portofolio/[id]/edit-social-media.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `screens/Portofolio/ViewListPortofolio.tsx` - NewWrapper → OS_Wrapper (pagination list)
- ✅ `screens/Portofolio/ScreenPortofolioCreate.tsx` - NewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})

### ✅ Phase 4: Maps Screens - COMPLETED (2026-04-08)

**Files migrated: 2**

#### Maps Screens:
- ✅ `screens/Maps/ScreenMapsCreate.tsx` - NewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `screens/Maps/ScreenMapsEdit.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})

### ⏳ Phase 5: Event Management (Priority: MEDIUM)

- [ ] `screens/Admin/Event/ScreenEventList.tsx`
- [ ] `screens/Admin/Event/ScreenEventCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Admin/Event/ScreenEventEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

### ⏳ Phase 6: Voting Management (Priority: MEDIUM)

- [ ] `screens/Admin/Voting/ScreenVotingList.tsx`
- [ ] `screens/Admin/Voting/ScreenVotingCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Admin/Voting/ScreenVotingEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

### ⏳ Phase 7: Forum/Discussion Screens (Priority: LOW)

- [ ] `screens/Forum/ScreenForum.tsx`
- [ ] `screens/Forum/ScreenForumDetail.tsx`
- [ ] `screens/Forum/ScreenForumCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

### ⏳ Phase 8: Donation Management (Priority: LOW)

- [ ] `screens/Admin/Donation/ScreenDonationList.tsx`
- [ ] `screens/Admin/Donation/ScreenDonationCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Admin/Donation/ScreenDonationEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

### ⏳ Phase 9: Other Screens (Priority: LOW)
- [ ] `screens/Investasi/` - Investment screens
- [ ] `screens/Kolaborasi/` - Collaboration screens
- [ ] Other user-facing screens

## 📌 Notes & Patterns

### Spacing Pattern:
- **Default**: `contentPaddingBottom=100` (list & static screens)
- **Forms**: `contentPaddingBottom={250}` (HANYA untuk screens dengan TextInput/TextArea)
- **contentPadding=0** (default, per-screen control jika perlu)

### User Preference:
- **NO PADDING_INLINE by default** - Bisa mempersempit box tampilan
- User akan review dan tambahkan sendiri jika diperlukan per-screen

### Keyboard Handling:
- `enableKeyboardHandling` → Auto-scroll saat keyboard muncul (Android only)
- **Bug Fixed (2026-04-08)**: Input di paling atas tidak lagi "terlempar" keluar layar saat keyboard muncul
- **Solusi**: Menggunakan `UIManager.measure` untuk mendapatkan posisi absolut input (`pageY`), lalu conditional scroll:
  - Jika input DI ATAS keyboard (terlihat) → **TIDAK SCROLL**
  - Jika input DI BAWAH keyboard (tertutup) → **Scroll secukupnya**
- Tap anywhere di luar input → keyboard dismiss (sudah implementasi di kedua mode)

### Migration Pattern:

#### Untuk List Screen:
```tsx
<OS_Wrapper
  listData={pagination.listData}
  renderItem={renderItem}
  ListEmptyComponent={ListEmptyComponent}
  ListFooterComponent={ListFooterComponent}
  onEndReached={pagination.loadMore}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
/>
```

#### Untuk Static Screen:
```tsx
<OS_Wrapper
  headerComponent={<HeaderSection />}
  footerComponent={<FooterSection />}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
>
  <YourContent />
</OS_Wrapper>
```

#### Untuk Form Screen (dengan keyboard handling):
```tsx
<OS_Wrapper
  enableKeyboardHandling
  contentPaddingBottom={250}  // ← HANYA untuk screens dengan TextInput
  footerComponent={<SubmitButton />}
>
  <FormContent />
</OS_Wrapper>
```

## 🐛 Troubleshooting

### Issue: Tabs tidak muncul di Android
**Solution**: Pastikan tidak ada custom padding yang overriding default behavior. Jika masih bermasalah, cek apakah `contentPadding` atau `contentPaddingBottom` terlalu besar.

### Issue: Keyboard menutupi input di Android
**Solution**: Pastikan pakai `OS_Wrapper` dengan `enableKeyboardHandling={true}` dan `contentPaddingBottom={250}` untuk form screens.

### Issue: Pull-to-refresh tidak berfungsi di static mode
**Solution**: Sudah diperbaiki! `refreshControl` sekarang di-pass ke ScrollView di AndroidWrapper.

### Issue: Footer terlalu jauh dari bottom
**Solution**: Kurangi `contentPaddingBottom` (default: 100 untuk list). Untuk form screens tetap 250.

### Issue: White space di bottom saat keyboard close (Android)
**Solution**: Ini sudah di-fix di AndroidWrapper. Pastikan screen pakai OS_Wrapper, bukan NewWrapper langsung.

## 📊 Progress Tracking

| Phase | Total Files | Migrated | Testing | Status |
|-------|-------------|----------|---------|--------|
| Phase 1 (Job) | 9 | 9 | ✅ Complete | ✅ Complete |
| Phase 2 (Profile + Others) | 10 | 10 | ⏳ Pending | ✅ Complete |
| Phase 3 (Portfolio) | 6 | 6 | ⏳ Pending | ✅ Complete |
| Phase 4 (Maps) | 2 | 2 | ⏳ Pending | ✅ Complete |
| Phase 5 (Event) | TBD | 0 | 0 | ⏳ Pending |
| Phase 6 (Voting) | TBD | 0 | 0 | ⏳ Pending |
| Phase 7 (Forum) | TBD | 0 | 0 | ⏳ Pending |
| Phase 8 (Donation) | TBD | 0 | 0 | ⏳ Pending |
| Phase 9 (Other) | TBD | 0 | 0 | ⏳ Pending |
| **Total** | **27+** | **27** | **9** | **Phase 1-4 Complete** |

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
**Status**: Phase 1-4 Complete ✅ (27 files migrated)
**Next**: Phase 5 - Event Management Screens
