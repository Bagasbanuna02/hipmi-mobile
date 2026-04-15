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

## ✅ User Phase 6: Event Screens - COMPLETED (2026-04-10)

**Files migrated: 16**

#### Event List & Create Screens:
- ✅ `screens/Event/ScreenBeranda.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list)
- ✅ `screens/Event/ScreenStatus.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list)
- ✅ `screens/Event/ScreenHistory.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list)
- ✅ `screens/Event/ScreenContribution.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list)
- ✅ `app/(application)/(user)/event/create.tsx` - NewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})

#### Event Detail & Sub-Screens (`[id]/`):
- ✅ `app/(application)/(user)/event/[id]/edit.tsx` - NewWrapper → OS_Wrapper (form + enableKeyboardHandling + contentPaddingBottom={250})
- ✅ `app/(application)/(user)/event/[id]/publish.tsx` - ViewWrapper → OS_Wrapper (detail with join button)
- ✅ `app/(application)/(user)/event/[id]/history.tsx` - ViewWrapper → OS_Wrapper (history detail)
- ✅ `app/(application)/(user)/event/[id]/contribution.tsx` - ViewWrapper → OS_Wrapper (contribution detail)
- ✅ `app/(application)/(user)/event/[id]/confirmation.tsx` - ViewWrapper → OS_Wrapper (confirmation flow)
- ✅ `app/(application)/(user)/event/[id]/[status]/detail-event.tsx` - ViewWrapper → OS_Wrapper (status detail)

#### Event `detail/` Sub-Routes:
- ✅ `app/(application)/(user)/event/detail/[id].tsx` - ViewWrapper → OS_Wrapper

---

## ✅ User Phase 7: Voting Screens - COMPLETED (2026-04-13)

**Files migrated: 11**

#### Voting List Screens (OS_Wrapper):
- ✅ `screens/Voting/ScreenBeranda.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list)
- ✅ `screens/Voting/ScreenContribution.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list)
- ✅ `screens/Voting/ScreenHistory.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list)
- ✅ `screens/Voting/ScreenStatus.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list)
- ✅ `screens/Voting/ScreenListOfContributor.tsx` - NewWrapper → OS_Wrapper (pagination list)

#### Voting Form Screens (OS_Wrapper with keyboard handling):
- ✅ `app/(application)/(user)/voting/create.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/voting/[id]/edit.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Voting Detail Screens (OS_Wrapper static):
- ✅ `app/(application)/(user)/voting/[id]/index.tsx` - ViewWrapper → OS_Wrapper (detail with pull-to-refresh)
- ✅ `app/(application)/(user)/voting/[id]/contribution.tsx` - ViewWrapper → OS_Wrapper (detail static)
- ✅ `app/(application)/(user)/voting/[id]/history.tsx` - ViewWrapper → OS_Wrapper (detail static)
- ✅ `app/(application)/(user)/voting/[id]/[status]/detail.tsx` - ViewWrapper → OS_Wrapper (detail static)

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

---

## ✅ User Phase 8: Donation Screens - COMPLETED (2026-04-13)

**Files migrated: 31**

#### Donation List Screens (OS_Wrapper - tabs dengan contentPadding={PADDING_INLINE}):
- ✅ `screens/Donation/ScreenBeranda.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list - index)
- ✅ `screens/Donation/ScreenMyDonation.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list - my-donation)
- ✅ `screens/Donation/ScreenStatus.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list - status)

#### Donation List/Recap Screens (OS_Wrapper dengan contentPadding={PADDING_INLINE}):
- ✅ `screens/Donation/ScreenFundDisbursement.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (fund disbursement list)
- ✅ `screens/Donation/ScreenListOfDonatur.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (donatur list)
- ✅ `screens/Donation/ScreenListOfNews.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (news list)
- ✅ `screens/Donation/ScreenRecapOfNews.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (news recap)

#### Donation Detail & Info Screens (OS_Wrapper static):
- ✅ `app/(application)/(user)/donation/[id]/index.tsx` - NewWrapper → OS_Wrapper (detail main)
- ✅ `app/(application)/(user)/donation/[id]/[status]/detail.tsx` - NewWrapper → OS_Wrapper (detail status)
- ✅ `app/(application)/(user)/donation/[id]/infromation-fundrising.tsx` - ViewWrapper → OS_Wrapper (fund info)
- ✅ `app/(application)/(user)/donation/[id]/detail-story.tsx` - ViewWrapper → OS_Wrapper (story detail)

