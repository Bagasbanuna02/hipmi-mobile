# PageWrapper - Platform-Specific Wrapper

## 📋 Overview

`PageWrapper` adalah wrapper component yang secara otomatis memilih wrapper yang tepat berdasarkan platform:

- **iOS**: Menggunakan `NewWrapper` (stable, tested)
- **Android**: Menggunakan `NewWrapper_V2` (dengan keyboard handling fix)

## 🎯 Kapan Menggunakan PageWrapper?

### ✅ **Gunakan PageWrapper untuk:**
- Screen baru yang kamu buat
- Migrasi screen existing dari `NewWrapper`/`ViewWrapper`
- Form screens dengan TextInput/TextArea
- List screens dengan pagination

### ❌ **Jangan gunakan PageWrapper untuk:**
- Screen yang sudah menggunakan `NewWrapper_V2` langsung dan sudah tested di iOS
- Custom wrapper requirements

---

## 📝 Usage

### **Basic Usage (Static Content)**

```typescript
import { PageWrapper } from "@/components";

export function MyScreen() {
  return (
    <PageWrapper
      footerComponent={<ButtonFooter />}
    >
      <StackCustom>
        <TextInputCustom label="Name" />
        <TextAreaCustom label="Description" />
      </StackCustom>
    </PageWrapper>
  );
}
```

### **With Keyboard Handling (Android Only)**

```typescript
<PageWrapper
  enableKeyboardHandling
  keyboardScrollOffset={100}
  contentPaddingHorizontal={16}
  footerComponent={<ButtonFooter />}
>
  <StackCustom>
    <View onStartShouldSetResponder={() => true}>
      <TextInputCustom label="Name" />
    </View>
    <View onStartShouldSetResponder={() => true}>
      <TextAreaCustom label="Description" />
    </View>
  </StackCustom>
</PageWrapper>
```

### **List Mode (Pagination)**

```typescript
<PageWrapper
  listData={pagination.listData}
  renderItem={renderItem}
  onEndReached={pagination.loadMore}
  ListEmptyComponent={ListEmptyComponent}
  ListFooterComponent={ListFooterComponent}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>
```

---

## 🔧 Props

### **Common Props (iOS & Android)**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `footerComponent` | `ReactNode` | - | Fixed footer component |
| `headerComponent` | `ReactNode` | - | Header component (sticky) |
| `floatingButton` | `ReactNode` | - | Floating button overlay |
| `hideFooter` | `boolean` | `false` | Hide footer footer |
| `withBackground` | `boolean` | `false` | Use background image |
| `style` | `ViewStyle` | - | Custom container style |
| `refreshControl` | `RefreshControl` | - | Pull-to-refresh control |

### **Android-Only Props** (Ignored di iOS)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableKeyboardHandling` | `boolean` | `false` | Enable keyboard auto-scroll |
| `keyboardScrollOffset` | `number` | `100` | Scroll offset when keyboard appears |
| `contentPaddingBottom` | `number` | `80` | Bottom padding for content |
| `contentPaddingTop` | `number` | `8` | Top padding for content |
| `contentPaddingHorizontal` | `number` | `0` | Horizontal padding for content |

---

## 📊 Platform Behavior

| Feature | iOS (NewWrapper) | Android (NewWrapper_V2) |
|---------|------------------|------------------------|
| **Keyboard Handling** | ❌ No auto-scroll | ✅ Auto-scroll to input |
| **Footer Position** | ✅ Fixed bottom | ✅ Fixed bottom (absolute) |
| **Safe Area** | ✅ Handled | ✅ Handled |
| **Content Padding** | Default | Customizable |
| **List Mode** | ✅ Supported | ✅ Supported |

---

## 🔄 Migration Guide

### **From NewWrapper**

```typescript
// BEFORE
import { NewWrapper } from "@/components";

<NewWrapper footerComponent={footer}>
  {children}
</NewWrapper>

// AFTER
import { PageWrapper } from "@/components";

<PageWrapper footerComponent={footer}>
  {children}
</PageWrapper>
```

### **From NewWrapper_V2**

