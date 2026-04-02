# NewWrapper Keyboard Handling Implementation

## 📋 Problem Statement

NewWrapper saat ini memiliki masalah keyboard handling pada Android:
- Footer terangkat saat keyboard close
- Muncul area putih di bawah
- Input terpotong saat keyboard muncul
- Tidak ada auto-scroll ke focused input

## 🔍 Root Cause Analysis

### Current NewWrapper Structure

```typescript
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
  <View style={{ flex: 0 }}>  // ← MASALAH 1: flex: 0
    <ScrollView>
      {children}
    </ScrollView>
  </View>
  <View style={{ position: "absolute" }}>  // ← MASALAH 2: position absolute
    {footerComponent}
  </View>
</KeyboardAvoidingView>
```

### Issues Identified

| Issue | Impact | Severity |
|-------|--------|----------|
| `behavior="height"` di Android | View di-resize, content terpotong | 🔴 High |
| `flex: 0` pada View wrapper | ScrollView tidak expand dengan benar | 🔴 High |
| Footer dengan `position: absolute` | Footer tidak ikut layout flow | 🟡 Medium |
| Tidak ada keyboard event handling | Tidak ada auto-scroll ke input | 🟡 Medium |

---

## 💡 Proposed Solutions

### Option A: Full Integration (Breaking Changes)

Replace entire KeyboardAvoidingView logic dengan keyboard handling baru.

```typescript
// NewWrapper.tsx
export function NewWrapper({ children, footerComponent }: Props) {
  const { scrollViewRef, createFocusHandler } = useKeyboardForm();
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
        {children}
      </ScrollView>
      <SafeAreaView style={{ position: 'absolute', bottom: 0 }}>
        {footerComponent}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
```

**Pros:**
- ✅ Clean implementation
- ✅ Consistent behavior across all screens
- ✅ Single source of truth

**Cons:**
- ❌ **Breaking changes** - Semua screen yang pakai NewWrapper akan affected
- ❌ **Need to add onFocus handlers** to all TextInput/TextArea components
- ❌ **High risk** - May break existing screens
- ❌ **Requires testing** all screens that use NewWrapper

**Impact:**
- All existing screens using NewWrapper will be affected
- Need to add `onFocus` handlers to all inputs
- Need to wrap inputs with `View onStartShouldSetResponder`

---

### Option B: Opt-in Feature (Recommended) ⭐

Add flag to enable keyboard handling optionally (backward compatible).

```typescript
// NewWrapper.tsx
interface NewWrapperProps {
  // ... existing props
  enableKeyboardHandling?: boolean;  // Default: false
  keyboardScrollOffset?: number;     // Default: 100
}

export function NewWrapper(props: NewWrapperProps) {
  const { 
    enableKeyboardHandling = false,
    keyboardScrollOffset = 100,
    ...rest 
  } = props;

  // Use keyboard hook if enabled
  const keyboardForm = enableKeyboardHandling 
    ? useKeyboardForm(keyboardScrollOffset) 
    : null;

  // Render different structure based on flag
  if (enableKeyboardHandling && keyboardForm) {
    return renderWithKeyboardHandling(rest, keyboardForm);
  }
  
  return renderOriginal(rest);
}
```

**Pros:**
- ✅ **Backward compatible** - No breaking changes
- ✅ **Opt-in** - Screens yang butuh bisa enable
- ✅ **Safe** - Existing screens tetap bekerja
- ✅ **Gradual migration** - Bisa migrate screen by screen
- ✅ **Low risk** - Can test with new screens first

**Cons:**
- ⚠️ More code (duplicate logic)
- ⚠️ Need to maintain 2 implementations temporarily

**Usage Example:**

```typescript
// Existing screens - No changes needed!
<NewWrapper footerComponent={<Footer />}>
  <Content />
</NewWrapper>

// New screens with forms - Enable keyboard handling
<NewWrapper 
  enableKeyboardHandling
  keyboardScrollOffset={100}
  footerComponent={<Footer />}
>
  <View onStartShouldSetResponder={() => true}>
    <TextInputCustom onFocus={keyboardForm.createFocusHandler()} />
  </View>
</NewWrapper>
```

---

### Option C: Create New Component (Safest)

Keep NewWrapper as is, create separate component for forms.

```typescript
// Keep NewWrapper unchanged
// Use FormWrapper for forms (already created!)
```

**Pros:**
- ✅ **Zero risk** - NewWrapper tidak berubah
- ✅ **Clear separation** - Old vs New
- ✅ **Safe for existing screens**
- ✅ **FormWrapper already exists!**

**Cons:**
- ⚠️ Multiple wrapper components
- ⚠️ Confusion which one to use

