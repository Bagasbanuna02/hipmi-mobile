import { Text, View } from "react-native";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { globalStyles } from "@/constants/global-styles";
import Spacing from "@/components/_ShareComponent/Spacing";
import { EvilIcons } from "@expo/vector-icons";
import { MainColor } from "@/constants/color-palet";
import { TextInputCustom } from "@/components/TextInput/TextInputCustom";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
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
            <Text style={globalStyles.authTitle}>REGISTRASI</Text>
            <Spacing height={30} />
            <EvilIcons name="user" size={100} color={MainColor.yellow} />
            <Spacing height={30} />

            <Text style={globalStyles.textLabel}>
              Anda akan terdaftar dengan nomor
            </Text>
            <Text style={globalStyles.textLabel}>+6282xxxxxxxxx</Text>
            <Spacing height={30} />
          </View>
          <TextInputCustom placeholder="Masukkan username" />

          <ButtonCustom
            title="Daftar"
            backgroundColor={MainColor.yellow}
            textColor={MainColor.black}
            radius={10}
            onPress={() => (
              console.log("Success register"),
              router.push("/(application)/home")
            )}
          />
          {/* <Spacing height={10} />
          <ButtonCustom
            title="Katalog"
            backgroundColor={MainColor.yellow}
            textColor={MainColor.black}
            radius={10}
            onPress={() => router.push("/(application)/(katalog)")}
          /> */}
        </View>
      </View>
    </ViewWrapper>
  );
}
