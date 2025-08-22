import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import TextInputCustom from "@/components/TextInput/TextInputCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { GStyles } from "@/styles/global-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RegisterView() {
  const { nomor } = useLocalSearchParams();
  const [username, setUsername] = useState("");
  // const [loading, setLoading] = useState(false);

  const { registerUser, isLoading } = useAuth();

  const validasiData = () => {
    if (!nomor) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Nomor tidak ditemukan",
      });
      return false;
    }
    if (!username) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Username tidak boleh kosong",
      });
      return false;
    }
    return true;
  };

  async function handleRegister() {
    const isValid = validasiData();
    if (!isValid) return;

    await registerUser({
      nomor: nomor as string,
      username: username,
    });
  }

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
              <Text style={GStyles.textLabel}>+{nomor}</Text>
              <Spacing />
            </View>
            <TextInputCustom
              placeholder="Masukkan username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />

            <ButtonCustom isLoading={isLoading} onPress={handleRegister}>
              Daftar
            </ButtonCustom>
          </View>
        </View>
      </ViewWrapper>
    </>
  );
}