```typescript
// BEFORE
import { NewWrapper_V2 } from "@/components";

<NewWrapper_V2
  enableKeyboardHandling
  keyboardScrollOffset={100}
  footerComponent={footer}
>
  <View onStartShouldSetResponder={() => true}>
    <TextInputCustom />
  </View>
</NewWrapper_V2>

// AFTER
import { PageWrapper } from "@/components";

<PageWrapper
  enableKeyboardHandling
  keyboardScrollOffset={100}
  footerComponent={footer}
>
  <View onStartShouldSetResponder={() => true}>
    <TextInputCustom />
  </View>
</PageWrapper>
```

---

## ⚠️ Important Notes

### **For Form Screens (Android)**

Jika menggunakan `enableKeyboardHandling`, **WAJIB wrap semua input** dengan `View onStartShouldSetResponder`:

```typescript
<View onStartShouldSetResponder={() => true}>
  <TextInputCustom label="Name" />
</View>
```

**Kenapa?**
- Mencegah keyboard handling conflict
- Memastikan tap outside dismiss keyboard
- Konsisten behavior di Android

### **For iOS Users**

Props berikut **diabaikan di iOS**:
- `enableKeyboardHandling`
- `keyboardScrollOffset`
- `contentPaddingBottom`
- `contentPaddingTop`
- `contentPaddingHorizontal`

iOS menggunakan `NewWrapper` yang sudah stable tanpa keyboard handling.

---

## 🎨 Examples

### **Example 1: Simple Form**

```typescript
import { PageWrapper, TextInputCustom, StackCustom } from "@/components";

export function SimpleForm() {
  return (
    <PageWrapper
      enableKeyboardHandling
      keyboardScrollOffset={100}
      footerComponent={<SubmitButton />}
    >
      <StackCustom>
        <View onStartShouldSetResponder={() => true}>
          <TextInputCustom label="Name" />
        </View>
        <View onStartShouldSetResponder={() => true}>
          <TextInputCustom label="Email" />
        </View>
      </StackCustom>
    </PageWrapper>
  );
}
```

### **Example 2: List with Pagination**

```typescript
import { PageWrapper } from "@/components";

export function UserList() {
  const pagination = usePagination({ fetchFunction: fetchUsers });

  return (
    <PageWrapper
      listData={pagination.listData}
      renderItem={({ item }) => <UserCard item={item} />}
      onEndReached={pagination.loadMore}
      ListEmptyComponent={<EmptyState />}
      ListFooterComponent={<LoadingFooter />}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.refresh}
        />
      }
    />
  );
}
```

### **Example 3: Detail Screen (No Footer)**

```typescript
import { PageWrapper } from "@/components";

export function DetailScreen() {
  return (
    <PageWrapper hideFooter>
      <StackCustom>
        <TextCustom>Title</TextCustom>
        <TextCustom>Description</TextCustom>
      </StackCustom>
    </PageWrapper>
  );
}
```

---

## 🚀 Future Plans

### **Phase 1: Current** (Now)
- ✅ `PageWrapper` created
- ✅ iOS → `NewWrapper` (stable)
- ✅ Android → `NewWrapper_V2` (keyboard fix)

### **Phase 2: iOS Migration** (1-2 months)
- [ ] Fix iOS bugs di `NewWrapper_V2`
- [ ] Test `NewWrapper_V2` di iOS devices
- [ ] Update `PageWrapper` untuk use V2 untuk iOS juga

### **Phase 3: Unify** (3 months)
- [ ] Deprecate `NewWrapper` lama
- [ ] Rename `NewWrapper_V2` → `NewWrapper`
- [ ] Update `PageWrapper` untuk always use V2

---

## 📚 Related Files

- `components/_ShareComponent/PageWrapper.tsx` - Main component
- `components/_ShareComponent/NewWrapper.tsx` - iOS wrapper
- `components/_ShareComponent/NewWrapper_V2.tsx` - Android wrapper
- `hooks/useKeyboardForm.ts` - Keyboard handling hook

---

**Last Updated**: 2026-04-06  
**Created by**: AI Assistant  
**Status**: ✅ Ready to use
