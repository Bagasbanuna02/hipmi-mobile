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

---

# 🔵 USER PHASES (User-Facing Screens)

## ✅ User Phase 1: Job Screens - COMPLETED (2026-04-06 to 2026-04-07)

**Files migrated: 9**

#### Job List Screens (OS_Wrapper):
- ✅ `screens/Job/ScreenBeranda.tsx` - ViewWrapper → OS_Wrapper
- ✅ `screens/Job/ScreenBeranda2.tsx` - NewWrapper_V2 → OS_Wrapper
- ✅ `screens/Job/ScreenArchive.tsx` - ViewWrapper → OS_Wrapper
- ✅ `screens/Job/ScreenArchive2.tsx` - NewWrapper_V2 → OS_Wrapper
- ✅ `screens/Job/MainViewStatus.tsx` - ViewWrapper → OS_Wrapper
- ✅ `screens/Job/MainViewStatus2.tsx` - NewWrapper_V2 → OS_Wrapper

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

## ✅ User Phase 2: Profile, Waiting Room, Delete Account - COMPLETED (2026-04-08)

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

## ✅ User Phase 3: Portfolio Screens - COMPLETED (2026-04-08)

**Files migrated: 6**

#### Portfolio Screens:
- ✅ `app/(application)/(user)/portofolio/[id]/index.tsx` - ViewWrapper → OS_Wrapper (detail screen with pull-to-refresh)
- ✅ `app/(application)/(user)/portofolio/[id]/edit.tsx` - NewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `app/(application)/(user)/portofolio/[id]/edit-logo.tsx` - ViewWrapper → OS_Wrapper (static with footer)
- ✅ `app/(application)/(user)/portofolio/[id]/edit-social-media.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `screens/Portofolio/ViewListPortofolio.tsx` - NewWrapper → OS_Wrapper (pagination list)
- ✅ `screens/Portofolio/ScreenPortofolioCreate.tsx` - NewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})

## ✅ User Phase 4: Maps Screens - COMPLETED (2026-04-08)

**Files migrated: 2**

#### Maps Screens:
- ✅ `screens/Maps/ScreenMapsCreate.tsx` - NewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `screens/Maps/ScreenMapsEdit.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})

## ✅ User Phase 5: Forum Screens - COMPLETED (2026-04-09)

**Files migrated: 17**

