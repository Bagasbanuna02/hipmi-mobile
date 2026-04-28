# QR Code Testing Guide - HIPMI Mobile

## 📋 Overview

Dokumentasi ini menjelaskan cara testing QR Code untuk Universal Links (iOS) dan App Links (Android) pada fitur Event Confirmation.

## 🔧 Update Terbaru

File `screens/Admin/Event/EventDetailQRCode.tsx` telah diupdate dengan fitur:
- **Toggle Button**: Switch antara HTTPS link dan Custom Scheme link
- **HTTPS Link**: Untuk testing Universal Links/App Links dengan domain staging
- **Custom Scheme**: Untuk testing langsung tanpa domain verification

## 🎯 Cara Testing QR Code

### Opsi 1: HTTPS Link (Recommended untuk Production)

**Gunakan tombol "HTTPS"** di component QR Code.

**Link yang di-generate:**
```
https://cld-dkr-staging-hipmi.wibudev.com/event/{id}/confirmation?userId={userId}
```

**Cara kerja:**
1. User scan QR code dengan kamera
2. Safari/Chrome terbuka dengan URL HTTPS
3. iOS/Android mendeteksi domain terverifikasi
4. App terbuka otomatis dan menuju halaman confirmation

**Prerequisites:**
- ✅ File `apple-app-site-association` harus accessible di Next.js server
- ✅ File `assetlinks.json` harus accessible di Next.js server
- ✅ Domain harus terverifikasi di app.config.js
- ✅ App harus di-build ulang setelah perubahan domain

**Testing Steps:**
```bash
# 1. Pastikan .well-known files accessible
curl https://cld-dkr-staging-hipmi.wibudev.com/.well-known/apple-app-site-association
curl https://cld-dkr-staging-hipmi.wibudev.com/.well-known/assetlinks.json

# 2. Rebuild app
bunx expo prebuild --clean

# 3. Run di physical device (bukan simulator)
bun run android    # untuk Android
bun run ios        # untuk iOS
```

### Opsi 2: Custom Scheme Link (Untuk Development/Testing Cepat)

**Gunakan tombol "Custom Scheme"** di component QR Code.

**Link yang di-generate:**
```
hipmimobile://event/{id}/confirmation?userId={userId}
```

**Cara kerja:**
1. User scan QR code dengan kamera
2. iOS: Pilih "Open in HIPMI Badung Connect"
3. Android: Langsung buka app
4. App terbuka dan menuju halaman confirmation

**Keuntungan:**
- ✅ Tidak butuh domain verification
- ✅ Bisa testing langsung tanpa rebuild
- ✅ Cocok untuk development

**Kekurangan:**
- ❌ Tidak bisa dibuka dari web browser
- ❌ Tidak support universal linking dari website lain

## 📱 Testing Checklist

### iOS (Universal Links)

- [ ] File `apple-app-site-association` valid dan accessible
- [ ] Domain terdaftar di `app.config.js` → `ios.associatedDomains`
- [ ] Bundle ID match dengan konfigurasi
- [ ] Team ID benar di apple-app-site-association
- [ ] Test dengan **physical device** (simulator tidak support)
- [ ] Test dengan **Safari** (bukan Chrome)
- [ ] Long press link → ada opsi "Open"

**Debug iOS:**
```bash
# Cek apple-app-site-association
curl -I https://cld-dkr-staging-hipmi.wibudev.com/.well-known/apple-app-site-association

# Harus return:
# Content-Type: application/json
# HTTP/2 200
```

### Android (App Links)

- [ ] File `assetlinks.json` valid dan accessible
- [ ] SHA256 fingerprint benar
- [ ] Package name match
- [ ] Intent filters terdaftar di app.config.js
- [ ] Test dengan **physical device**
- [ ] Test dengan **Chrome**

**Debug Android:**
```bash
# Dapatkan SHA256 fingerprint
cd android
./gradlew signingReport

# Cek assetlinks.json
curl https://cld-dkr-staging-hipmi.wibudev.com/.well-known/assetlinks.json
```

## 🐛 Troubleshooting

### Problem: QR Scan Terbuka di Safari, Tidak Balik ke App

**Penyebab:**
- Domain belum terverifikasi untuk Universal Links/App Links
- File `.well-known` tidak accessible atau invalid
- App belum di-rebuild setelah perubahan domain

**Solusi:**
1. Pastikan file `.well-known` accessible:
   ```bash
   curl https://cld-dkr-staging-hipmi.wibudev.com/.well-known/apple-app-site-association
   ```

2. Rebuild app:
   ```bash
   bunx expo prebuild --clean
   bun run android  # atau bun run ios
   ```

3. Gunakan **Custom Scheme** untuk testing cepat

### Problem: Link Tidak Membuka App Sama Sekali

**Cek:**
1. App sudah terinstall di device
2. Link format benar (hipmimobile:// atau https://)
3. Route handler sudah ada di app folder

**Test manual:**
```bash
# iOS Simulator
xcrun simctl openurl booted "hipmimobile://event/123/confirmation?userId=456"

# Android Emulator
adb shell am start -W -a android.intent.action.VIEW \
  -d "hipmimobile://event/123/confirmation?userId=456" \
  com.bip.hipmimobileapp
```

### Problem: "Cannot GET /event/..." di Next.js

**Penyebab:**
Route `/event/[id]/confirmation` tidak ada di Next.js server

**Solusi:**
Pastikan Next.js project punya file:
```
public/.well-known/apple-app-site-association
public/.well-known/assetlinks.json
```

Dan API route untuk handle:
```
pages/api/event/[id]/confirmation.ts
```

## 📄 File Configuration

### app.config.js - iOS
```javascript
ios: {
  associatedDomains: ["applinks:cld-dkr-staging-hipmi.wibudev.com"],
}
```

### app.config.js - Android
```javascript
android: {
  intentFilters: [
    {
      action: "VIEW",
      autoVerify: true,
      data: [
        {
          scheme: "https",
          host: "cld-dkr-staging-hipmi.wibudev.com",
          pathPrefix: "/",
        },
      ],
      category: ["BROWSABLE", "DEFAULT"],
    },
  ],
}
```

### apple-app-site-association (Next.js)
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAM_ID.com.anonymous.hipmi-mobile",
        "paths": ["/event/*/confirmation"]
      }
    ]
  }
}
```

### assetlinks.json (Next.js)
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.bip.hipmimobileapp",
      "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT"]
    }
  }
]
```

## 🎓 Best Practices

1. **Development**: Gunakan Custom Scheme untuk testing cepat
2. **Staging**: Gunakan HTTPS link dengan domain staging
3. **Production**: Gunakan HTTPS link dengan domain production
4. **Testing**: Selalu test di physical device, bukan simulator
5. **Debugging**: Enable logging di confirmation page untuk track deep link

## 🔗 Related Files

- `screens/Admin/Event/EventDetailQRCode.tsx` - QR Code generator
- `app/(application)/(user)/event/[id]/confirmation.tsx` - Confirmation page
- `app.config.js` - App configuration
- `service/api-config.ts` - API configuration (DEEP_LINK_URL)

## 📞 Support

Jika masih ada masalah:
1. Cek logs di console
2. Test manual dengan adb/xcrun
3. Verify .well-known files dengan curl
4. Pastikan app rebuild setelah perubahan config
