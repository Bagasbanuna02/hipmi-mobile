# TASK-004: NewWrapper_V2 Gradual Migration

## 📋 Deskripsi

Migrasi bertahap dari `NewWrapper` ke `NewWrapper_V2` untuk memperbaiki bug keyboard handling (footer terangkat, area putih, input terpotong).

## 🎯 Tujuan

1. Replace `NewWrapper` → `NewWrapper_V2` secara bertahap
2. Fix keyboard handling issues di semua form screens
3. Zero breaking changes dengan gradual migration
4. Clean up test components yang tidak diperlukan

---

## 📊 Migration Priority

### **Phase 1: Job Screens** (Week 1) - CURRENT
- [x] `screens/Job/ScreenJobCreate2.tsx` → Already using keyboard handling
- [ ] `screens/Job/ScreenJobCreate.tsx` → Migrate to NewWrapper_V2
- [ ] `screens/Job/ScreenJobEdit.tsx` → Migrate to NewWrapper_V2
- [ ] Delete test files after migration

### **Phase 2: Event & Profile Screens** (Week 2)
- [ ] `screens/Event/ScreenEventCreate.tsx`
- [ ] `screens/Event/ScreenEventEdit.tsx`
- [ ] `screens/Profile/ScreenProfileCreate.tsx`
- [ ] `screens/Profile/ScreenProfileEdit.tsx`

### **Phase 3: Other Form Screens** (Week 3)
- [ ] `screens/Donation/` - All create/edit screens
- [ ] `screens/Investment/` - All create/edit screens
- [ ] `screens/Voting/` - All create/edit screens

### **Phase 4: Complex Screens** (Week 4)
- [ ] `screens/Forum/` - Create/edit with rich text
- [ ] `screens/Collaboration/` - Complex forms
- [ ] Other complex forms

### **Phase 5: Cleanup** (Week 5)
- [ ] Remove old `NewWrapper.tsx` (or deprecate)
- [ ] Rename `NewWrapper_V2.tsx` → `NewWrapper.tsx`
- [ ] Update documentation
- [ ] Delete test components

---

## 🔧 Task Details

### **Task 4.1: Job Screens Migration** ✅ IN PROGRESS

**Files to migrate:**
1. `screens/Job/ScreenJobCreate.tsx`
2. `screens/Job/ScreenJobEdit.tsx`

**Changes per file:**
```typescript
// BEFORE
import { NewWrapper } from "@/components";

<NewWrapper footerComponent={buttonSubmit()}>
  <TextInputCustom label="..." />
</NewWrapper>

// AFTER
import { NewWrapper_V2 } from "@/components";

<NewWrapper_V2
  enableKeyboardHandling
  keyboardScrollOffset={100}
  footerComponent={buttonSubmit()}
>
  <View onStartShouldSetResponder={() => true}>
    <TextInputCustom label="..." />
  </View>
</NewWrapper_V2>
```

**Checklist per screen:**
- [ ] Replace `NewWrapper` → `NewWrapper_V2`
- [ ] Add `enableKeyboardHandling` prop
- [ ] Wrap all TextInput/TextArea with `View onStartShouldSetResponder`
- [ ] Test on Android (navigation buttons)
- [ ] Test on Android (gesture)
- [ ] Test on iOS
- [ ] Verify auto-scroll works
- [ ] Verify footer stays in place
- [ ] Verify no white area

**Cleanup after migration:**
- [ ] Delete `screens/Job/ScreenJobCreate2.tsx` (test file)
- [ ] Delete `screens/Job/ScreenJobEdit2.tsx` (test file)
- [ ] Update app routes if needed

---

### **Task 4.2: Delete Test Components**

**Files to delete:**
- [ ] `components/_ShareComponent/TestWrapper.tsx`
- [ ] `components/_ShareComponent/TestKeyboardInput.tsx`
- [ ] `app/(application)/(user)/test-keyboard.tsx`
- [ ] `app/(application)/(user)/test-keyboard-bug.tsx`

