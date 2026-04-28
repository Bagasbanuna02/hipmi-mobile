# Keyboard Bug Investigation

## 🐛 Problem

Footer terangkat dan muncul area putih di bawah saat keyboard ditutup setelah input ke TextInput.

## 📋 Test Cases

### Test 1: Minimal Wrapper
**File**: `test-keyboard-bug.tsx`

Wrapper yang sangat sederhana:
```typescript
<KeyboardAvoidingView behavior="height">
  <ScrollView>
    <TextInput />
  </ScrollView>
  <SafeAreaView>Footer</SafeAreaView>
</KeyboardAvoidingView>
```

**Expected**: Footer tetap di bawah
**Actual**: ? (To be tested)

### Test 2: Original NewWrapper
**File**: `components/_ShareComponent/NewWrapper.tsx`

Wrapper yang digunakan di production:
```typescript
<KeyboardAvoidingView behavior="height">
  <View flex={0}>
    <ScrollView>
      {content}
    </ScrollView>
  </View>
  <View position="absolute">Footer</View>
</KeyboardAvoidingView>
```

**Expected**: Footer tetap di bawah
**Actual**: Footer terangkat, ada putih di bawah

## 🔍 Possible Causes

### 1. KeyboardAvoidingView Behavior
- **Android**: `behavior="height"` mengurangi height view saat keyboard muncul
- **Issue**: Saat keyboard close, height tidak kembali ke semula

### 2. View Wrapper dengan flex: 0
- NewWrapper menggunakan `<View style={{ flex: 0 }}>`
- Ini membuat ScrollView tidak expand dengan benar
- **Fix**: Coba `<View style={{ flex: 1 }}>`

### 3. Footer dengan position: absolute
- Footer "melayang" di atas konten
- Tidak ikut terdorong saat keyboard muncul
- Saat keyboard close, footer kembali tapi layout sudah berubah

### 4. SafeAreaView Insets
- Safe area insets berubah saat keyboard muncul
- Footer tidak handle insets dengan benar

## 🧪 Test Scenarios

1. **Test Input Focus**
   - [ ] Tap Input 1 → Keyboard muncul
   - [ ] Footer tetap di bawah?

2. **Test Input Blur**
   - [ ] Tap Input 1 → Keyboard muncul
   - [ ] Tap outside → Keyboard close
   - [ ] Footer kembali ke posisi?
   - [ ] Ada putih di bawah?

3. **Test Multiple Inputs**
   - [ ] Tap Input 1 → Input 2 → Input 3
   - [ ] Keyboard pindah dengan smooth
   - [ ] Footer tetap di bawah?

4. **Test Scroll After Close**
   - [ ] Input → Close keyboard
   - [ ] Scroll ke bawah
   - [ ] Footer terlihat?
   - [ ] Ada putih di bawah?

## 🔧 Potential Fixes

### Fix 1: Remove position: absolute
```typescript
// Before
<View style={{ position: "absolute", bottom: 0 }}>
  {footer}
</View>

// After
<SafeAreaView>
  {footer}
</SafeAreaView>
```

### Fix 2: Use flex: 1 instead of flex: 0
```typescript
// Before
<View style={{ flex: 0 }}>
  <ScrollView />
</View>

// After
<View style={{ flex: 1 }}>
  <ScrollView />
</View>
```

### Fix 3: Use KeyboardAwareScrollView
```typescript
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

<KeyboardAwareScrollView>
  {content}
</KeyboardAwareScrollView>
```

### Fix 4: Manual keyboard handling
```typescript
const [keyboardVisible, setKeyboardVisible] = useState(false);

useEffect(() => {
  const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
  const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
  return () => { show.remove(); hide.remove(); }
}, []);
```

## 📝 Test Results

| Test | Platform | Result | Notes |
|------|----------|--------|-------|
| Test 1 (Minimal) | Android | ? | TBD |
| Test 1 (Minimal) | iOS | ? | TBD |
| Test 2 (Original) | Android | ❌ Bug | Footer terangkat |
| Test 2 (Original) | iOS | ? | TBD |

## 🎯 Next Steps

1. Test dengan `TestWrapper` (minimal wrapper)
2. Identifikasi apakah bug dari wrapper atau React Native
3. Apply fix yang sesuai
4. Test di semua screen
