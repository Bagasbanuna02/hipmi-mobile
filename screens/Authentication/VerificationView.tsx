import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { MainColor } from "@/constants/color-palet";
import { apiCheckCodeOtp, apiValidationCode } from "@/service/api";
import { GStyles } from "@/styles/global-styles";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-toast-message";

export default function VerificationView() {
  const { kodeId } = useLocalSearchParams();
  const [codeOtp, setCodeOtp] = useState<string>("");
  const [inputOtp, setInputOtp] = useState<string>("");
  const [nomor, setNomor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    onLoadCheckCodeOtp(kodeId as string);
  }, [kodeId]);

  async function onLoadCheckCodeOtp(kodeId: string) {
    const response = await apiCheckCodeOtp({ kodeId: kodeId });
    console.log("response ", JSON.stringify(response, null, 2));
    setCodeOtp(response.otp);
    setNomor(response.nomor);
  }

  const handleVerification = async () => {
    const codeOtpNumber = parseInt(codeOtp);
    const inputOtpNumber = parseInt(inputOtp);

    console.log("codeOtpNumber ", codeOtpNumber, typeof codeOtpNumber);
    console.log("inputOtpNumber ", inputOtpNumber, typeof inputOtpNumber);

    if (inputOtpNumber !== codeOtpNumber) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Kode OTP tidak sesuai",
      });

      return;
    }

    try {
      setLoading(true);
      const response = await apiValidationCode({ nomor: nomor });
      console.log("response ", JSON.stringify(response, null, 2));

      if (response.success) {
        if (response.active) {
          if (response.roleId === "1") {
            router.replace("/(application)/(user)/home");
          } else {
            router.replace("/(application)/admin/dashboard");
          }
        } else {
          router.replace("/(application)/(user)/waiting-room");
        }
      } else {
        router.replace(`/register?nomor=${nomor}`);
      }
    } catch (error) {
      console.log("Error verification", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ViewWrapper withBackground>
        <View style={GStyles.authContainer}>
          <View>
            <View style={GStyles.authContainerTitle}>
              <Text style={GStyles.authTitle}>Verifikasi KOde OTP</Text>
              <Spacing height={30} />
              <Text style={GStyles.textLabel}>Masukan 4 digit kode otp</Text>
              <Text style={GStyles.textLabel}>Yang di kirim ke +{nomor}</Text>
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
            isLoading={loading}
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
