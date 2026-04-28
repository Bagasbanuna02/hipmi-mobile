# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project

**HIPMI Badung Connect** — Cross-platform mobile app (iOS, Android, Web) for HIPMI (Himpunan Pengusaha Muda Indonesia) chapter Badung members.

- Framework: Expo v54 + React Native v0.81.5, TypeScript strict
- Routing: Expo Router v6 (file-based)
- Package manager: Bun

---

## Commands

```bash
bun install                  # install dependencies
bunx expo start              # dev server
bunx expo start --ios        # iOS simulator
bunx expo start --android    # Android emulator
bunx expo start -c           # clear cache
bun run lint                 # expo lint

# Build (EAS)
eas build --profile production
eas build --profile preview
eas build --profile development

# Troubleshooting
rm -rf node_modules && bun install
bunx expo start --clear
```

---

## Architecture

### Route → Screen separation (strict)

`app/` contains **route files only** (max 5 lines). All business logic lives in `screens/`.

```typescript
// app/(application)/admin/feature/screen-name.tsx
import { Admin_ScreenXXX } from "@/screens/Admin/Feature/ScreenXXX";
export default function AdminScreenXXX() { return <Admin_ScreenXXX />; }
```

```typescript
// screens/Admin/Feature/ScreenXXX.tsx — ALL logic here
export function Admin_ScreenXXX() {
  // hooks, state, handlers, render
  return <OS_Wrapper ... />;
}
```

### Naming conventions

| Item | Convention | Example |
|---|---|---|
| Admin screen | `Admin_ScreenXXX` | `Admin_ScreenDonationList` |
| User screen | PascalCase | `ScreenDonationDetail` |
| Admin card | `Admin_BoxXXX` | `Admin_BoxDonation` |
| Path alias | `@/*` | `@/components/...` |

---

## Key Components

### OS_Wrapper — always use as root wrapper

Automatically selects iOS/Android layout. Two modes:

```typescript
// List screen
<OS_Wrapper
  listData={pagination.listData}
  renderItem={renderItem}
  headerComponent={headerComponent}
  ListEmptyComponent={ListEmptyComponent}
  ListFooterComponent={ListFooterComponent}
  onEndReached={pagination.loadMore}
  refreshControl={<RefreshControl refreshing={pagination.refreshing} onRefresh={pagination.onRefresh} />}
/>

// Form screen (with TextInput / TextArea)
<OS_Wrapper enableKeyboardHandling contentPaddingBottom={250}>
  <FormContent />
</OS_Wrapper>
```

- `contentPaddingBottom={100}` — default for list screens
- `contentPaddingBottom={250}` — **only** for screens with TextInput/TextArea
- `enableKeyboardHandling` — Android keyboard auto-scroll (ignored on iOS)

### AdminBasicBox + GridSpan_4_8

```typescript
<AdminBasicBox onPress={() => router.push(`/path/${item.id}`)} style={{ marginHorizontal: 10, marginVertical: 5 }}>
  <StackCustom gap={0}>
    <GridSpan_4_8 label="Nama" value={<TextCustom>{item.name}</TextCustom>} />
  </StackCustom>
</AdminBasicBox>
```

---

## Pagination Pattern

```typescript
import { usePagination } from "@/hooks/use-pagination";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";

const pagination = usePagination({
  fetchFunction: async (page, searchQuery) => {
    const response = await apiXXX({ page: String(page) });
    if (response.success) return { data: response.data };
    return { data: [] };
  },
  pageSize: PAGINATION_DEFAULT_TAKE, // 10
  searchQuery: search,
  dependencies: [dependency],
});

const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
  loading: pagination.loading,
  refreshing: pagination.refreshing,
  listData: pagination.listData,
  emptyMessage: "Belum ada data",
  skeletonCount: PAGINATION_DEFAULT_TAKE,
});
```

`usePagination` returns: `listData`, `loading`, `refreshing`, `hasMore`, `page`, `onRefresh`, `loadMore`, `reset`, `setListData`, `isInitialLoad`

