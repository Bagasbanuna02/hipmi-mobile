import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { apiCheckCodeOtp } from "@/service/api-config";
import { GStyles } from "@/styles/global-styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function VerificationView() {
  const { nomor } = useLocalSearchParams<{ nomor: string }>();

  const [inputOtp, setInputOtp] = useState<string>("");
  const [userNumber, setUserNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recodeOtp, setRecodeOtp] = useState<boolean>(false);

  // 🔑 DETEKSI MODE REVIEW (HANYA UNTUK NOMOR DEMO & DEVELOPMENT BUILD)
  // Menggunakan Constants.expoConfig untuk mendeteksi development build
  const isReviewMode =
    process.env.NODE_ENV === "development" &&
    nomor === "6282340374412";

  // --- Context ---
  const { validateOtp, isLoading, loginWithNomor } = useAuth();

  useEffect(() => {
    setUserNumber(nomor?.replace(/^\+/, "") || "");

    if (!isReviewMode) {
      // Hanya jalankan logika OTP normal jika BUKAN review mode
      onLoadCheckCodeOtp();
    }
  }, [recodeOtp, isReviewMode]);

  async function onLoadCheckCodeOtp() {
    setRecodeOtp(false);
    const kodeId = await AsyncStorage.getItem("kode_otp");
    if (!kodeId) return;

    try {
      const response = await apiCheckCodeOtp({ kodeId });
      console.log(
        "[OTP] >>",
        JSON.stringify(response.otp, null, 2)
      );
      // Kita tidak perlu simpan codeOtp di state karena verifikasi dilakukan di backend
      // Cukup simpan nomor
    } catch (error) {
      console.log("Error check code otp", error);
    }
  }

  const handlerResendOtp = async () => {
    if (isReviewMode) {
      // Di review mode, tidak perlu kirim ulang — OTP tetap 1234
      Toast.show({ type: "info", text1: "OTP demo: 1234" });
      return;
    }

    try {
      setLoading(true);
      await loginWithNomor(nomor as string);
      setRecodeOtp(true);

      // ❌ Kamu tidak punya nomor di sini, jadi pastikan `nomor` tersedia
      // Sebaiknya simpan nomor saat login, atau gunakan dari `useLocalSearchParams`
      router.setParams({ nomor }); // opsional
    } catch (error) {
      console.log("Error resend OTP", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    if (isReviewMode) {
      // ✅ VERIFIKASI OTOMATIS UNTUK APPLE REVIEW (Development Only)
      if (inputOtp !== "1234") {
        Toast.show({ type: "error", text1: "Kode OTP tidak sesuai" });
        return;
      }
      try {
        await validateOtp(nomor as string, inputOtp);
        return;
      } catch (error) {
        console.log("Error verification", error);
        Toast.show({ type: "error", text1: "Gagal verifikasi" });
      }
    }

    // 🔁 VERIFIKASI NORMAL (untuk pengguna sungguhan)
    try {
      await validateOtp(nomor as string, inputOtp);
      return;
    } catch (error: any) {
      console.log("Error verification", error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Gagal verifikasi",
      });
    }
  };

  return (
    <>
      <ViewWrapper withBackground>
        <View style={GStyles.authContainer}>
          <View>
            <View style={GStyles.authContainerTitle}>
              <Text style={GStyles.authTitle}>Verifikasi Kode OTP</Text>
              <Spacing height={30} />
              <Text style={GStyles.textLabel}>Masukan 4 digit kode otp</Text>
              <Text style={GStyles.textLabel}>
                Yang dikirim ke +{userNumber}
              </Text>
              <Spacing height={30} />
              <OtpInput
                disabled={isReviewMode ? false : false} // tetap aktif
                numberOfDigits={4}
                theme={{
                  pinCodeContainerStyle: {
                    backgroundColor: MainColor.text_input,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: MainColor.yellow,
                    width: 60,
                    height: 60,
                  },
                  containerStyle: {
                    paddingLeft: 10,
                    paddingRight: 10,
                  },
                }}
                onTextChange={(otp: string) => setInputOtp(otp)}
              />
              <Spacing height={30} />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={GStyles.textLabel}>Tidak menerima kode?</Text>
                {loading ? (
                  <ActivityIndicator size={10} color={MainColor.yellow} />
                ) : (
                  <Text style={GStyles.textLabel} onPress={handlerResendOtp}>
                    {" Kirim Ulang"}
                  </Text>
                )}
              </View>
            </View>
            <Spacing height={30} />
          </View>

          <ButtonCustom
            isLoading={isLoading}
            disabled={inputOtp.length < 4}
            backgroundColor={MainColor.yellow}
            textColor={MainColor.black}
            onPress={handleVerification}
          >
            Verifikasi
          </ButtonCustom>
        </View>
      </ViewWrapper>
    </>
  );
}