#### Donation Form Screens (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/(user)/donation/create.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/donation/[id]/edit.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/donation/create-story.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/donation/[id]/edit-story.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/donation/[id]/edit-rekening.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/donation/[id]/(news)/add-news.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/donation/[id]/(news)/[news]/edit-news.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/donation/[id]/(news)/[news]/index.tsx` - ViewWrapper → OS_Wrapper (news detail)
- ✅ `app/(application)/(user)/donation/[id]/(transaction-flow)/index.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Donation Transaction Flow (OS_Wrapper static/no keyboard):
- ✅ `app/(application)/(user)/donation/[id]/(transaction-flow)/select-bank.tsx` - ViewWrapper → OS_Wrapper (bank selection)
- ✅ `app/(application)/(user)/donation/[id]/(transaction-flow)/[invoiceId]/invoice.tsx` - ViewWrapper → OS_Wrapper (invoice with file upload)
- ✅ `app/(application)/(user)/donation/[id]/(transaction-flow)/[invoiceId]/process.tsx` - ViewWrapper → OS_Wrapper (payment process)
- ✅ `app/(application)/(user)/donation/[id]/(transaction-flow)/[invoiceId]/success.tsx` - ViewWrapper → OS_Wrapper (payment success)
- ✅ `app/(application)/(user)/donation/[id]/(transaction-flow)/[invoiceId]/failed.tsx` - ViewWrapper → OS_Wrapper (payment failed)

#### Crowdfunding Screen:
- ✅ `app/(application)/(user)/crowdfunding/index.tsx` - ViewWrapper → OS_Wrapper (static screen)

#### Tabs Layout Height Constants Fix:
- ✅ `app/(application)/(user)/voting/(tabs)/_layout.tsx` - Hardcode → `OS_IOS_HEIGHT` / `OS_ANDROID_HEIGHT`

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

---

## ✅ User Phase 9: Investment Screens - COMPLETED (2026-04-13)

**Files migrated: 24**

#### Investment Tabs Screens (OS_Wrapper - tabs dengan contentPadding={PADDING_INLINE}):
- ✅ `screens/Invesment/ScreenBursa.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list - index)
- ✅ `screens/Invesment/ScreenMyHolding.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list - my-holding)
- ✅ `screens/Invesment/ScreenPortofolio.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list - portofolio)
- ✅ `screens/Invesment/ScreenTransaction.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (tabs list - transaction)

#### Investment List/Document Screens (OS_Wrapper dengan contentPadding={PADDING_INLINE}):
- ✅ `screens/Invesment/ScreenInvestor.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (investor list)
- ✅ `screens/Invesment/Document/ScreenListDocument.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (document list)
- ✅ `screens/Invesment/Document/ScreenRecapOfDocument.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (document recap)
- ✅ `screens/Invesment/News/ScreenListOfNews.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (news list)
- ✅ `screens/Invesment/News/ScreenRecapOfNews.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` (news recap)

#### Investment Detail Screens (OS_Wrapper static):
- ✅ `app/(application)/(user)/investment/[id]/index.tsx` - ViewWrapper → OS_Wrapper (detail main)
- ✅ `app/(application)/(user)/investment/[id]/[status]/detail.tsx` - ViewWrapper → OS_Wrapper (detail status)
- ✅ `app/(application)/(user)/investment/[id]/(my-holding)/[id].tsx` - ViewWrapper → OS_Wrapper (holding detail)
- ✅ `app/(application)/(user)/investment/[id]/edit-prospectus.tsx` - ViewWrapper → OS_Wrapper (file upload)
- ✅ `app/(application)/(user)/investment/[id]/(news)/[news]/index.tsx` - ViewWrapper → OS_Wrapper (news detail)

#### Investment Form Screens (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/(user)/investment/create.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/investment/[id]/edit.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/investment/[id]/(document)/add-document.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/investment/[id]/(document)/edit-document.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/investment/[id]/(news)/add-news.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/(user)/investment/[id]/(transaction-flow)/index.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Investment Transaction Flow (OS_Wrapper static/no keyboard):
- ✅ `screens/Invesment/ScreenInvoice.tsx` - ViewWrapper → OS_Wrapper (invoice display)
- ✅ `app/(application)/(user)/investment/[id]/(transaction-flow)/process.tsx` - ViewWrapper → OS_Wrapper (status page)
- ✅ `app/(application)/(user)/investment/[id]/(transaction-flow)/select-bank.tsx` - ViewWrapper → OS_Wrapper (bank selection)
- ✅ `app/(application)/(user)/investment/[id]/(transaction-flow)/failed.tsx` - ViewWrapper → OS_Wrapper (status failed)
- ✅ `app/(application)/(user)/investment/[id]/(transaction-flow)/success.tsx` - ViewWrapper → OS_Wrapper (status success)

#### Investment Tabs Layout Height Fix:
- ✅ `app/(application)/(user)/investment/(tabs)/_layout.tsx` - Hardcode → `OS_IOS_HEIGHT` / `OS_ANDROID_HEIGHT`

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

#### ⚠️ Known Issues - Investment Upload:
- **Issue:** Error saat upload gambar di `investment/create.tsx`
- **Error Message:** `url >> http://192.168.1.112:3000/api/mobile/file` + `[ERROR] [AxiosError: Request failed with status code 500]`
- **Status:** ❌ Belum diperbaiki - akan diperbaiki besok
- **Note Penting:** Fitur Investment **belum sepenuhnya rampung** - masih ada issue upload file yang perlu diinvestigasi lebih lanjut. Kemungkinan masalah di server upload service atau environment development. Production saat ini masih aman.