#### Forum List & Create Screens:
- ✅ `screens/Forum/ViewBeranda.tsx` - ViewWrapper → OS_Wrapper
- ✅ `screens/Forum/ViewBeranda2.tsx` - NewWrapper → OS_Wrapper
- ✅ `screens/Forum/ViewBeranda3.tsx` - NewWrapper → OS_Wrapper (Active)
- ✅ `screens/Forum/create.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `screens/Forum/terms.tsx` - NewWrapper → OS_Wrapper (Terms page)

#### Forum Detail & Comments Screens:
- ✅ `screens/Forum/DetailForum.tsx` - NewWrapper → OS_Wrapper
- ✅ `screens/Forum/DetailForum2.tsx` - NewWrapper → OS_Wrapper (Active + disableFlexGrow fix)

#### User's Forum ("Forumku") Screens:
- ✅ `screens/Forum/ViewForumku.tsx` - ViewWrapper → OS_Wrapper
- ✅ `screens/Forum/ViewForumku2.tsx` - NewWrapper → OS_Wrapper

#### Report & Edit Screens:
- ✅ `app/(application)/(user)/forum/[id]/edit.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `app/(application)/(user)/forum/[id]/report-commentar.tsx` - ViewWrapper → OS_Wrapper (Static report form)
- ✅ `app/(application)/(user)/forum/[id]/report-posting.tsx` - ViewWrapper → OS_Wrapper (Static report form)
- ✅ `app/(application)/(user)/forum/[id]/other-report-commentar.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `app/(application)/(user)/forum/[id]/other-report-posting.tsx` - ViewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `app/(application)/(user)/forum/[id]/preview-report-comment.tsx` - NewWrapper → OS_Wrapper
- ✅ `app/(application)/(user)/forum/[id]/preview-report-posting.tsx` - NewWrapper → OS_Wrapper
- ✅ `app/(application)/(user)/forum/[id]/index.tsx` - Checked (No wrapper to migrate, just imports)

**Bug Fixes Implemented:**
- ✅ **Scroll Macet (Ghost Scroll):** Fixed dengan menghapus `KeyboardAvoidingView` & `TouchableWithoutFeedback` di List Mode `AndroidWrapper`.
- ✅ **Header Besar Terpotong:** Menambahkan props `disableFlexGrow={true}` untuk layar dengan header besar (DetailForum2).
- ✅ **Keyboard Dismiss:** Menggunakan `keyboardShouldPersistTaps="handled"` agar tap di area kosong menutup keyboard.

## ⏳ User Phase 6: Event Screens (Priority: HIGH)

- [ ] `app/(application)/(user)/event/create.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/(user)/event/(tabs)/index.tsx`
- [ ] `app/(application)/(user)/event/[id]/index.tsx` (detail)
- [ ] `app/(application)/(user)/event/detail/[id].tsx`

## ⏳ User Phase 7: Voting Screens (Priority: HIGH)

- [ ] `app/(application)/(user)/voting/create.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/(user)/voting/(tabs)/index.tsx`
- [ ] `app/(application)/(user)/voting/[id]/index.tsx` (detail)

## ⏳ User Phase 8: Donation Screens (Priority: HIGH)

- [ ] `app/(application)/(user)/donation/create.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/(user)/donation/create-story.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/(user)/donation/(tabs)/index.tsx`
- [ ] `app/(application)/(user)/donation/[id]/index.tsx` (detail)

## ⏳ User Phase 9: Investment Screens (Priority: MEDIUM)

- [ ] `app/(application)/(user)/investment/create.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/(user)/investment/(tabs)/index.tsx`
- [ ] `app/(application)/(user)/investment/[id]/index.tsx` (detail)

## ⏳ User Phase 10: Collaboration Screens (Priority: MEDIUM)

- [ ] `app/(application)/(user)/collaboration/create.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/(user)/collaboration/(tabs)/index.tsx`
- [ ] `app/(application)/(user)/collaboration/[id]/index.tsx` (detail)

## ⏳ User Phase 11: Other User Screens (Priority: LOW)

- [ ] `app/(application)/(user)/marketplace/index.tsx`
- [ ] `app/(application)/(user)/user-search/index.tsx`
- [ ] `app/(application)/(user)/notifications/` - Notification screens (TBD)
- [ ] `app/(application)/(user)/crowdfunding/` - Crowdfunding screens (TBD)

---

# 🔴 ADMIN PHASES (Admin-Facing Screens)

## ⏳ Admin Phase 1: Event Management (Priority: HIGH)

- [ ] `app/(application)/admin/event/index.tsx`
- [ ] `app/(application)/admin/event/type-create.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/admin/event/type-update.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/admin/event/type-of-event.tsx`
- [ ] `app/(application)/admin/event/[id]/index.tsx` (detail)
- [ ] `app/(application)/admin/event/[status]/index.tsx`

## ⏳ Admin Phase 2: Voting Management (Priority: HIGH)

- [ ] `app/(application)/admin/voting/index.tsx`
- [ ] `app/(application)/admin/voting/history.tsx`
- [ ] `app/(application)/admin/voting/[id]/index.tsx` (detail)
- [ ] `app/(application)/admin/voting/[status]/index.tsx`

## ⏳ Admin Phase 3: Donation Management (Priority: HIGH)

- [ ] `app/(application)/admin/donation/index.tsx`
- [ ] `app/(application)/admin/donation/category.tsx`
- [ ] `app/(application)/admin/donation/category-create.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/admin/donation/category-update.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `app/(application)/admin/donation/[id]/index.tsx` (detail)
- [ ] `app/(application)/admin/donation/[status]/index.tsx`

## ⏳ Admin Phase 4: Forum Admin (Priority: MEDIUM)

- [ ] `app/(application)/admin/forum/index.tsx`
- [ ] `app/(application)/admin/forum/posting.tsx`
- [ ] `app/(application)/admin/forum/report-posting.tsx`
- [ ] `app/(application)/admin/forum/report-comment.tsx`
- [ ] `app/(application)/admin/forum/[id]/index.tsx` (detail)

## ⏳ Admin Phase 5: Collaboration Admin (Priority: MEDIUM)

- [ ] `app/(application)/admin/collaboration/index.tsx`
- [ ] `app/(application)/admin/collaboration/group.tsx`
- [ ] `app/(application)/admin/collaboration/publish.tsx`
- [ ] `app/(application)/admin/collaboration/reject.tsx`
- [ ] `app/(application)/admin/collaboration/[id]/index.tsx` (detail)

## ⏳ Admin Phase 6: Job Admin (Priority: MEDIUM)

- [ ] `app/(application)/admin/job/index.tsx`
- [ ] `app/(application)/admin/job/[id]/index.tsx` (detail)
- [ ] `app/(application)/admin/job/[status]/index.tsx`

## ⏳ Admin Phase 7: Investment Admin (Priority: LOW)

