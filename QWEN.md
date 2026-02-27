# HIPMI Mobile Application - Development Context

## Project Overview

HIPMI Mobile is a cross-platform mobile application built with Expo and React Native. The application is named **"HIPMI Badung Connect"** and serves as a platform for the HIPMI (Himpunan Pengusaha dan Pengusaha Indonesia) Badung chapter. It's designed to run on iOS, Android, and web platforms using a single codebase.

### Key Technologies
- **Framework**: Expo (v54.0.0) with React Native (v0.81.5)
- **Language**: TypeScript
- **Architecture**: File-based routing with Expo Router
- **State Management**: Context API (AuthContext)
- **UI Components**: React Native Paper, custom components
- **Maps Integration**: Maplibre Maps for React Native (`@maplibre/maplibre-react-native` v10.4.2)
- **Push Notifications**: React Native Firebase Messaging
- **Build System**: Metro bundler
- **Package Manager**: Bun

### Project Structure
```
hipmi-mobile/
├── app/                    # Main application screens and routing (Expo Router)
│   ├── _layout.tsx         # Root layout component
│   ├── index.tsx           # Entry point (Login screen)
│   └── (application)/      # Main app screens
│       ├── admin/          # Admin panel screens
│       ├── (user)/         # User screens
│       └── ...
├── components/             # Reusable UI components
│   ├── _ShareComponent/    # Shared components (NewWrapper, Admin components)
│   ├── _Icon/              # Icon components
│   └── ...
├── context/                # State management (AuthContext)
├── screens/                # Screen components organized by feature
│   ├── Admin/              # Admin panel screens
│   │   ├── Donation/       # Donation management screens
│   │   ├── Voting/         # Voting management screens
│   │   ├── Event/          # Event management screens
│   │   └── ...
│   ├── Authentication/     # Login, registration flows
│   ├── RootLayout/         # Root layout components
│   └── ...
├── service/                # API services and business logic
│   ├── api-admin/          # Admin API endpoints
│   ├── api-client/         # Client API endpoints
│   └── api-config.ts       # Axios configuration
├── hooks/                  # Custom React hooks
│   ├── use-pagination.tsx  # Pagination hook
│   └── ...
├── helpers/                # Helper functions
│   ├── paginationHelpers.tsx  # Pagination UI helpers
│   └── ...
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── constants/              # Constants and configuration values
├── styles/                 # Global styles
├── assets/                 # Images, icons, and static assets
└── docs/                   # Documentation files
```

## Building and Running

### Prerequisites
- **Node.js**: v18+ with Bun package manager
- **Expo CLI**: Installed globally or via npx
- **iOS**: Xcode (macOS only) for iOS simulator/builds
- **Android**: Android Studio for Android emulator/builds

### Setup and Development

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Run Development Server**
   ```bash
   bun run start
   # or
   bunx expo start
   ```

3. **Platform-Specific Commands**
   ```bash
   # iOS Simulator
   bun run ios
   # or
   bunx expo start --ios

   # Android Emulator
   bun run android
   # or
   bunx expo start --android

   # Web Browser
   bun run web
   # or
   bunx expo start --web
   ```

4. **Linting**
   ```bash
   bun run lint
   ```

### Build Commands

#### EAS Build (Production)
```bash
# Production build (App Store / Play Store)
eas build --profile production

# Preview build (Internal distribution)
eas build --profile preview

# Development build (Development client)
eas build --profile development
```

#### Local Native Builds
```bash
# Generate native folders (iOS & Android)
npx expo prebuild

# iOS specific
bunx expo prebuild --platform ios
open ios/HIPMIBadungConnect.xcworkspace

# Android specific
bunx expo prebuild --platform android
```

#### Version Management
```bash
# Patch version update
npm version patch

# Update iOS build number
bunx expo prebuild --platform ios

# Update Android version code
bunx expo prebuild --platform android
```

### Android Debugging
```bash
# List connected devices
adb devices

# Install APK to device/emulator
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Install to specific device
adb -s <device_id> install android/app/build/outputs/apk/debug/app-debug.apk
```

## Environment Variables

Create a `.env` file in the project root with:

```env
API_BASE_URL=https://your-api-base-url.com
BASE_URL=https://your-app-url.com
DEEP_LINK_URL=hipmimobile://
```

