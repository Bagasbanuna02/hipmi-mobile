# Task: TASK-002 - Expo Router Tabs Safe Area Fix

## 📋 Deskripsi

Expo Router Tabs di beberapa fitur (Event, Job, Voting, Donation, Investment) tertutup oleh navigation buttons Android pada device tertentu.

## 🎯 Tujuan

Tabs di semua fitur menggunakan Expo Router harus responsif dan tidak tertutup navigation buttons Android.

## 🔍 Analisis Masalah

### Fitur yang Terkena Dampak

| Fitur | Layout File | Status |
|-------|-------------|--------|
| Event | `app/(application)/(user)/event/(tabs)/_layout.tsx` | ❌ Tidak responsif |
| Job | `app/(application)/(user)/job/(tabs)/_layout.tsx` | ❌ Tidak responsif |
| Voting | `app/(application)/(user)/voting/(tabs)/_layout.tsx` | ❌ Tidak responsif |
| Donation | `app/(application)/(user)/donation/(tabs)/_layout.tsx` | ❌ Tidak responsif |
| Investment | `app/(application)/(user)/investment/(tabs)/_layout.tsx` | ❌ Tidak responsif |
| Collaboration | `app/(application)/(user)/collaboration/(tabs)/_layout.tsx` | ❌ Tidak responsif |

### Root Cause

`TabsStyles` di `styles/tabs-styles.ts` tidak menghormati safe area insets Android dengan benar.

## 📝 Solusi

### Opsi 1: Custom Tab Bar Component (RECOMMENDED)

Buat custom `tabBar` component yang menggunakan `SafeAreaView` untuk wrapping tab bar.

```typescript
// styles/tabs-styles.ts
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomTabBar(props: any) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{ 
      paddingBottom: insets.bottom,
      backgroundColor: MainColor.darkblue 
    }}>
      <BottomTabBar {...props} />
    </View>
  );
}
```

### Opsi 2: Update tabBarStyle dengan insets

Tambahkan dynamic height berdasarkan safe area insets.

## ✅ Acceptance Criteria

1. Tabs tidak tertutup navigation buttons Android
2. Tabs height konsisten di semua device
3. Tidak ada regression di iOS
4. Semua 6 fitur ter-fix

## 🔄 Status

**Status**: ✅ COMPLETED
**Created**: 2026-04-01
**Updated**: 2026-04-01
**Completed**: 2026-04-01

## 📝 Implementation Summary

### Changes Made

**Tabs Layout Wrappers** - Updated 6 layout files dengan safe area handling:
- ✅ `app/(application)/(user)/event/(tabs)/_layout.tsx`
- ✅ `app/(application)/(user)/job/(tabs)/_layout.tsx`
- ✅ `app/(application)/(user)/voting/(tabs)/_layout.tsx`
- ✅ `app/(application)/(user)/donation/(tabs)/_layout.tsx`
- ✅ `app/(application)/(user)/investment/(tabs)/_layout.tsx`
- ✅ `app/(application)/(user)/collaboration/(tabs)/_layout.tsx`

### Implementation Pattern

Setiap layout file menggunakan wrapper component pattern:

```typescript
function TabsWrapper() {
  const insets = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;

  return (
    <View style={{ flex: 1, backgroundColor: MainColor.darkblue }}>
      <Tabs screenOptions={TabsStyles}>
        {/* Tabs content */}
      </Tabs>
      {/* Safe area padding untuk Android */}
      {Platform.OS === "android" && paddingBottom > 0 && (
        <View style={{ height: paddingBottom, backgroundColor: MainColor.darkblue }} />
      )}
    </View>
  );
}
```

### Files Changed
- ✅ 6x Tabs layout files (Updated with safe area wrapper)

### Test Results
- ✅ TypeScript compilation: No errors
- ✅ All 6 tabs layouts: Safe area implemented
- ✅ Platform-specific: Android only (iOS unaffected)
- ✅ NewWrapper: Unchanged (original version preserved)

### Features Fixed

| Feature | Layout File | Status |
|---------|-------------|--------|
| Event | `app/(application)/(user)/event/(tabs)/_layout.tsx` | ✅ Fixed |
| Job | `app/(application)/(user)/job/(tabs)/_layout.tsx` | ✅ Fixed |
| Voting | `app/(application)/(user)/voting/(tabs)/_layout.tsx` | ✅ Fixed |
| Donation | `app/(application)/(user)/donation/(tabs)/_layout.tsx` | ✅ Fixed |
| Investment | `app/(application)/(user)/investment/(tabs)/_layout.tsx` | ✅ Fixed |
| Collaboration | `app/(application)/(user)/collaboration/(tabs)/_layout.tsx` | ✅ Fixed |

### Next Steps for User Testing

Test all 6 features on physical Android devices with:
- [ ] Navigation buttons (back, home, recent)
- [ ] Gesture navigation
- [ ] Various screen sizes

Test on iOS to ensure no regression:
- [ ] Home button devices
- [ ] Gesture devices (notch)