- [ ] `app/(application)/admin/investment/index.tsx`
- [ ] `app/(application)/admin/investment/[id]/index.tsx` (detail)
- [ ] `app/(application)/admin/investment/[status]/index.tsx`

## ⏳ Admin Phase 8: App Information (Priority: LOW)

- [ ] `app/(application)/admin/app-information/index.tsx`
- [ ] `app/(application)/admin/app-information/business-field/` (TBD files)
- [ ] `app/(application)/admin/app-information/information-bank/` (TBD files)
- [ ] `app/(application)/admin/app-information/sticker/` (TBD files)

## ⏳ Admin Phase 9: User Access & Others (Priority: LOW)

- [x] `app/(application)/admin/user-access/index.tsx` - NewWrapper → OS_Wrapper (list with pagination + search)
- [x] `app/(application)/admin/user-access/[id]/index.tsx` - ViewWrapper → OS_Wrapper (detail with footer button)
- [ ] `app/(application)/admin/notification/` - Notification admin (TBD)
- [ ] `app/(application)/admin/super-admin/` - Super admin (TBD)
- [ ] `app/(application)/admin/dashboard.tsx`
- [ ] `app/(application)/admin/maps.tsx`

---

# 📌 Notes & Patterns

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

### User Phases:
| Phase | Total Files | Migrated | Testing | Status |
|-------|-------------|----------|---------|--------|
| User Phase 1 (Job) | 9 | 9 | ✅ Complete | ✅ Complete |
| User Phase 2 (Profile + Others) | 10 | 10 | ✅ Complete | ✅ Complete |
| User Phase 3 (Portfolio) | 6 | 6 | ⏳ Pending | ✅ Complete |
| User Phase 4 (Maps) | 2 | 2 | ⏳ Pending | ✅ Complete |
| User Phase 5 (Forum) | 17 | 17 | ⏳ Pending | ✅ Complete |
| User Phase 6 (Event) | ~4 | 0 | 0 | ⏳ Pending |
| User Phase 7 (Voting) | ~3 | 0 | 0 | ⏳ Pending |
| User Phase 8 (Donation) | ~4 | 0 | 0 | ⏳ Pending |
| User Phase 9 (Investment) | ~3 | 0 | 0 | ⏳ Pending |
| User Phase 10 (Collaboration) | ~3 | 0 | 0 | ⏳ Pending |
| User Phase 11 (Others) | ~4 | 0 | 0 | ⏳ Pending |
| **User Total** | **~69** | **44** | **9** | **~64% Complete** |

### Admin Phases:
| Phase | Total Files | Migrated | Testing | Status |
|-------|-------------|----------|---------|--------|
| Admin Phase 1 (Event) | ~6 | 0 | 0 | ⏳ Pending |
| Admin Phase 2 (Voting) | ~4 | 0 | 0 | ⏳ Pending |
| Admin Phase 3 (Donation) | ~6 | 0 | 0 | ⏳ Pending |
| Admin Phase 4 (Forum) | ~5 | 0 | 0 | ⏳ Pending |
| Admin Phase 5 (Collaboration) | ~5 | 0 | 0 | ⏳ Pending |
| Admin Phase 6 (Job) | ~3 | 0 | 0 | ⏳ Pending |
| Admin Phase 7 (Investment) | ~3 | 0 | 0 | ⏳ Pending |
| Admin Phase 8 (App Info) | ~4 | 0 | 0 | ⏳ Pending |
| Admin Phase 9 (User Access) | ~6 | 2 | 0 | 🔄 In Progress |
| **Admin Total** | **~42** | **2** | **0** | **5% Complete** |

### Grand Total:
| Category | Total Files | Migrated | Status |
|----------|-------------|----------|--------|
| **User Screens** | ~69 | 44 | ~64% Complete |
| **Admin Screens** | ~42 | 2 | 5% Complete |
| **GRAND TOTAL** | **~111** | **46** | **~41% Complete** |

## 🔄 Rollback Plan

Jika ada issue yang tidak bisa di-fix dalam 1 jam:
1. Revert perubahan di file yang bermasalah
2. Kembali ke NewWrapper/NewWrapper_V2
3. Dokumentasikan issue di CHANGE_LOG.md
4. Investigasi lebih lanjut dan coba lagi

---

**Co-authored-by**: Qwen-Coder <qwen-coder@alibabacloud.com>
**Created**: 2026-04-06
**Last Updated**: 2026-04-09
**Status**: User Phase 1-4 Complete ✅ (27 files migrated)
**Next**: User Phase 5 - Forum Screens
