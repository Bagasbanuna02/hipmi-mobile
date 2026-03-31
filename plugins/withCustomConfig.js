const {
  withAppBuildGradle,
  withProjectBuildGradle,
  withInfoPlist,
} = require("@expo/config-plugins");

const { withPodfile } = require("@expo/config-plugins");
const { withAndroidManifest } = require("@expo/config-plugins");
const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

// ─────────────────────────────────────────
// 1. PROJECT-LEVEL build.gradle
//    Tambah: google-services classpath + Mapbox maven
// ─────────────────────────────────────────
const withCustomProjectBuildGradle = (config) => {
  return withProjectBuildGradle(config, (config) => {
    let contents = config.modResults.contents;

    // Tambah google-services classpath jika belum ada
    if (!contents.includes("com.google.gms:google-services")) {
      contents = contents.replace(
        /classpath\('com\.android\.tools\.build:gradle'\)/,
        `classpath('com.android.tools.build:gradle')
    classpath 'com.google.gms:google-services:4.4.1'`,
      );
    }

    // Tambah Mapbox maven repository jika belum ada
    if (!contents.includes("api.mapbox.com")) {
      contents = contents.replace(
        /allprojects\s*\{[\s\S]*?repositories\s*\{/,
        `allprojects {
  repositories {
    maven {
      url 'https://api.mapbox.com/downloads/v2/releases/maven'
      def token = project.properties['MAPBOX_DOWNLOADS_TOKEN'] ?: System.getenv('RNMAPBOX_MAPS_DOWNLOAD_TOKEN')
      if (token) {
        authentication { basic(BasicAuthentication) }
        credentials {
          username = 'mapbox'
          password = token
        }
      }
    }`,
      );
    }

    config.modResults.contents = contents;
    return config;
  });
};

// ─────────────────────────────────────────
// 2. APP-LEVEL build.gradle
//    Tambah: buildConfigField + google-services plugin
// ─────────────────────────────────────────
const withCustomAppBuildGradle = (config) => {
  return withAppBuildGradle(config, (config) => {
    let contents = config.modResults.contents;

    // Tambah Mapbox packagingOptions
    if (!contents.includes("rnmapbox/maps-libcpp")) {
      contents = contents.replace(
        /android\s*\{/,
        `android {
// @generated begin @rnmapbox/maps-libcpp - expo prebuild (DO NOT MODIFY) sync-e24830a5a3e854b398227dfe9630aabfaa1cadd1
packagingOptions {
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    }
// @generated end @rnmapbox/maps-libcpp`,
      );
    }

    // Tambah buildConfigField REACT_NATIVE_RELEASE_LEVEL
    if (!contents.includes("REACT_NATIVE_RELEASE_LEVEL")) {
      contents = contents.replace(
        /defaultConfig\s*\{/,
        `defaultConfig {
        buildConfigField "String", "REACT_NATIVE_RELEASE_LEVEL", "\\"${`$`}{findProperty('reactNativeReleaseLevel') ?: 'stable'}\\""`,
      );
    }

    // Tambah apply plugin google-services di akhir file
    if (!contents.includes("com.google.gms.google-services")) {
      contents += `\napply plugin: 'com.google.gms.google-services'\n`;
    }

    config.modResults.contents = contents;
    return config;
  });
};

// ─────────────────────────────────────────
// 3. Info.plist
//    Tambah: custom URL schemes + deskripsi Bahasa Indonesia
// ─────────────────────────────────────────
const withCustomInfoPlist = (config) => {
  return withInfoPlist(config, (config) => {
    const plist = config.modResults;

    // Custom URL Schemes
    // Pastikan CFBundleURLTypes sudah ada, lalu tambahkan scheme custom
    if (!plist.CFBundleURLTypes) {
      plist.CFBundleURLTypes = [];
    }

    const hasHipmiScheme = plist.CFBundleURLTypes.some((entry) =>
      entry.CFBundleURLSchemes?.includes("hipmimobile"),
    );

    if (!hasHipmiScheme) {
      plist.CFBundleURLTypes.push({
        CFBundleURLSchemes: ["hipmimobile", "com.anonymous.hipmi-mobile"],
      });
    }

    // NSLocationWhenInUseUsageDescription — Bahasa Indonesia
    plist.NSLocationWhenInUseUsageDescription =
      "Aplikasi membutuhkan akses lokasi untuk menampilkan peta.";

    // NSPhotoLibraryUsageDescription — Bahasa Indonesia (panjang)
    plist.NSPhotoLibraryUsageDescription =
      "Untuk mengunggah dokumen dan media bisnis seperti foto profil, logo usaha, poster lowongan, atau bukti transaksi di berbagai fitur aplikasi: Profile, Portofolio, Job Vacancy, Investasi, dan Donasi.";

    plist.NSFaceIDUsageDescription =
      "Allow $(PRODUCT_NAME) to access your Face ID biometric data.";

    return config;
  });
};

// ─────────────────────────────────────────
// 4. Android Manifest
//    Tambah: backup rules untuk expo-secure-store
// ─────────────────────────────────────────
const withCustomManifest = (config) => {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    const application = manifest.application[0];

    // Tambah atribut backup untuk expo-secure-store
    application.$["android:fullBackupContent"] =
      "@xml/secure_store_backup_rules";
    application.$["android:dataExtractionRules"] =
      "@xml/secure_store_data_extraction_rules";

    // Tambah tools:replace pada meta-data notification color
    const metaDataList = application["meta-data"] || [];
    const notifColorMeta = metaDataList.find(
      (m) =>
        m.$["android:name"] ===
        "com.google.firebase.messaging.default_notification_color",
    );
    if (notifColorMeta) {
      notifColorMeta.$["tools:replace"] = "android:resource";
    }

    return config;
  });
};

// ─────────────────────────────────────────
// 5. Podfile
//    Tambah: use_modular_headers!
// ─────────────────────────────────────────

const withCustomPodfile = (config) => {
  return withPodfile(config, (config) => {
    let contents = config.modResults.contents;

    // Tambah use_modular_headers! jika belum ada
    if (!contents.includes("use_modular_headers!")) {
      contents = contents.replace(
        /platform :ios/,
        `use_modular_headers!\nplatform :ios`,
      );
    }

    // Tambah Firebase pods jika belum ada
    if (!contents.includes("pod 'Firebase/Messaging'")) {
      contents = contents.replace(
        /use_react_native_pods\!/,
        `pod 'Firebase'\n  pod 'Firebase/Messaging'\n\n  use_react_native_pods!`,
      );
    }

    // Tambah fix script with-environment.sh jika belum ada
    // Tambah fix script with-environment.sh jika belum ada
    if (!contents.includes("with-environment.sh")) {
      const fixScript = [
        "post_install do |installer|",
        "    # Fix all script phases with incorrect paths",
        "    installer.pods_project.targets.each do |target|",
        "      target.build_phases.each do |phase|",
        "        next unless phase.respond_to?(:shell_script)",
        "        if phase.shell_script.include?('with-environment.sh')",
        "          phase.shell_script = phase.shell_script.gsub(",
        "            %r{(/.*?/node_modules/react-native)+/scripts/xcode/with-environment.sh},",
        "            '${PODS_ROOT}/../../node_modules/react-native/scripts/xcode/with-environment.sh'",
        "          )",
        "        end",
        "      end",
        "    end",
      ].join("\n");

      contents = contents.replace(/post_install do \|installer\|/, fixScript);
    }

    config.modResults.contents = contents;
    return config;
  });
};

// ─────────────────────────────────────────
// 6. Android XML Files
//    Tambah: secure_store_backup_rules.xml dan secure_store_data_extraction_rules.xml
// ─────────────────────────────────────────

const withSecureStoreXml = (config) => {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const xmlDir = path.join(
        config.modRequest.platformProjectRoot,
        "app/src/main/res/xml",
      );

      // Buat folder jika belum ada
      if (!fs.existsSync(xmlDir)) {
        fs.mkdirSync(xmlDir, { recursive: true });
      }

      // Definisikan path variabel di sini ← INI yang kurang sebelumnya
      const backupRulesPath = path.join(
        xmlDir,
        "secure_store_backup_rules.xml",
      );
      const dataExtractionPath = path.join(
        xmlDir,
        "secure_store_data_extraction_rules.xml",
      );

      // secure_store_backup_rules.xml
      fs.writeFileSync(
        backupRulesPath,
        `<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
  <exclude domain="sharedpref" path="SECURESTORE"/>
</full-backup-content>`,
      );

      // secure_store_data_extraction_rules.xml
      fs.writeFileSync(
        dataExtractionPath,
        `<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
  <cloud-backup>
    <exclude domain="sharedpref" path="SECURESTORE"/>
  </cloud-backup>
  <device-transfer>
    <exclude domain="sharedpref" path="SECURESTORE"/>
  </device-transfer>
</data-extraction-rules>`,
      );

      return config;
    },
  ]);
};

// ─────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────
module.exports = (config) => {
  config = withCustomProjectBuildGradle(config);
  config = withCustomAppBuildGradle(config);
  config = withCustomManifest(config);
  config = withSecureStoreXml(config);
  config = withCustomInfoPlist(config);
  config = withCustomPodfile(config);
  return config;
};