**Usage:**
```typescript
// For regular screens
<NewWrapper>{content}</NewWrapper>

// For form screens
<FormWrapper footerComponent={<Footer />}>
  <TextInputCustom />
</FormWrapper>
```

---

## 📊 Comparison Matrix

| Criteria | Option A | Option B | Option C |
|----------|----------|----------|----------|
| **Backward Compatible** | ❌ | ✅ | ✅ |
| **Implementation Effort** | High | Medium | Low |
| **Risk Level** | 🔴 High | 🟡 Medium | 🟢 Low |
| **Code Duplication** | None | Temporary | Permanent |
| **Migration Required** | Yes | Gradual | No |
| **Testing Required** | All screens | New screens only | New screens only |
| **Recommended For** | Greenfield projects | Existing projects | Conservative teams |

---

## 🎯 Recommended Approach: Option B (Opt-in)

### Implementation Plan

#### Phase 1: Add Keyboard Handling to NewWrapper (Week 1)

```typescript
// Add to NewWrapper interface
interface NewWrapperProps {
  enableKeyboardHandling?: boolean;
  keyboardScrollOffset?: number;
}

// Implement dual rendering logic
if (enableKeyboardHandling) {
  return renderWithKeyboardHandling(props);
}
return renderOriginal(props);
```

#### Phase 2: Test with New Screens (Week 2)

- Test with Job Create 2 screen
- Verify auto-scroll works
- Verify footer stays in place
- Test on iOS and Android

#### Phase 3: Gradual Migration (Week 3-4)

Migrate screens one by one:
1. Event Create
2. Donation Create
3. Investment Create
4. Voting Create
5. Profile Create/Edit

#### Phase 4: Make Default (Next Major Version)

After thorough testing:
- Make `enableKeyboardHandling` default to `true`
- Deprecate old behavior
- Remove old code in next major version

---

## 📝 Technical Requirements

### For NewWrapper with Keyboard Handling

```typescript
// 1. Import hook
import { useKeyboardForm } from "@/hooks/useKeyboardForm";

// 2. Use hook in component
const { scrollViewRef, createFocusHandler } = useKeyboardForm(100);

// 3. Pass ref to ScrollView
<ScrollView ref={scrollViewRef}>

// 4. Wrap inputs with View
<View onStartShouldSetResponder={() => true}>
  <TextInputCustom onFocus={createFocusHandler()} />
</View>
```

### Required Changes per Screen

For each screen that enables keyboard handling:

1. **Add `enableKeyboardHandling` prop**
2. **Wrap all TextInput/TextArea with View**
3. **Add `onFocus` handler to inputs**
4. **Test thoroughly**

---

## 🧪 Testing Checklist

### For Each Screen

- [ ] Tap Input 1 → Auto-scroll to input
- [ ] Tap Input 2 → Auto-scroll to input
- [ ] Tap Input 3 → Auto-scroll to input
- [ ] Dismiss keyboard → Footer returns to position
- [ ] No white area at bottom
- [ ] Footer not raised
- [ ] Smooth transitions
- [ ] iOS compatibility
- [ ] Android compatibility

### Platforms to Test

- [ ] Android with navigation buttons
- [ ] Android with gesture navigation
- [ ] iOS with home button
- [ ] iOS with gesture (notch)
- [ ] Various screen sizes

---

## 📋 Decision Factors

### Choose Option A if:
- ✅ Project is new (few existing screens)
- ✅ Team has time for full migration
- ✅ Want clean codebase immediately
- ✅ Accept short-term disruption

### Choose Option B if: ⭐
- ✅ Existing project with many screens
- ✅ Want zero disruption to users
- ✅ Prefer gradual migration
- ✅ Want to test thoroughly first

### Choose Option C if:
- ✅ Very conservative team
- ✅ Cannot risk any changes to existing screens
- ✅ OK with multiple wrapper components
- ✅ FormWrapper is sufficient

---

## 🚀 Next Steps

1. **Review this document** with team
2. **Decide on approach** (A, B, or C)
3. **Create implementation ticket**
4. **Start with Phase 1**
5. **Test thoroughly**
6. **Roll out gradually**

---

## 📚 Related Files

- `components/_ShareComponent/NewWrapper.tsx` - Current wrapper
- `components/_ShareComponent/FormWrapper.tsx` - New form wrapper
- `hooks/useKeyboardForm.ts` - Keyboard handling hook
- `screens/Job/ScreenJobCreate2.tsx` - Example implementation

---

## 📞 Discussion Points

1. **Which option do you prefer?** (A, B, or C)
2. **How many screens use NewWrapper?**
3. **Team capacity for migration?**
4. **Timeline for implementation?**
5. **Risk tolerance level?**

---

**Last Updated:** 2026-04-01
**Status:** 📝 Under Discussion
