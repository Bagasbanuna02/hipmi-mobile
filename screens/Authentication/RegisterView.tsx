import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { TextInputCustom } from "@/components/TextInput/TextInputCustom";
import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useState } from "react";

export default function RegisterView() {
  const [username, setUsername] = useState("Bagas Banuna");
  const handleRegister = () => {
    console.log("Success register", username);
    router.push("/(application)/home");
  };
  return (
    <>
      <ViewWrapper withBackground>
        <View style={GStyles.authContainer}>
          <View>
            <View style={GStyles.authContainerTitle}>
              <Text style={GStyles.authTitle}>REGISTRASI</Text>
              <Spacing />
              <MaterialCommunityIcons
                name="account"
                size={100}
                color={MainColor.yellow}
              />
              <Spacing />

              <Text style={GStyles.textLabel}>
                Anda akan terdaftar dengan nomor
              </Text>
              <Text style={GStyles.textLabel}>+6282xxxxxxxxx</Text>
              <Spacing />
            </View>
            <TextInputCustom
              placeholder="Masukkan username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />

            <ButtonCustom onPress={handleRegister}>Daftar</ButtonCustom>
            {/* <Spacing />
            <ButtonCustom
              title="Coba"
              backgroundColor={MainColor.yellow}
              textColor={MainColor.black}
              onPress={() => {
                console.log("Home clicked");
                router.push("/(application)/coba");
              }}
            /> */}
          </View>
        </View>
      </ViewWrapper>
    </>
  );
}
