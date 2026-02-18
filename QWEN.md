# HIPMI Mobile Application - Development Context

## Project Overview

HIPMI Mobile is a cross-platform mobile application built with Expo and React Native. The application is named "HIPMI Badung Connect" and serves as a platform for the HIPMI (Himpunan Pengusaha dan Pengusaha Indonesia) Badung chapter. It's designed to run on iOS, Android, and web platforms using a single codebase.

### Key Technologies
- **Framework**: Expo (v54.0.0) with React Native (v0.81.4)
- **Language**: TypeScript
- **Architecture**: File-based routing with Expo Router
- **State Management**: Context API
- **UI Components**: React Native Paper, custom components
- **Maps Integration**: Mapbox Maps for React Native
- **Push Notifications**: React Native Firebase Messaging
- **Build System**: Metro bundler

### Project Structure
```
hipmi-mobile/
├── app/                    # Main application screens and routing
│   ├── _layout.tsx         # Root layout component
│   ├── index.tsx           # Entry point (Login screen)
│   └── ...
├── components/             # Reusable UI components
├── context/                # State management (AuthContext)
├── screens/                # Screen components organized by feature
│   ├── Admin/              # Admin panel screens
│   ├── Authentication/     # Login, registration flows
│   ├── Collaboration/      # Collaboration features
│   ├── Event/              # Event management
│   ├── Forum/              # Forum functionality
│   ├── Home/               # Home screen
│   ├── Maps/               # Map integration
│   ├── Profile/            # User profile
│   └── ...
├── assets/                 # Images, icons, and static assets
├── constants/              # Constants and configuration values
├── helpers/                # Helper functions (pagination, etc.)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── navigation/             # Navigation configuration
├── service/                # API services and business logic
├── types/                  # TypeScript type definitions
└── utils/                  # Helper functions
```

## Building and Running

### Prerequisites
- Node.js (with bun as the package manager)
- Expo CLI
- iOS Simulator or Android Emulator (for native builds)
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

### Setup and Development

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Run Development Server**
   ```bash
   bun run start
   ```
   Or use the shorthand:
   ```bash
   bunx expo start
   ```

3. **Platform-Specific Commands**
   - iOS: `bun run ios` or `bunx expo start --ios`
   - Android: `bun run android` or `bunx expo start --android`
   - Web: `bun run web` or `bunx expo start --web`

4. **Linting**
   ```bash
   bun run lint
   ```

### Build Commands

#### EAS Build (Production)
```bash
# Production build
eas build --profile production

# Preview build
eas build --profile preview

# Development build
eas build --profile development
```

#### Local Native Builds
```bash
# Generate native folders (iOS & Android)
npx expo prebuild

# iOS specific
bunx expo prebuild --platform ios
open ios/HIPMIBADUNG.xcworkspace

# Android specific
bunx expo prebuild --platform android
```

