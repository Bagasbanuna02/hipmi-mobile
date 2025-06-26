import ButtonCustom from "@/components/_ShareComponent/Button/ButtonCustom";
import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { Styles } from "@/constants/global-styles";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

export default function Validasi() {
  const router = useRouter();
  return (
    <ViewWrapper withBackground>
      <View style={Styles.authContainer}>
        <View>
          <View style={Styles.authContainerTitle}>
            <Text style={Styles.authTitle}>Verifikasi KOde OTP</Text>
            <Spacing height={30} />
            <Text style={Styles.textLabel}>Masukan 4 digit kode otp</Text>
            <Text style={Styles.textLabel}>
              Yang di kirim ke +6282xxxxxxxxx
            </Text>
            <Spacing height={30} />
            <OtpInput
              numberOfDigits={4}
              theme={{
                pinCodeContainerStyle: {
                  backgroundColor: MainColor.login,
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
            />
            <Spacing height={30} />
            <Text style={Styles.textLabel}>
              Tidak menerima kode ?{" "}
              <Text style={Styles.textLabel}>Kirim Ulang</Text>
            </Text>
          </View>
          <Spacing height={30} />
        </View>

        <ButtonCustom
          title="Verifikasi"
          backgroundColor={MainColor.yellow}
          textColor={MainColor.black}
          radius={10}
          onPress={() => router.push("/register")}
        />
      </View>
    </ViewWrapper>
  );
}
