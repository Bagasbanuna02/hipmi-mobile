import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import TextInputCustom from "@/components/TextInput/TextInputCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { BASE_URL } from "@/service/api-config";
import { GStyles } from "@/styles/global-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RegisterView() {
  const { nomor } = useLocalSearchParams();
  const [username, setUsername] = useState("");
  // const [term, setTerm] = useState(false);
  const url = BASE_URL;
  const { registerUser, isLoading } = useAuth();

  const validasiData = () => {
    if (!nomor) {
      Toast.show({
        type: "error",
        text1: "Lengkapi nomor",
      });
      return false;
    }
    if (!username) {
      Toast.show({
        type: "error",
        text1: "Username tidak boleh kosong",
      });
      return false;
    }

    if (username.includes(" ")) {
      Toast.show({
        type: "info",
        text1: "Username tidak boleh mengandung spasi",
      });
      return false;
    }
    return true;
  };

  async function handleRegister() {
    const isValid = validasiData();
    if (!isValid) return;

    if (username.length < 5) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Username minimal 5 karakter",
      });
      return;
    }

    const usernameLower = username.toLowerCase();

    await registerUser({
      nomor: nomor as string,
      username: usernameLower,
      termsOfServiceAccepted: true,
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
              error={
                username.includes(" ")
                  ? "Username tidak boleh mengandung spasi"
                  : ""
              }
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
                // marginBottom: 16,
              }}
            >
              {/* <CheckboxCustom value={term} onChange={() => setTerm(!term)} /> */}

              {/* <Text style={GStyles.textLabel}>
                Saya setuju dengan{" "}
                <Text
                  style={{
                    color: MainColor.yellow,
                    textDecorationLine: "underline",
                  }}
                  onPress={() => {
                    const toUrl = `${url}/terms-of-service.html`;
                    openBrowser(toUrl);
                  }}
                >
                  Syarat & Ketentuan
                </Text>{" "}
                yang melarang konten tidak pantas dan perilaku merugikan.
              </Text> */}
            </View>

            <ButtonCustom
              disabled={isLoading}
              isLoading={isLoading}
              onPress={handleRegister}
            >
              Daftar
            </ButtonCustom>
          </View>
        </View>
      </ViewWrapper>
    </>
  );
}
