# Fix Phone Number Input - iOS 16+ Compatibility

## 📋 Ringkasan Task
Memperbaiki masalah phone number input pada `screens/Authentication/LoginView.tsx` yang tidak berfungsi dengan baik pada iOS versi 16 ke atas.

---

## 🎯 Tujuan
1. Fix keyboard overlay issues pada iOS 16+
2. Perbaiki layout measurement dan safe area
3. Pastikan input phone number responsive di semua device
4. Maintain UX yang konsisten dengan Android

---

## 📁 File yang Terlibat

### File Utama
- **Target**: `screens/Authentication/LoginView.tsx`

### File Pendukung
- `components/TextInput/TextInputCustom.tsx` - Alternatif custom input
- `styles/global-styles.ts` - Styling adjustments
- `package.json` - Update dependencies (jika perlu)

### Dependencies Terkait
- `react-native-international-phone-number`: ^0.9.3
- `react-native-keyboard-controller`: ^1.18.6

---

## 🔍 Analisis Masalah

### Issues pada iOS 16+

#### 1. **Keyboard Overlay Problem**
**Symptom**: Input field tertutup keyboard saat aktif
**Cause**: 
- Safe area insets tidak terhitung dengan benar
- Keyboard animation tidak sinkron dengan layout
- `react-native-keyboard-controller` tidak terintegrasi dengan baik

#### 2. **Layout Measurement Issues**
**Symptom**: Input field berubah ukuran secara tidak terduga
**Cause**:
- Dynamic Type settings mempengaruhi layout
- Font scaling pada iOS 16+ berbeda
- Container tidak memiliki fixed height

#### 3. **Focus Behavior**
**Symptom**: Input tidak auto-scroll saat di-focus
**Cause**:
- ScrollView/KeyboardAvoidingView configuration salah
- Keyboard dismissing behavior tidak konsisten

#### 4. **Visual Glitches**
**Symptom**: Country flag dropdown tidak muncul atau terpotong
**Cause**:
- Z-index issues pada iOS
- Modal/Popover rendering problems

---

## 🎨 Solusi yang Direkomendasikan

### Option 1: **KeyboardAvoidingView Enhancement** (RECOMMENDED)
**Effort**: Medium
**Impact**: High

```typescript
import { KeyboardAvoidingView, Platform } from "react-native";

<KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 50}
  style={{ flex: 1 }}
>
  <ViewWrapper>
    {/* Content */}
  </ViewWrapper>
</KeyboardAvoidingView>
```

**Keuntungan**:
- Native solution dari React Native
- Tidak perlu tambahan library
- Stabil untuk iOS 16+

**Kekurangan**:
- Perlu tuning offset untuk setiap device
- Tidak se-smooth keyboard controller

### Option 2: **React Native Keyboard Controller** (BETTER UX)
**Effort**: Medium-High
**Impact**: High

```typescript
import { KeyboardProvider } from "react-native-keyboard-controller";

// Wrap di root app (sudah ada di _layout.tsx)
<KeyboardProvider>
  <App />
</KeyboardProvider>

// Di LoginView
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

<KeyboardAwareScrollView
  bottomOffset={20}
  keyboardOffset={10}
>
  {/* Content */}
</KeyboardAwareScrollView>
```

**Keuntungan**:
- Smooth keyboard animations
- Better control over keyboard behavior
- Cross-platform consistency

**Kekurangan**:
- Perlu verify konfigurasi yang sudah ada
- Mungkin perlu update library

### Option 3: **Custom Phone Input** (FALLBACK)
**Effort**: High
**Impact**: Medium

Membuat custom phone input dengan:
- TextInputCustom component
- Country code picker modal
- Validation logic

**Keuntungan**:
- Full control atas behavior
- Tidak depend on third-party issues

**Kekurangan**:
- Development time lebih lama
- Perlu testing ekstensif
- Maintain code sendiri

---

## 📝 Breakdown Task

### Task 1: Research & Setup ✅
- [x] Identifikasi masalah pada iOS 16+
- [x] Cek dokumentasi library
- [x] Review existing implementation
- [ ] Test di iOS simulator (iOS 16+)
- [ ] Test di device fisik (jika ada)

### Task 2: Implement KeyboardAvoidingView Fix
- [ ] Wrap ViewWrapper dengan KeyboardAvoidingView
- [ ] Set behavior berdasarkan Platform
- [ ] Adjust keyboardVerticalOffset
- [ ] Test di berbagai ukuran layar
- [ ] Test landscape mode (jika applicable)

### Task 3: Adjust Layout & Styling
- [ ] Fix container height/width
- [ ] Adjust safe area insets
- [ ] Test dengan Dynamic Type settings
- [ ] Ensure consistent padding/margin

### Task 4: Test Focus Behavior
- [ ] Auto-scroll saat focus
- [ ] Keyboard dismiss saat tap outside
- [ ] Next/previous field navigation (jika ada)
- [ ] Input validation on blur

### Task 5: Country Picker Fix
- [ ] Verify dropdown z-index
- [ ] Test modal presentation
- [ ] Ensure flag icons visible
- [ ] Test search functionality