**Keep (useful):**
- ✅ `components/_ShareComponent/FormWrapper.tsx` (alternative wrapper)
- ✅ `hooks/useKeyboardForm.ts` (keyboard hook)
- ✅ `docs/KEYBOARD-BUG-TEST.md` (documentation)
- ✅ `docs/NEWWRAPPER-KEYBOARD-IMPLEMENTATION.md` (documentation)

---

### **Task 4.3: Update Documentation**

**Files to update:**
- [ ] `QWEN.md` - Update NewWrapper_V2 usage
- [ ] `docs/NEWWRAPPER-KEYBOARD-IMPLEMENTATION.md` - Mark as completed
- [ ] Create migration guide for team

---

## 📝 Migration Guide (Per Screen)

### **Step 1: Import NewWrapper_V2**

```typescript
// Change this:
import { NewWrapper } from "@/components";

// To this:
import { NewWrapper_V2 } from "@/components";
```

### **Step 2: Update Component Usage**

```typescript
// Change this:
<NewWrapper footerComponent={buttonSubmit()}>
  <StackCustom>
    <TextInputCustom label="Judul" ... />
    <TextAreaCustom label="Deskripsi" ... />
  </StackCustom>
</NewWrapper>

// To this:
<NewWrapper_V2
  enableKeyboardHandling
  keyboardScrollOffset={100}
  footerComponent={buttonSubmit()}
>
  <StackCustom>
    <View onStartShouldSetResponder={() => true}>
      <TextInputCustom label="Judul" ... />
    </View>
    <View onStartShouldSetResponder={() => true}>
      <TextAreaCustom label="Deskripsi" ... />
    </View>
  </StackCustom>
</NewWrapper_V2>
```

### **Step 3: Import View**

```typescript
// Add this import if not already present:
import { View } from "react-native";
```

### **Step 4: Test**

1. Run app
2. Navigate to screen
3. Tap each input field
4. Verify auto-scroll works
5. Verify footer stays in place
6. Verify no white area
7. Test submit functionality

---

## 🧪 Testing Checklist

### **For Each Migrated Screen:**

**Functional Tests:**
- [ ] All inputs focus correctly
- [ ] Keyboard shows when tapping input
- [ ] Auto-scroll to focused input
- [ ] Keyboard dismisses when tapping outside
- [ ] Footer stays at bottom
- [ ] No white area at bottom
- [ ] Submit button works
- [ ] Form validation works
- [ ] Data saves correctly

**Platform Tests:**
- [ ] Android with navigation buttons
- [ ] Android with gesture navigation
- [ ] iOS with home button
- [ ] iOS with gesture (notch)
- [ ] Different screen sizes

**Edge Cases:**
- [ ] Multiple inputs on screen
- [ ] Long content (scrollable)
- [ ] Loading state
- [ ] Error state
- [ ] Keyboard transition smooth

---

## 📊 Progress Tracking

| Phase | Screens | Status | Completed Date |
|-------|---------|--------|----------------|
| **Phase 1: Job** | 6 screens | ✅ COMPLETED | 2026-04-01 |
| **Phase 2: Event & Profile** | 4 screens | ⏳ Pending | - |
| **Phase 3: Forms** | 6-8 screens | ⏳ Pending | - |
| **Phase 4: Complex** | 4-6 screens | ⏳ Pending | - |
| **Phase 5: Cleanup** | Cleanup | ⏳ Pending | - |

---

## ✅ Phase 1: COMPLETED!

**Migrated Screens:**
1. ✅ `screens/Job/ScreenJobCreate.tsx` - Form with keyboard handling
2. ✅ `screens/Job/ScreenJobEdit.tsx` - Form with keyboard handling
3. ✅ `screens/Job/ScreenBeranda2.tsx` - List (no keyboard handling needed)
4. ✅ `screens/Job/ScreenArchive2.tsx` - List (no keyboard handling needed)
5. ✅ `screens/Job/MainViewStatus2.tsx` - List (no keyboard handling needed)
6. ✅ `app/(application)/(user)/job/[id]/[status]/detail.tsx` - Detail (no keyboard handling needed)