#### Version Management
```bash
# Patch version update
npm version patch
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

The application uses environment variables defined in the `app.config.js` file:
- `API_BASE_URL`: Base URL for API endpoints
- `BASE_URL`: Base application URL
- `DEEP_LINK_URL`: URL for deep linking functionality

Create a `.env` file in the project root with these variables.

## EAS Build Configuration

The project uses Expo Application Services (EAS) for building and deploying:
- **Development**: Development builds with development client
- **Preview**: Internal distribution builds (APK for Android)
- **Production**: App store builds (App Bundle for Android, IPA for iOS)

Configuration is in `eas.json`.

## Features and Functionality

The application includes several key modules:
- **Authentication**: Login with phone number, OTP verification, registration, terms acceptance
- **Admin Panel**: Administrative functions for managing content and users
- **Collaboration**: Tools for member collaboration
- **Events**: Event management and calendar
- **Forum**: Discussion forums
- **Maps**: Location-based services with Mapbox integration
- **Donations**: Donation functionality with fund disbursement tracking
- **Job Board**: Employment opportunities
- **Investment**: Investment-related features
- **Voting**: Voting systems
- **Portfolio**: Member portfolio showcase
- **Notifications**: Push notifications via Firebase

## Development Conventions

### Coding Standards
- TypeScript is used throughout the project for type safety
- Component-based architecture with reusable components
- Context API for state management (AuthContext)
- File-based routing with Expo Router
- Consistent naming conventions using camelCase for variables and PascalCase for components
- Path aliases: `@/*` maps to project root

### Architecture Patterns

#### Screen Components
- Screen components are stored in `/screens` directory organized by feature
- Route files in `/app` import and use screen components
- Example pattern:
  ```tsx
  // app/some-route.tsx
  import SomeScreen from "@/screens/Feature/ScreenSome";
  
  export default function SomeRoute() {
    return <SomeScreen />;
  }
  ```

#### Wrapper Components
- `NewWrapper` component is used for consistent screen layouts
- Located at `components/_ShareComponent/NewWrapper.tsx`

#### Pagination Pattern
- Use `hooks/use-pagination.tsx` and `helpers/paginationHelpers.tsx`
- Helper functions: `createSkeletonList`, `createEmptyState`, `createLoadingFooter`, `createPaginationComponents`
- API functions should accept `page` parameter (default: "1")

### API Service Structure
- Base API configuration: `service/api-config.ts`
- Client APIs: `service/api-client/`
- Admin APIs: `service/api-admin/`
- All API calls use axios with interceptors for auth token injection

### Testing
- Linting is configured with ESLint
- Standard Expo linting configuration

### Security
- Firebase is integrated for authentication and messaging
- Camera and location permissions are properly configured
- Deep linking is secured with app domain associations
- Auth tokens stored in AsyncStorage

## Key Dependencies

### Core Dependencies
- `@react-navigation/*`: Navigation solution for React Native
- `@react-native-firebase/*`: Firebase integration for React Native
- `@rnmapbox/maps`: Mapbox integration for React Native
- `expo-router`: File-based routing for Expo applications
- `react-native-paper`: Material Design components for React Native
- `react-native-toast-message`: Toast notifications
- `react-native-otp-entry`: OTP input components
- `react-native-qrcode-svg`: QR code generation
- `axios`: HTTP client for API calls
- `lodash`: Utility library
- `moti`: Animation library

### Development Dependencies
- `@types/*`: TypeScript type definitions
- `eslint-config-expo`: Expo-specific ESLint configuration
- `typescript`: Type checking

## Platform Support

The application is configured to support:
- **iOS**: 
  - Bundle identifier: `com.anonymous.hipmi-mobile`
  - Supports tablets
  - Build number: 21
  - Google Services integration
  - Associated domains for deep linking
- **Android**: 
  - Package name: `com.bip.hipmimobileapp`
  - Version code: 4
  - Adaptive icons
  - Edge-to-edge display enabled
  - Intent filters for HTTPS deep linking
- **Web**: Static output configuration for web deployment

## Special Configurations

### Deep Linking
- Scheme: `hipmimobile://`
- Associated domains: `applinks:cld-dkr-staging-hipmi.wibudev.com`
- Configured for both iOS and Android

### Maps Integration
The application uses Mapbox for mapping functionality with the `@rnmapbox/maps` plugin.

### Push Notifications
Firebase Cloud Messaging is integrated for push notifications with proper configuration for both iOS and Android platforms.

### Camera
Camera permissions configured for both iOS and Android with microphone access for recording.

## Common Development Tasks

### Adding a New Screen
1. Create screen component in appropriate `/screens` subdirectory
2. Add route in `/app` directory if needed
3. Configure navigation in `AppRoot.tsx` if custom header is needed

### Adding API Endpoint
1. Add function in appropriate service file (`service/api-client/` or `service/api-admin/`)
2. Use `apiConfig` axios instance for requests
3. Include proper error handling

### Refactoring Pattern (from docs/prompt-for-qwen-code.md)
When moving code from route files to screen components:
1. Create new file in `screens/<Feature>/` directory
2. Rename function with prefix (e.g., `Admin_`, `Donation_`)
3. Use `NewWrapper` component for consistent layout
4. Apply pagination helpers if displaying lists
5. Import and call from original route file
