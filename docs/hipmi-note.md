
### Buil
eas build --profile production : for build production on expo with eas

npx expo prebuild : untuk build dan membuat folder android & ios

open ios/<nama-app>.xcworkspace : untuk membuka file xcode
Build ios : bun run ios
Build android : bun run android
Exp: open ios/HIPMIBADUNG.xcworkspace

### Other
perubahan versi : npm version patch
ios: bunx expo prebuild --platform ios
android: bunx expo prebuild --platform android

### Android
adb devices : cek device yang terhubung
Note: izinkan perangkat dulu agar statusnya tidak unauthorized

adb install android/app/build/outputs/apk/debug/app-debug.apk : install apk ke device / emulator
Note:
Gunakan flag -s (serial) di perintah adb untuk menentukan target 
adb -s <0G52319V261040B2 ini adalah id nya> install android/app/build/outputs/apk/debug/app-debug.apk

