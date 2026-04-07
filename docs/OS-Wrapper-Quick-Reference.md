# OS_Wrapper Quick Reference

## 📦 Import
```tsx
import { OS_Wrapper, PageWrapper, IOSWrapper, AndroidWrapper } from "@/components";
```

## 🎯 Usage Examples

### 1. OS_Wrapper - List Mode (Most Common)
```tsx
<OS_Wrapper
  listData={data}
  renderItem={({ item }) => <Card item={item} />}
  ListEmptyComponent={<EmptyState />}
  ListFooterComponent={<LoadingFooter />}
  onEndReached={loadMore}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }
/>
```

### 2. OS_Wrapper - Static Mode
```tsx
<OS_Wrapper
  headerComponent={<HeaderSection />}
  footerComponent={<FooterSection />}
  withBackground={true}
>
  <YourContent />
</OS_Wrapper>
```

### 3. PageWrapper - Form dengan Keyboard Handling
```tsx
<PageWrapper
  enableKeyboardHandling
  keyboardScrollOffset={150}
  contentPaddingBottom={100}
  footerComponent={
    <BoxButtonOnFooter>
      <ButtonCustom isLoading={loading} onPress={handleSubmit}>
        Submit
      </ButtonCustom>
    </BoxButtonOnFooter>
  }
>
  <ScrollView>
    <TextInputCustom />
    <TextInputCustom />
  </ScrollView>
</PageWrapper>
```

### 4. Platform-Specific (Rare Cases)
```tsx
// iOS only
<IOSWrapper>
  <Content />
</IOSWrapper>

// Android only
<AndroidWrapper enableKeyboardHandling>
  <Content />
</AndroidWrapper>
```

## 📋 Props Reference

### Common Props (iOS + Android)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `withBackground` | boolean | false | Show background image |
| `headerComponent` | ReactNode | - | Sticky header component |
| `footerComponent` | ReactNode | - | Fixed footer component |
| `floatingButton` | ReactNode | - | Floating button |
| `hideFooter` | boolean | false | Hide footer section |
| `edgesFooter` | Edge[] | [] | Safe area edges |
| `style` | ViewStyle | - | Custom container style |
| `refreshControl` | RefreshControl | - | Pull to refresh control |

### Android-Only Props (Ignored on iOS)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableKeyboardHandling` | boolean | false | Auto-scroll on input focus |
| `keyboardScrollOffset` | number | 100 | Scroll offset when keyboard appears |
| `contentPaddingBottom` | number | 80 | Extra bottom padding |
| `contentPadding` | number | 16 | Content padding (all sides) |

## 🔄 Migration Pattern

```diff
- import NewWrapper from "@/components/_ShareComponent/NewWrapper";
+ import { OS_Wrapper } from "@/components";

- <NewWrapper
+ <OS_Wrapper
    listData={data}
    renderItem={renderItem}
    {...otherProps}
  />
```

```diff
- import { NewWrapper_V2 } from "@/components/_ShareComponent/NewWrapper_V2";
+ import { PageWrapper } from "@/components";

- <NewWrapper_V2 enableKeyboardHandling>
+ <PageWrapper enableKeyboardHandling>
    <FormContent />
  </NewWrapper_V2>
```

## 💡 Tips

1. **Pakai OS_Wrapper** untuk screen biasa (list, detail, dll)
2. **Pakai PageWrapper** untuk screen dengan form input (create, edit)
3. **Jangan mix** wrapper lama dan baru di screen yang sama
4. **Test di kedua platform** sebelum commit
5. **Keyboard handling** hanya bekerja di Android dengan PageWrapper

## ⚠️ Common Mistakes

### ❌ Wrong
```tsx
// Jangan import langsung dari file
import OS_Wrapper from "@/components/_ShareComponent/OS_Wrapper";

// Jangan mix wrapper
<OS_Wrapper>
  <NewWrapper>{content}</NewWrapper>
</OS_Wrapper>
```

### ✅ Correct
```tsx
// Import dari @/components
import { OS_Wrapper } from "@/components";

// Pakai salah satu saja
<OS_Wrapper>{content}</OS_Wrapper>
```

---

Last updated: 2026-04-06
