import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import TextInputCustom from "@/components/TextInput/TextInputCustom";
import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useState } from "react";
import { apiRegister } from "@/service/api";
import Toast from "react-native-toast-message";

export default function RegisterView() {
  const { nomor } = useLocalSearchParams();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

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
    const data = {
      nomor: nomor as string,
      username: username,
    };

    try {
      setLoading(true);
      const response = await apiRegister({ data });
      console.log("Success register", JSON.stringify(response, null, 2));

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Sukses",
          text2: "Anda berhasil terdaftar",
        });
        router.replace("/(application)/(user)/waiting-room");
      }

      Toast.show({
        type: "info",
        text1: "Info",
        text2: response.message,
      });
    } catch (error: any) {
      console.log("Error register", error);
    } finally {
      setLoading(false);
    }
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

            <ButtonCustom isLoading={loading} onPress={handleRegister}>
              Daftar
            </ButtonCustom>
          </View>
        </View>
      </ViewWrapper>
    </>
  );
}