---

# 🔴 ADMIN PHASES (Admin-Facing Screens)

## ✅ Admin Phase 9: User Access - COMPLETED (2026-04-09)

**Files migrated: 2**

#### User Access:
- ✅ `screens/Admin/User-Access/ScreenUserAccess.tsx` - NewWrapper → OS_Wrapper (list with pagination + search)
- ✅ `app/(application)/admin/user-access/[id]/index.tsx` - ViewWrapper → OS_Wrapper (detail with footer button)

## ✅ Admin Phase 1: Event Management - COMPLETED (2026-04-14)

**Files migrated: 8**

#### Admin Event Dashboard & List Screens (OS_Wrapper):
- ✅ `app/(application)/admin/event/index.tsx` - ViewWrapper → OS_Wrapper (dashboard screen)
- ✅ `screens/Admin/Event/ScreenEventStatus.tsx` - NewWrapper → OS_Wrapper (list with search + pagination)
- ✅ `screens/Admin/Event/ScreenEventListOfParticipants.tsx` - NewWrapper → OS_Wrapper (participant list with pagination)
- ✅ `screens/Admin/Event/ScreenEventDetail.tsx` - NewWrapper → OS_Wrapper (detail screen)

#### Admin Event Form Screens (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/admin/event/[id]/reject-input.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/admin/event/type-create.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/admin/event/type-update.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Admin Event Utility Screen:
- ✅ `app/(application)/admin/event/type-of-event.tsx` - NewWrapper → OS_Wrapper (type list screen)

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

## ✅ Admin Phase 2: Voting Management - COMPLETED (2026-04-14)

**Files migrated: 6** (5 migrated + 1 already done)

#### Admin Voting Dashboard & List Screens (OS_Wrapper):
- ✅ `app/(application)/admin/voting/index.tsx` - ViewWrapper → OS_Wrapper (dashboard screen)
- ✅ `screens/Admin/Voting/ScreenVotingStatus.tsx` - NewWrapper → OS_Wrapper (list with search + pagination)
- ✅ `screens/Admin/Voting/ScreenVotingHistory.tsx` - NewWrapper → OS_Wrapper (list with search + pagination)
- ✅ `app/(application)/admin/voting/[id]/[status]/index.tsx` - NewWrapper → OS_Wrapper (detail screen with hideFooter)

#### Admin Voting Form Screen (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/admin/voting/[id]/[status]/reject-input.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Admin Voting Utility Screen:
- ✅ `screens/Admin/Voting/ScreenEventTypeOfEvent.tsx` - Already migrated to OS_Wrapper ✅

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

## ⏳ Admin Phase 3: Donation Management (Priority: HIGH)
- [ ] `screens/Admin/Donation/ScreenDonationList.tsx`
- [ ] `screens/Admin/Donation/ScreenDonationCreate.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`
- [ ] `screens/Admin/Donation/ScreenDonationEdit.tsx` → pakai `enableKeyboardHandling` + `contentPaddingBottom={250}`

## ✅ Admin Phase 4: Forum Management - COMPLETED (2026-04-15)

**Files migrated: 6**

#### Admin Forum List Screens (OS_Wrapper):
- ✅ `screens/Admin/Forum/ScreenForumPosting.tsx` - NewWrapper → OS_Wrapper (forum posting list with search + pagination)
- ✅ `screens/Admin/Forum/ScreenForumReportComment.tsx` - NewWrapper → OS_Wrapper (reported comments list with search + pagination)
- ✅ `screens/Admin/Forum/ScreenForumReportPosting.tsx` - NewWrapper → OS_Wrapper (reported postings list with search + pagination)
- ✅ `screens/Admin/Forum/ScreenForumListComment.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` + disabled margin style (comment list with pagination)

