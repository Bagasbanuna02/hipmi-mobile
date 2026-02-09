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

### Environment Variables
The application uses environment variables defined in the app.config.js file:
- `API_BASE_URL`: Base URL for API endpoints
- `BASE_URL`: Base application URL
- `DEEP_LINK_URL`: URL for deep linking functionality

### EAS Build Configuration
The project uses Expo Application Services (EAS) for building and deploying:
- Development builds with development client
- Preview builds for internal distribution
- Production builds for app stores

## Features and Functionality

The application appears to include several key modules:
- **Authentication**: Login, registration, and verification flows
- **Admin Panel**: Administrative functions
- **Collaboration**: Tools for member collaboration
- **Events**: Event management and calendar
- **Forum**: Discussion forums
- **Maps**: Location-based services with Mapbox integration
- **Donations**: Donation functionality
- **Job Board**: Employment opportunities
- **Investment**: Investment-related features
- **Voting**: Voting systems
- **Portfolio**: Member portfolio showcase
- **Notifications**: Push notifications via Firebase

## Development Conventions

### Coding Standards
- TypeScript is used throughout the project for type safety
- Component-based architecture with reusable components
- Context API for state management
- File-based routing with Expo Router
- Consistent naming conventions using camelCase for variables and PascalCase for components

### Testing
- Linting is configured with ESLint
- Standard Expo linting configuration is used

### Security
- Firebase is integrated for authentication and messaging
- Camera and location permissions are properly configured
- Deep linking is secured with app domain associations

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

### Development Dependencies
- `@types/*`: TypeScript type definitions
- `eslint-config-expo`: Expo-specific ESLint configuration
- `typescript`: Type checking

## Platform Support

The application is configured to support:
- **iOS**: With tablet support and proper permissions
- **Android**: With adaptive icons and intent filters for deep linking
- **Web**: Static output configuration for web deployment

## Special Configurations

### iOS Configuration
- Bundle identifier: `com.anonymous.hipmi-mobile`
- Supports tablets
- Google Services integration
- Location permission handling
- Associated domains for deep linking

### Android Configuration
- Package name: `com.bip.hipmimobileapp`
- Adaptive icons
- Edge-to-edge display enabled
- Intent filters for HTTPS deep linking
- Google Services integration

### Maps Integration
The application uses Mapbox for mapping functionality with the `@rnmapbox/maps` plugin.

### Push Notifications
Firebase Cloud Messaging is integrated for push notifications with proper configuration for both iOS and Android platforms.