# TASK-005: OS_Wrapper Implementation

## 📋 Overview
Migrasi dari `NewWrapper` dan `NewWrapper_V2` ke `OS_Wrapper` yang otomatis menyesuaikan dengan platform (iOS/Android).

## 🎯 Goals
- ✅ Mengganti penggunaan `NewWrapper` → `OS_Wrapper` di user screens
- ✅ Mengganti penggunaan `NewWrapper_V2` → `OS_Wrapper` atau `PageWrapper` di form screens
- ✅ Memastikan tabs dan UI konsisten di iOS dan Android
- ✅ Backward compatible (wrapper lama tetap ada)

## 📦 Available Wrappers

### 1. **OS_Wrapper** (Recommended)
Auto-detect platform dan routing ke wrapper yang sesuai:
- iOS → `IOSWrapper` (berbasis NewWrapper)
- Android → `AndroidWrapper` (berbasis NewWrapper_V2)

### 2. **PageWrapper** (For Forms)
Sama seperti OS_Wrapper tapi dengan keyboard handling (Android only):
- `enableKeyboardHandling` - Auto scroll saat input focus
- `keyboardScrollOffset` - Offset scroll (default: 100)
- `contentPaddingBottom` - Extra padding bottom (default: 80)
- `contentPadding` - Content padding (default: 16)

### 3. **IOSWrapper** / **AndroidWrapper** (Direct Usage)
Untuk kasus khusus yang butuh platform-specific behavior.

## 📝 Migration Guide

### Before (Old Way)
```tsx
import NewWrapper from "@/components/_ShareComponent/NewWrapper";

// atau
import { NewWrapper_V2 } from "@/components/_ShareComponent/NewWrapper_V2";
```

### After (New Way)
```tsx
import { OS_Wrapper, PageWrapper } from "@/components";

// Static mode
<OS_Wrapper>
  <YourContent />
</OS_Wrapper>

// List mode
<OS_Wrapper
  listData={data}
  renderItem={({ item }) => <ItemCard item={item} />}
  ListEmptyComponent={<EmptyState />}
/>

// Form dengan keyboard handling
<PageWrapper
  enableKeyboardHandling
  keyboardScrollOffset={150}
>
  <FormContent />
</PageWrapper>
```

## 🚀 Implementation Phases

### Phase 1: User Screens (Priority: HIGH)
Files yang perlu di-migrate:

#### 1.1 Home/Beranda
- [ ] `screens/Beranda/ScreenBeranda.tsx` atau `ScreenBeranda2.tsx`
  - Ganti `NewWrapper` → `OS_Wrapper`
  - Test tabs behavior di iOS dan Android

#### 1.2 Profile Screens
- [ ] `screens/Profile/ScreenProfile.tsx`
- [ ] `screens/Profile/ScreenProfileEdit.tsx`
- [ ] `screens/Profile/ScreenProfileCreate.tsx`

#### 1.3 Forum/Discussion
- [ ] `screens/Forum/ScreenForum.tsx`
- [ ] `screens/Forum/ScreenForumDetail.tsx`
- [ ] `screens/Forum/ScreenForumCreate.tsx` → pakai `PageWrapper` (ada form)

#### 1.4 Portfolio
- [ ] `screens/Portfolio/ScreenPortfolio.tsx`
- [ ] `screens/Portfolio/ScreenPortfolioCreate.tsx` → pakai `PageWrapper`
- [ ] `screens/Portfolio/ScreenPortfolioEdit.tsx` → pakai `PageWrapper`

### Phase 2: Admin Screens (Priority: MEDIUM)
Files yang perlu di-migrate:

#### 2.1 Event Management
- [ ] `screens/Admin/Event/ScreenEventList.tsx`
- [ ] `screens/Admin/Event/ScreenEventCreate.tsx` → pakai `PageWrapper`
- [ ] `screens/Admin/Event/ScreenEventEdit.tsx` → pakai `PageWrapper`

#### 2.2 Voting Management
- [ ] `screens/Admin/Voting/ScreenVotingList.tsx`
- [ ] `screens/Admin/Voting/ScreenVotingCreate.tsx` → pakai `PageWrapper`
- [ ] `screens/Admin/Voting/ScreenVotingEdit.tsx` → pakai `PageWrapper`

#### 2.3 Donation Management
- [ ] `screens/Admin/Donation/ScreenDonationList.tsx`
- [ ] `screens/Admin/Donation/ScreenDonationCreate.tsx` → pakai `PageWrapper`
- [ ] `screens/Admin/Donation/ScreenDonationEdit.tsx` → pakai `PageWrapper`

