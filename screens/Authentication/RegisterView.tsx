import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { TextInputCustom } from "@/components/TextInput/TextInputCustom";
import { MainColor } from "@/constants/color-palet";
import { Styles } from "@/styles/global-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";


export default function RegisterView() {
  return (
    <>
      <ViewWrapper withBackground>
        <View style={Styles.authContainer}>
          <View>
            <View style={Styles.authContainerTitle}>
              <Text style={Styles.authTitle}>REGISTRASI</Text>
              <Spacing />
              <MaterialCommunityIcons
                name="account"
                size={100}
                color={MainColor.yellow}
              />
              <Spacing />

              <Text style={Styles.textLabel}>
                Anda akan terdaftar dengan nomor
              </Text>
              <Text style={Styles.textLabel}>+6282xxxxxxxxx</Text>
              <Spacing />
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
            <Spacing />
            {/* <ButtonCustom
            title="Home"
            backgroundColor={MainColor.yellow}
            textColor={MainColor.black}
            radius={10}
            onPress={() => {
              console.log("Home clicked");
              router.push("/(application)/home");
            }}
          /> */}
          </View>
        </View>
      </ViewWrapper>
    </>
  );
}