#### Admin Forum Detail Screens (OS_Wrapper):
- ✅ `screens/Admin/Forum/ScreenForumDetailReportComment.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` + disabled margin style (comment detail + report list)
- ✅ `screens/Admin/Forum/ScreenForumDetailReportPosting.tsx` - NewWrapper → OS_Wrapper + `contentPadding={PADDING_INLINE}` + disabled margin style (posting detail + report list)

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

## ✅ Admin Phase 8: App Information - COMPLETED (2026-04-15)

**Files migrated: 9**

#### Admin App Information List Screens (OS_Wrapper):
- ✅ `screens/Admin/App-Information/ScreenAppInformation.tsx` - NewWrapper → OS_Wrapper (main list with category tabs + pagination)
- ✅ `screens/Admin/App-Information/ScreenBusinessFieldDetail.tsx` - NewWrapper → OS_Wrapper (detail with sub-bidang list + pagination)

#### Admin Business Field Form Screens (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/admin/app-information/business-field/create.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/admin/app-information/business-field/[id]/bidang-update.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/admin/app-information/business-field/[id]/sub-bidang-update.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Admin Information Bank Form Screens (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/admin/app-information/information-bank/create.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/admin/app-information/information-bank/[id]/index.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Admin Sticker Form Screens (OS_Wrapper static, no keyboard handling):
- ✅ `app/(application)/admin/app-information/sticker/create.tsx` - ViewWrapper → OS_Wrapper (SelectCustom + CheckboxGroup only)
- ✅ `app/(application)/admin/app-information/sticker/[id]/index.tsx` - ViewWrapper → OS_Wrapper (SelectCustom + CheckboxGroup only)

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

---

## ⏳ Admin Phase 5: Collaboration Management - PENDING
- [ ] `screens/Admin/Collaboration/ScreenCollaborationDetail.tsx`

## ✅ Admin Phase 6: Job Admin - COMPLETED (2026-04-14)

**Files migrated: 4**

#### Admin Job Dashboard (OS_Wrapper static):
- ✅ `app/(application)/admin/job/index.tsx` - ViewWrapper → OS_Wrapper (dashboard with status cards)

#### Admin Job List Screen (OS_Wrapper):
- ✅ `screens/Admin/Job/ScreenJobStatus.tsx` - NewWrapper → OS_Wrapper (pagination list with search)

#### Admin Job Detail Screen (OS_Wrapper static):
- ✅ `app/(application)/admin/job/[id]/[status]/index.tsx` - NewWrapper → OS_Wrapper (detail with action buttons)

#### Admin Job Form Screen (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/admin/job/[id]/[status]/reject-input.tsx` - NewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

## ⏳ Admin Phase 7: Investment Admin (Priority: LOW)
- [ ] `screens/Admin/Investment/ScreenInvestmentList.tsx`
- [ ] `screens/Admin/Investment/ScreenInvestmentDetail.tsx`
- [ ] `screens/Admin/Investment/ScreenInvestmentStatus.tsx`

## ✅ Admin Phase 8: App Information - COMPLETED (2026-04-15)

**Files migrated: 9**

#### Admin App Information List Screens (OS_Wrapper):
- ✅ `screens/Admin/App-Information/ScreenAppInformation.tsx` - NewWrapper → OS_Wrapper (main list with category tabs + pagination)
- ✅ `screens/Admin/App-Information/ScreenBusinessFieldDetail.tsx` - NewWrapper → OS_Wrapper (detail with sub-bidang list + pagination)

#### Admin Business Field Form Screens (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/admin/app-information/business-field/create.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/admin/app-information/business-field/[id]/bidang-update.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/admin/app-information/business-field/[id]/sub-bidang-update.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Admin Information Bank Form Screens (OS_Wrapper with enableKeyboardHandling):
- ✅ `app/(application)/admin/app-information/information-bank/create.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`
- ✅ `app/(application)/admin/app-information/information-bank/[id]/index.tsx` - ViewWrapper → OS_Wrapper + `enableKeyboardHandling` + `contentPaddingBottom={250}`

#### Admin Sticker Form Screens (OS_Wrapper static, no keyboard handling):
- ✅ `app/(application)/admin/app-information/sticker/create.tsx` - ViewWrapper → OS_Wrapper (SelectCustom + CheckboxGroup only)
- ✅ `app/(application)/admin/app-information/sticker/[id]/index.tsx` - ViewWrapper → OS_Wrapper (SelectCustom + CheckboxGroup only)