These are loaded in `app.config.js` and accessible via `Constants.expoConfig.extra`.

## Architecture Patterns

### 1. Separation of Concerns

**Route Files** (`app/`) should be minimal (max 5 lines):
```typescript
import { Admin_ScreenXXX } from "@/screens/Admin/XXX/ScreenXXX";

export default function AdminXXX() {
  return <Admin_ScreenXXX />;
}
```

**Screen Components** (`screens/`) contain all business logic:
```typescript
export function Admin_ScreenXXX() {
  // Logic, hooks, state management
  return <NewWrapper ... />;
}
```

### 2. Pagination Pattern

Using `usePagination` hook with infinite scroll:

```typescript
const pagination = usePagination({
  fetchFunction: async (page, searchQuery) => {
    const response = await apiXXX({ page: String(page) });
    if (response.success) {
      return { data: response.data };
    }
    return { data: [] };
  },
  pageSize: PAGINATION_DEFAULT_TAKE, // 10
  searchQuery: search,
  dependencies: [dependency],
});

const { ListEmptyComponent, ListFooterComponent } =
  createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    emptyMessage: "Belum ada data",
    skeletonCount: PAGINATION_DEFAULT_TAKE,
  });
```

### 3. Wrapper Components

**NewWrapper** (preferred for lists):
```typescript
<NewWrapper
  listData={pagination.listData}
  renderItem={renderItem}
  headerComponent={headerComponent}
  ListEmptyComponent={ListEmptyComponent}
  ListFooterComponent={ListFooterComponent}
  onEndReached={pagination.loadMore}
  refreshControl={<RefreshControl ... />}
/>
```

**AdminBasicBox** (for card layouts):
```typescript
<AdminBasicBox
  onPress={() => router.push(`/path/${item.id}`)}
  style={{ marginHorizontal: 10, marginVertical: 5 }}
>
  <StackCustom gap={0}>
    <GridSpan_4_8 label="Label" value={<TextCustom>Value</TextCustom>} />
  </StackCustom>
</AdminBasicBox>
```

### 4. API Service Structure

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

**Important**: All list APIs should support pagination with `page` parameter (default: "1").

### 5. Authentication Flow

Managed by `AuthContext`:
- `loginWithNomor()` - Send phone number, receive OTP
- `validateOtp()` - Validate OTP, get token
- `registerUser()` - Register new user
- `logout()` - Clear session and logout
- `userData()` - Fetch user data by token

## Development Conventions

### Coding Standards
- **TypeScript**: Strict mode enabled
- **Naming**: 
  - Components: PascalCase (`Admin_ScreenDonationStatus`)
  - Files: PascalCase for components (`ScreenDonationStatus.tsx`)
  - Variables: camelCase
  - Constants: UPPER_SNAKE_CASE
- **Path Aliases**: `@/*` maps to project root
- **Imports**: Group imports by type (components, hooks, services, etc.)

### Component Structure
```typescript
// 1. Imports (grouped)
import { ... } from "@/components";
import { ... } from "@/hooks";
import { ... } from "@/service";

// 2. Types/Interfaces
interface Props { ... }

// 3. Main Component
export function ComponentName() {
  // State
  // Hooks
  // Functions
  // Render
}
```

### Testing
- Linting: `bun run lint`
- No formal test suite configured yet

### Git Workflow
- Feature branches: `feature/xxx` or `fixed-admin/xxx`
- Commit messages: Clear and descriptive
- Use CHANGE_LOG.md for tracking changes

## Key Features

### Authentication
- Phone number login with OTP
- User registration
- Terms & Conditions acceptance
- Session persistence with AsyncStorage

### Admin Module
- **Dashboard**: Overview and statistics
- **User Access**: User management
- **Event**: Event CRUD with status management
- **Voting**: Voting management (publish/review/reject)
- **Donation**: Donation management with categories and transaction tracking
- **Collaboration**: Collaboration requests
- **Investment**: Investment management
- **Maps**: Location-based features
- **App Information**: Bank and business field management

### User Module
- **Home**: Main dashboard
- **Forum**: Discussion forums
- **Profile**: User profile management
- **Portfolio**: Member portfolio
- **Notifications**: Push notifications via Firebase

