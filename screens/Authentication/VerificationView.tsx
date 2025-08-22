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
import Toast from "react-native-toast-message";

export default function VerificationView() {
  const { nomor } = useLocalSearchParams();

  const [codeOtp, setCodeOtp] = useState<string>("");
  const [inputOtp, setInputOtp] = useState<string>("");
  const [userNumber, setUserNumber] = useState<string>("");

  // --- Context ---
  const { validateOtp, isLoading } = useAuth();

  useEffect(() => {
    onLoadCheckCodeOtp();
  }, []);

  async function onLoadCheckCodeOtp() {
    const kodeId = await AsyncStorage.getItem("kode_otp");
    const response = await apiCheckCodeOtp({ kodeId: kodeId as string });
    setCodeOtp(response.otp);
    setUserNumber(response.nomor);
  }

  const handleVerification = async () => {
    const codeOtpNumber = parseInt(codeOtp);
    const inputOtpNumber = parseInt(inputOtp);

    if (inputOtpNumber !== codeOtpNumber) {
      Toast.show({
        type: "error",
        text1: "Kode OTP tidak sesuai",
      });

      return;
    }

    try {
      const response = await validateOtp(nomor as string);
      return router.replace(response);

      // if (response.success) {
      //   await userData(response.token);

      //   if (response.active) {
      //     if (response.roleId === "1") {
      //       return "/(application)/(user)/home";
      //     } else {
      //       return "/(application)/admin/dashboard";
      //     }
      //   } else {
      //     return "/(application)/(user)/waiting-room";
      //   }
      // } else {
      //   Toast.show({
      //     type: "info",
      //     text1: "Anda belum terdaftar",
      //     text2: "Silahkan daftar terlebih dahulu",
      //   });
      //   return `/register?nomor=${nomor}`;
      // }
    } catch (error) {
      console.log("Error verification", error);
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
                Yang di kirim ke +{userNumber}
              </Text>
              <Spacing height={30} />
              <OtpInput
                disabled={codeOtp === ""}
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
              <Text style={GStyles.textLabel}>
                Tidak menerima kode ?{" "}
                <Text style={GStyles.textLabel}>Kirim Ulang</Text>
              </Text>
            </View>
            <Spacing height={30} />
          </View>

          <ButtonCustom
            isLoading={isLoading}
            disabled={codeOtp === ""}
            backgroundColor={MainColor.yellow}
            textColor={MainColor.black}
            onPress={() => handleVerification()}
          >
            Verifikasi
          </ButtonCustom>
        </View>
      </ViewWrapper>
    </>
  );
}