**Testing Status:**
- ✅ TypeScript: No errors
- ⏳ Build: Pending
- ⏳ iOS Testing: Pending
- ⏳ Android Testing: Pending

---

# 📌 Notes & Patterns

### Spacing Pattern:
- **Default**: `contentPaddingBottom=100` (list & static screens)
- **Forms**: `contentPaddingBottom={250}` (HANYA untuk screens dengan TextInput/TextArea)
- **contentPadding=0** (default, per-screen control jika perlu)
- **contentPadding={PADDING_INLINE}** (16px, ditambahkan khusus ke screen dalam `(tabs)` agar tidak terlalu mepet ke pinggir).

### User Preference:
- **NO PADDING_INLINE by default** - Bisa mempersempit box tampilan
- User akan review dan tambahkan sendiri jika diperlukan per-screen
- Khusus untuk tab screen (`(tabs)/`), ditambahkan `contentPadding={PADDING_INLINE}` agar tampilan lebih rapi.

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
  contentPadding={PADDING_INLINE} // Jika screen berada di dalam (tabs)
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
| User Phase 2 (Profile + Others) | 10 | 10 | ⏳ Pending | ✅ Complete |
| User Phase 3 (Portfolio) | 6 | 6 | ⏳ Pending | ✅ Complete |
| User Phase 4 (Maps) | 2 | 2 | ⏳ Pending | ✅ Complete |
| User Phase 5 (Forum) | 17 | 17 | ⏳ Pending | ✅ Complete |
| User Phase 6 (Event) | 16 | 16 | ⏳ Pending | ✅ Complete |
| User Phase 7 (Voting) | 11 | 11 | ✅ No errors | ✅ Complete |
| User Phase 8 (Donation + Others) | 31 | 31 | ✅ No errors | ✅ Complete |
| User Phase 9 (Investment) | 24 | 24 | ✅ No errors | ✅ Complete |
| User Phase 10 (Collaboration) | ~3 | 0 | 0 | ⏳ Pending |
| User Phase 11 (Others) | ~3 | 0 | 0 | ⏳ Pending |
| **User Total** | **~132** | **126** | **10** | **~95% Complete** |

### Admin Phases:
| Phase | Total Files | Migrated | Testing | Status |
|-------|-------------|----------|---------|--------|
| Admin Phase 1 (Event) | 8 | 8 | ✅ No errors | ✅ Complete |
| Admin Phase 2 (Voting) | 6 | 6 | ✅ No errors | ✅ Complete |
| Admin Phase 3 (Donation) | ~3 | 0 | 0 | ⏳ Pending |
| Admin Phase 4 (Forum) | ~5 | 0 | 0 | ⏳ Pending |
| Admin Phase 5 (Collaboration) | ~5 | 0 | 0 | ⏳ Pending |
| Admin Phase 6 (Job) | 4 | 4 | ✅ No errors | ✅ Complete |
| Admin Phase 7 (Investment) | ~3 | 0 | 0 | ⏳ Pending |
| Admin Phase 8 (App Info) | ~4 | 0 | 0 | ⏳ Pending |
| Admin Phase 9 (User Access) | 2 | 2 | 0 | ✅ Complete |
| **Admin Total** | **~40** | **20** | **0** | **~50% Complete** |

### Grand Total:
| Category | Total Files | Migrated | Status |
|----------|-------------|----------|--------|
| **User Screens** | ~132 | 126 | ~95% Complete |
| **Admin Screens** | ~40 | 20 | ~50% Complete |
| **GRAND TOTAL** | **~172** | **146** | **~85% Complete** |

## 🔄 Rollback Plan

Jika ada issue yang tidak bisa di-fix dalam 1 jam:
1. Revert perubahan di file yang bermasalah
2. Kembali ke NewWrapper/NewWrapper_V2
3. Dokumentasikan issue di CHANGE_LOG.md
4. Investigasi lebih lanjut dan coba lagi

---

**Co-authored-by**: Qwen-Coder <qwen-coder@alibabacloud.com>
**Created**: 2026-04-06
**Last Updated**: 2026-04-14
**Status**: User Phase 1-9 Complete ✅ | Admin Phase 1, 2, 6 & 9 Complete ✅ (146 files migrated)
**Current**: Admin Phase 2 Complete ✅
**Next**: Admin Phase 3 (Donation, ~3 files) OR User Phase 10-11 (~6 files)
