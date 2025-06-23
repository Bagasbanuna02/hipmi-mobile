import ButtonCustom from "@/components/Button/ButtonCustom";
import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { globalStyles } from "@/constants/global-styles";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

export default function Validasi() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ViewWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          height: "100%",
        }}
      >
        <View>
          <View style={globalStyles.authContainer}>
            <Text style={globalStyles.authTitle}>Verifikasi KOde OTP</Text>
            <Spacing height={30} />
            <Text style={globalStyles.textLabel}>Masukan 4 digit kode otp</Text>
            <Text style={globalStyles.textLabel}>
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
            <Text style={globalStyles.textLabel}>
              Tidak menerima kode ?{" "}
              <Text style={{ ...globalStyles.textLabel }}>Kirim Ulang</Text>
            </Text>
          </View>
        </View>

        <ButtonCustom
          title="Verifikasi"
          backgroundColor={MainColor.yellow}
          textColor={MainColor.black}
          radius={10}
          onPress={() => router.push("/")}
        />
      </View>
    </ViewWrapper>
  );
}