### Task 6: Testing & QA
- [ ] Test iOS 16, 17, 18
- [ ] Test Android (regression)
- [ ] Test dengan berbagai device sizes
- [ ] Test accessibility (VoiceOver)
- [ ] Performance test (no lag)

### Task 7: Documentation
- [ ] Update code comments
- [ ] Document iOS-specific workarounds
- [ ] Add troubleshooting notes

---

## 💻 Implementation Guidelines

### Recommended Implementation (Option 1 + 2 Hybrid)

```typescript
import { KeyboardAvoidingView, Platform } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

// Di LoginView.tsx
export default function LoginView() {
  return (
    <ViewWrapper
      withBackground
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
        style={{ flex: 1 }}
      >
        <View style={[GStyles.authContainer, { paddingBottom: 40 }]}>
          {/* Title Section */}
          <View style={GStyles.authContainerTitle}>
            <Text style={GStyles.authSubTitle}>WELCOME TO</Text>
            <Spacing height={5} />
            <Text style={GStyles.authTitle}>HIPMI BADUNG APPS</Text>
            <Spacing height={5} />
          </View>
          
          <Spacing height={50} />
          
          {/* Phone Input - Wrap dengan View untuk stability */}
          <View style={{ marginBottom: 20 }}>
            <PhoneInput
              value={inputValue}
              onChangePhoneNumber={handleInputValue}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={handleSelectedCountry}
              defaultCountry="ID"
              placeholder="Masukkan nomor"
              // Add iOS-specific props
              textInputProps={{
                keyboardType: "phone-pad",
                autoComplete: "tel",
                importantForAutofill: "yes",
              }}
            />
          </View>
          
          <Spacing />
          
          {/* Login Button */}
          <ButtonCustom
            onPress={handleLogin}
            disabled={loadingTerm}
            isLoading={loading || loadingTerm}
          >
            Login
          </ButtonCustom>
          
          <Spacing height={50} />
          
          {/* Terms Text */}
          <Text style={{ ...GStyles.textLabel, textAlign: "center", fontSize: 12 }}>
            Dengan menggunakan aplikasi ini, Anda telah menyetujui{" "}
            <Text
              style={{
                color: MainColor.yellow,
                textDecorationLine: "underline",
              }}
              onPress={() => {
                const toUrl = `${url}/terms-of-service.html`;
                openBrowser(toUrl);
              }}
            >
              Syarat & Ketentuan
            </Text>{" "}
            dan seluruh kebijakan privasi yang berlaku.
          </Text>
          
          {/* Version Info */}
          <Text
            style={{
              position: "absolute",
              bottom: 35,
              right: 50,
              fontSize: 10,
              fontWeight: "thin",
              fontStyle: "italic",
              color: MainColor.white_gray,
            }}
          >
            {version} | powered by muku.id
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ViewWrapper>
  );
}
```

### Styling Adjustments

```typescript
// styles/global-styles.ts
export const GStyles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    // Add padding bottom untuk keyboard space
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  // ... existing styles
});
```

---

## ✅ Acceptance Criteria

### Functional
- [ ] Input field tidak tertutup keyboard saat focus
- [ ] Country picker dropdown berfungsi dengan baik
- [ ] Auto-scroll bekerja smooth saat focus
- [ ] Keyboard dismiss saat tap outside
- [ ] Input validation berjalan normal

### Visual
- [ ] Layout tidak berubah saat keyboard muncul
- [ ] No visual glitches atau flickering
- [ ] Country flag icons visible
- [ ] Consistent spacing dan padding

### Compatibility
- [ ] iOS 16, 17, 18 - Tested ✅
- [ ] Android - No regression ✅
- [ ] iPad - Responsive ✅
- [ ] Landscape mode - Usable ✅

### Performance
- [ ] No lag saat typing
- [ ] Smooth keyboard animations
- [ ] No memory leaks
- [ ] Fast input response

---

## 🔗 References
- [React Native KeyboardAvoidingView Docs](https://reactnative.dev/docs/keyboardavoidingview)
- [react-native-keyboard-controller](https://github.com/kirillzyusko/react-native-keyboard-controller)
- [react-native-international-phone-number Issues](https://github.com/bluesky01/react-native-international-phone-number/issues)
- [iOS 16+ Keyboard Changes](https://developer.apple.com/documentation/uikit/uikit)

---

## 📊 Estimated Effort
- **Complexity**: Medium
- **Time Estimate**: 2-4 jam
- **Risk Level**: Medium (perlu testing ekstensif di device)

---

## 📝 Notes
- **Priority**: High (login adalah critical path)
- **Testing**: Wajib test di device fisik jika memungkinkan
- **Fallback**: Jika Option 1 & 2 gagal, siap untuk implement Option 3 (custom input)
- **Monitoring**: Add analytics untuk track input completion rate

---

**Created**: 2026-03-25
**Status**: Pending
**Priority**: High
**Related Issue**: iOS 16+ keyboard compatibility