#### 2.4 Job Management
- [ ] `screens/Job/ScreenJobList.tsx` (jika ada)
- [ ] `screens/Job/ScreenJobCreate.tsx` → sudah pakai `BoxButtonOnFooter`?
- [ ] `screens/Job/ScreenJobEdit.tsx` → sudah pakai `BoxButtonOnFooter`?

### Phase 3: Other Screens (Priority: LOW)
- [ ] `screens/Investasi/` - Investment screens
- [ ] `screens/Kolaborasi/` - Collaboration screens
- [ ] Other user-facing screens

## ✅ Testing Checklist

Setiap screen yang sudah di-migrate, test:

### iOS Testing
- [ ] UI tampil sesuai design
- [ ] Tabs berfungsi dengan baik
- [ ] ScrollView/FlatList scroll dengan smooth
- [ ] Keyboard tidak menutupi input (jika pakai PageWrapper)
- [ ] Footer muncul di posisi yang benar
- [ ] Pull to refresh berfungsi (jika ada)

### Android Testing
- [ ] UI tampil sesuai design
- [ ] Tabs berfungsi dengan baik
- [ ] ScrollView/FlatList scroll dengan smooth
- [ ] Keyboard handling: auto scroll saat input focus (jika pakai PageWrapper)
- [ ] Footer muncul di posisi yang benar (tidak tertutup navigation bar)
- [ ] Pull to refresh berfungsi (jika ada)

### Common Testing
- [ ] Background image muncul (jika `withBackground={true}`)
- [ ] Sticky header berfungsi (jika ada `headerComponent`)
- [ ] Footer fixed di bottom (jika ada `footerComponent`)
- [ ] Floating button muncul (jika ada `floatingButton`)
- [ ] Loading skeleton muncul saat pagination
- [ ] Empty state muncul saat data kosong

## 📌 Notes

### Kapan pakai OS_Wrapper vs PageWrapper?
- **OS_Wrapper**: Untuk screen yang hanya menampilkan data (list, detail, dll)
- **PageWrapper**: Untuk screen yang ada form input (create, edit, login, dll)

### Props yang sering digunakan:

#### Untuk List Screen:
```tsx
<OS_Wrapper
  listData={pagination.listData}
  renderItem={renderItem}
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
>
  <YourContent />
</OS_Wrapper>
```

#### Untuk Form Screen:
```tsx
<PageWrapper
  enableKeyboardHandling
  keyboardScrollOffset={150}
  contentPaddingBottom={100}
  footerComponent={
    <BoxButtonOnFooter>
      <ButtonCustom onPress={handleSubmit}>Submit</ButtonCustom>
    </BoxButtonOnFooter>
  }
>
  <FormContent />
</PageWrapper>
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

<OS_Wrapper
  listData={data}
  renderItem={renderItem}
  headerComponent={header}
  footerComponent={footer}
/>
```

## 🐛 Troubleshooting

### Issue: Tabs tidak muncul di Android
**Solution**: Pastikan tidak ada custom padding yang overriding default behavior. Jika masih bermasalah, cek apakah `contentPadding` atau `contentPaddingBottom` terlalu besar.

### Issue: Keyboard menutupi input di Android
**Solution**: Pastikan pakai `PageWrapper` dengan `enableKeyboardHandling={true}`. Adjust `keyboardScrollOffset` jika perlu.

### Issue: Footer terlalu jauh dari bottom
**Solution**: Kurangi `contentPaddingBottom` (default: 80). Untuk list screen tanpa navigation bar overlay, bisa set ke 0.

### Issue: White space di bottom saat keyboard close (Android)
**Solution**: Ini sudah di-fix di AndroidWrapper. Pastikan screen pakai OS_Wrapper/PageWrapper, bukan NewWrapper langsung.

## 📊 Progress Tracking

| Phase | Total Files | Migrated | Testing | Status |
|-------|-------------|----------|---------|--------|
| Phase 1 (User) | TBD | 0 | 0 | ⏳ Pending |
| Phase 2 (Admin) | TBD | 0 | 0 | ⏳ Pending |
| Phase 3 (Other) | TBD | 0 | 0 | ⏳ Pending |
| **Total** | **TBD** | **0** | **0** | **0%** |

## 🔄 Rollback Plan

Jika ada issue yang tidak bisa di-fix dalam 1 jam:
1. Revert perubahan di file yang bermasalah
2. Kembali ke NewWrapper/NewWrapper_V2
3. Dokumentasikan issue di CHANGE_LOG.md
4. Investigasi lebih lanjut dan coba lagi

---

**Co-authored-by**: Qwen-Coder <qwen-coder@alibabacloud.com>
**Created**: 2026-04-06
**Status**: Ready for Implementation
