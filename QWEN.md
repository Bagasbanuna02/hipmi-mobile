# HIPMI Mobile Application - Development Guide

## Project Overview

HIPMI Badung Connect is a mobile application built with Expo and React Native. It serves as a connection platform for HIPMI (Himpunan Pengusaha Muda Indonesia) Badung members, featuring authentication, user management, and various business-related functionalities.

### Key Technologies
- **Framework**: Expo (v54.0.0) with React Native (0.81.4)
- **Architecture**: File-based routing with Expo Router
- **State Management**: React Context API
- **Styling**: React Native components with custom color palettes
- **Authentication**: Token-based authentication with OTP verification
- **Database**: AsyncStorage for local storage
- **Maps**: React Native Maps and Mapbox integration
- **Notifications**: Expo Notifications and Firebase Messaging
- **Language**: TypeScript

### Project Structure
```
hipmi-mobile/
├── app/                    # File-based routing structure
│   ├── (application)/      # Main application screens
│   │   ├── (file)/         # File management screens
│   │   ├── (image)/        # Image management screens
│   │   ├── (user)/         # User-specific screens
│   │   └── admin/          # Admin-specific screens
│   ├── _layout.tsx         # Root layout wrapper
│   ├── index.tsx           # Home screen
│   ├── eula.tsx            # Terms and conditions screen
│   ├── register.tsx        # Registration screen
│   └── verification.tsx    # OTP verification screen
├── assets/                 # Static assets (images, icons)
├── components/             # Reusable UI components
├── constants/              # Configuration constants
├── context/                # React Context providers
├── hooks/                  # Custom React hooks
├── screens/                # Screen components
├── service/                # API services and configurations
├── types/                  # TypeScript type definitions
├── app.config.js           # Expo configuration
├── package.json            # Dependencies and scripts
└── ...
```

## Building and Running

### Prerequisites
- Node.js (with bun >=1.0.0 as specified in package.json)
- Expo CLI or bun installed globally

### Setup Instructions
1. **Install dependencies**:
   ```bash
   bun install
   # or if using npm
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file with the following variables:
   ```
   API_BASE_URL=your_api_base_url
   BASE_URL=your_base_url
   DEEP_LINK_URL=your_deep_link_url
   ```

3. **Start the development server**:
   ```bash
   # Using bun (as specified in package.json)
   bun run start
   # or using expo directly
   npx expo start
   ```

4. **Platform-specific commands**:
   ```bash
   # Android
   bun run android
   # iOS
   bun run ios
   # Web
   bun run web
   ```

### EAS Build Configuration
The project uses Expo Application Services (EAS) for building and deployment:
- Development builds: `eas build --profile development`
- Preview builds: `eas build --profile preview`
- Production builds: `eas build --profile production`

## Authentication Flow

The application implements a phone number-based authentication system with OTP verification:

1. **Login**: User enters phone number → OTP sent via SMS
2. **Verification**: User enters OTP code → Validates and creates session
3. **Registration**: If user doesn't exist, registration flow is triggered
4. **Terms Agreement**: User must accept terms and conditions
5. **Session Management**: Tokens stored in AsyncStorage

### Key Authentication Functions
- `loginWithNomor()`: Initiates OTP sending
- `validateOtp()`: Verifies OTP and creates session
- `registerUser()`: Registers new users
- `logout()`: Clears session and removes tokens
- `acceptedTerms()`: Handles terms acceptance

## Key Features

### User Management
- Phone number-based registration and login
- OTP verification system
- Terms and conditions agreement
- User profile management

### Business Features
- Business field management (admin section)
- File and image management capabilities
- Location services integration
- Push notifications

### UI Components
- Custom color palette with blue/yellow theme
- Responsive layouts using SafeAreaView
- Toast notifications for user feedback
- Bottom tab navigation and drawer navigation

## Development Conventions

### Naming Conventions
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Functions: camelCase (e.g., `getUserData()`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Files: kebab-case or camelCase for utility files

### Code Organization
- Components are organized by feature/functionality
- API services are centralized in the `service/` directory
- Type definitions are maintained in the `types/` directory
- Constants are grouped by category in the `constants/` directory

### Styling Approach
- Color palette defined in `constants/color-palet.ts`
- Reusable styles and themes centralized
- Responsive design using React Native's flexbox system

### Testing
- Linting: `bun run lint` (uses ESLint with Expo config)
- No specific test framework mentioned in package.json

## Environment Configuration

The application supports multiple environments through:
- Environment variables loaded via dotenv
- Expo's extra configuration in `app.config.js`
- Platform-specific configurations for iOS and Android

### Supported Platforms
- iOS (with tablet support)
- Android (with adaptive icons)
- Web (static output)

## Third-party Integrations

- **Firebase**: Authentication, messaging, and analytics
- **Mapbox**: Advanced mapping capabilities
- **React Navigation**: Screen navigation and routing
- **React Native Paper**: Material Design components
- **Axios**: HTTP client for API requests
- **Lodash**: Utility functions
- **QR Code SVG**: QR code generation

## Important Configuration Files

- `app.config.js`: Expo configuration, app metadata, and plugin setup
- `eas.json`: EAS build profiles and submission configuration
- `tsconfig.json`: TypeScript compiler options
- `package.json`: Dependencies, scripts, and project metadata
- `metro.config.js`: Metro bundler configuration