## API Configuration

### Base URLs
```typescript
// From app.config.js extra
API_BASE_URL: process.env.API_BASE_URL
BASE_URL: process.env.BASE_URL
DEEP_LINK_URL: process.env.DEEP_LINK_URL
```

### Axios Interceptor
All API calls use `apiConfig` with automatic token injection:
```typescript
apiConfig.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Platform Configuration

### iOS
- **Bundle ID**: `com.anonymous.hipmi-mobile`
- **Build Number**: 21
- **Google Services**: Configured
- **Associated Domains**: `applinks:cld-dkr-staging-hipmi.wibudev.com`
- **Tablet Support**: Enabled

### Android
- **Package**: `com.bip.hipmimobileapp`
- **Version Code**: 4
- **Google Services**: Configured (`google-services.json`)
- **Deep Links**: HTTPS intent filters configured
- **Edge-to-Edge**: Enabled

### Web
- **Output**: Static
- **Bundler**: Metro

## Special Integrations

### Firebase
- Authentication
- Push Notifications (FCM)
- Configured for both iOS and Android

### Maplibre
- Map integration via `@maplibre/maplibre-react-native`
- Location permissions configured

### Deep Linking
- Scheme: `hipmimobile://`
- HTTPS: `cld-dkr-staging-hipmi.wibudev.com`
- Configured for both platforms

### Camera
- Camera and microphone permissions
- QR code generation support

## Common Development Tasks

### Adding a New Admin Screen

1. **Create Screen Component** (`screens/Admin/Feature/ScreenXXX.tsx`):
```typescript
export function Admin_ScreenXXX() {
  const pagination = usePagination({...});
  const renderItem = useCallback(...);
  const headerComponent = useMemo(...);
  
  return <NewWrapper ... />;
}
```

2. **Create Box Component** (optional, for custom item rendering):
```typescript
export default function Admin_BoxXXX({ item }: { item: any }) {
  return (
    <AdminBasicBox onPress={() => router.push(...)}>
      ...
    </AdminBasicBox>
  );
}
```

3. **Update API** (add pagination if needed):
```typescript
export async function apiXXX({ page = "1" }: { page?: string }) {
  // ...
}
```

4. **Create Route File** (`app/(application)/admin/feature/xxx.tsx`):
```typescript
import { Admin_ScreenXXX } from "@/screens/Admin/Feature/ScreenXXX";

export default function AdminXXX() {
  return <Admin_ScreenXXX />;
}
```

### Updating API Endpoints

1. Add function in appropriate service file
2. Include `page` parameter for list endpoints
3. Use `apiConfig` axios instance
4. Handle errors properly

## Troubleshooting

### Build Issues
```bash
# Clean and rebuild
rm -rf node_modules
bun install
bunx expo prebuild --clean

# iOS specific
cd ios && pod install && cd ..

# Android specific
cd android && ./gradlew clean && cd ..
```

### Cache Issues
```bash
# Clear Expo cache
bunx expo start -c

# Clear Metro cache
bunx expo start --clear
```

### Dependency Issues
```bash
# Reinstall dependencies
rm -rf node_modules bun.lock
bun install
```

### iOS Maplibre Crash Fix

When using Maplibre MapView on iOS, prevent "Attempt to recycle a mounted view" crash:

1. **Always render PointAnnotation** (not conditional)
2. **Use opacity for visibility** instead of conditional rendering
3. **Avoid key prop changes** that force remounting

```typescript
// ✅ GOOD: Stable PointAnnotation
<PointAnnotation
  coordinate={annotationCoordinate}  // Always rendered
  ...
>
  <View style={{ opacity: selectedLocation ? 1 : 0 }}>
    <SelectedLocationMarker />
  </View>
</PointAnnotation>

// ❌ BAD: Conditional rendering causes crash
{selectedLocation && (
  <PointAnnotation coordinate={selectedLocation} ... />
)}
```

## Documentation Files

- `docs/CHANGE_LOG.md` - Change log for recent updates
- `docs/hipmi-note.md` - Build and deployment notes
- `docs/prompt-for-qwen-code.md` - Development prompts and patterns

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Maplibre React Native](https://github.com/maplibre/maplibre-react-native)