---

## API Service Pattern

Always use `apiConfig` (not `axios` directly) — auth token injected automatically via request interceptor from `AsyncStorage.getItem("authToken")`.

```typescript
// service/api-admin/api-xxx.ts
export async function apiXXX({ page = "1" }: { page?: string }) {
  try {
    const response = await apiConfig.get(`/mobile/admin/xxx?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
```

- All list endpoints require `page` param (default `"1"` as string)
- Response shape: `{ success: boolean, data: T[], message?: string }`
- Admin APIs: `service/api-admin/`
- Client APIs: `service/api-client/`

---

## Authentication

```typescript
// context/AuthContext.tsx — access via useAuth()
const { user, token, isAdmin, isUserActive, loginWithNomor, validateOtp, logout } = useAuth();

// Role check
const isAdmin = user?.masterUserRoleId !== "1";  // "1" = regular user

// Post-login routing
// active user   → /(application)/(user)/home
// inactive user → /(application)/(user)/waiting-room
```

AsyncStorage keys: `"authToken"`, `"userData"`

---

## File Upload

```typescript
import { uploadFileService, deleteFileService } from "@/service/upload-service";
import { API_IMAGE } from "@/constants/api-storage";

const result = await uploadFileService({ dirId: "folder-name", imageUri: localUri });
// result.data.id → save this ID to backend

await deleteFileService({ id: fileId });

const imageUrl = API_IMAGE.GET({ fileId: "xxx", size: 200 }); // wibu-storage CDN
```

---

## Constants (`constants/constans-value.ts`)

```typescript
PADDING_INLINE = 16        // use selectively, not on every screen by default
PADDING_EXTRA_SMALL = 10
PADDING_SMALL = 12
PADDING_MEDIUM = 16
PADDING_LARGE = 20

OS_ANDROID_HEIGHT = 60 / OS_IOS_HEIGHT = 80
OS_ANDROID_PADDING_TOP = 6 / OS_IOS_PADDING_TOP = 12

TEXT_SIZE_SMALL = 12 / MEDIUM = 14 / LARGE = 16 / XLARGE = 18
PAGINATION_DEFAULT_TAKE = 10
DRAWER_HEIGHT = 500
RADIUS_BUTTON = 50
```

```typescript
// constants/color-palet.ts
MainColor.darkblue = "#001D3D"   // user app primary
AdminColor.bgAdmin = "#182c47"   // admin panel background
```

---

## Known Issues

### iOS Maplibre crash — "Attempt to recycle a mounted view"

Never conditionally render `PointAnnotation`. Control visibility via opacity instead:

```typescript
// ✅ correct
<PointAnnotation coordinate={coordinate}>
  <View style={{ opacity: selectedLocation ? 1 : 0 }}>
    <SelectedLocationMarker />
  </View>
</PointAnnotation>

// ❌ crashes iOS
{selectedLocation && <PointAnnotation ... />}
```

---

## Known Typos — Do NOT fix unless asked

| Path | Typo |
|---|---|
| `constants/constans-value.ts` | `constans` |
| `constants/base-url-api-strorage.ts` | `strorage` |
| `screens/Invesment/` | `Invesment` |
| `screens/Portofolio/` | `Portofolio` |
| `screens/UserSeach/` | `UserSeach` |

---

## Environment Variables (`.env`)

```env
API_BASE_URL=https://your-api-url.com
BASE_URL=https://your-app-url.com
DEEP_LINK_URL=hipmimobile://
```

Accessed via: `Constants.expoConfig?.extra?.API_BASE_URL`

---

## New Screen Checklist

1. `service/api-admin/api-xxx.ts` — API function with `page` param
2. `screens/Admin/Feature/ScreenXXX.tsx` — screen with `usePagination` + `OS_Wrapper`
3. `screens/Admin/Feature/BoxXXX.tsx` — card component (optional)
4. `app/(application)/admin/feature/index.tsx` — thin route file