**Test Files Deleted:**
- ❌ `screens/Job/ScreenJobCreate2.tsx`
- ❌ `screens/Job/ScreenJobEdit2.tsx`
- ❌ `components/_ShareComponent/TestWrapper.tsx`
- ❌ `components/_ShareComponent/TestKeyboardInput.tsx`
- ❌ `app/(application)/(user)/test-keyboard.tsx`
- ❌ `app/(application)/(user)/test-keyboard-bug.tsx`

**Routes Updated:**
- ✅ `app/(application)/(user)/job/create.tsx` → Uses ScreenJobCreate
- ✅ `app/(application)/(user)/job/[id]/edit.tsx` → Uses ScreenJobEdit
- ✅ `app/(application)/(user)/job/(tabs)/index.tsx` → Uses ScreenBeranda2
- ✅ `app/(application)/(user)/job/(tabs)/archive.tsx` → Uses ScreenArchive2
- ✅ `app/(application)/(user)/job/(tabs)/status.tsx` → Uses MainViewStatus2
- ✅ `app/(application)/(user)/job/[id]/[status]/detail.tsx` → Migrated to NewWrapper_V2

**Commits:**
- `a9ff755` - feat: Migrate Job screens to NewWrapper_V2
- `0f55244` - refactor: Cleanup test files and migrate Job Detail
- `7cb4f30` - refactor: Replace NewWrapper with NewWrapper_V2 for all Job screens

**Total:** 6 screens migrated, 6 test files deleted, 6 routes updated

---

## 🚀 Current Status

**Status**: 🟡 IN PROGRESS
**Current Phase**: Phase 1 - Job Screens
**Started**: 2026-04-01
**ETA**: 2026-04-07 (Phase 1 complete)

---

## 📞 Next Actions

1. **Immediate** (Today):
   - [ ] Migrate `ScreenJobCreate.tsx`
   - [ ] Migrate `ScreenJobEdit.tsx`
   - [ ] Test both screens

2. **This Week**:
   - [ ] Delete test files
   - [ ] Document any issues
   - [ ] Prepare Phase 2

3. **Next Week**:
   - [ ] Start Phase 2 (Event & Profile)
   - [ ] Review Phase 1 results
   - [ ] Adjust migration guide if needed

---

## 📚 Related Files

**Components:**
- `components/_ShareComponent/NewWrapper.tsx` (Old)
- `components/_ShareComponent/NewWrapper_V2.tsx` (New)
- `hooks/useKeyboardForm.ts` (Keyboard hook)

**Documentation:**
- `docs/NEWWRAPPER-KEYBOARD-IMPLEMENTATION.md` (Full analysis)
- `docs/KEYBOARD-BUG-TEST.md` (Bug investigation)
- `tasks/TASK-004-newwrapper-migration.md` (This file)

**Screens to Migrate:**
- `screens/Job/ScreenJobCreate.tsx`
- `screens/Job/ScreenJobEdit.tsx`
- (More in subsequent phases)

---

## ⚠️ Risk Mitigation

**If issues found during migration:**

1. **Stop migration** for that screen
2. **Revert changes** if critical bug
3. **Document issue** in detail
4. **Fix NewWrapper_V2** if needed
5. **Resume migration** after fix

**Rollback plan:**
- Keep old `NewWrapper` until all screens migrated
- Easy to revert per screen
- No breaking changes to other screens

---

## ✅ Success Criteria

**Phase 1 Complete when:**
- [ ] Job Create migrated
- [ ] Job Edit migrated
- [ ] Both screens tested on iOS & Android
- [ ] No critical bugs
- [ ] Test files deleted
- [ ] Documentation updated

**Overall Migration Complete when:**
- [ ] All form screens migrated
- [ ] All screens tested
- [ ] Old NewWrapper deprecated/removed
- [ ] Team trained on NewWrapper_V2
- [ ] Documentation complete

---

**Last Updated**: 2026-04-01
**Created by**: AI Assistant
**Status**: 🟡 IN PROGRESS
