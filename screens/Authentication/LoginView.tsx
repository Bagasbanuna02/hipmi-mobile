import ButtonCustom from "@/components/Button/ButtonCustom";
import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { apiLogin, apiVersion } from "@/lib/api";
import { GStyles } from "@/styles/global-styles";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import Toast from "react-native-toast-message";

export default function LoginView() {
  const [version, setVersion] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    onLoadVersion();
  }, []);

  async function onLoadVersion() {
    const res = await apiVersion();
    setVersion(res.data);
  }

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  async function handleLogin() {
    const callingCode =
      selectedCountry?.callingCode.replace(/^\+/, "").trim() || "";
    const fixNumber = inputValue.replace(/\s+/g, "");
    const realNumber = callingCode + fixNumber;

    const response = await apiLogin({ nomor: realNumber });

    if (response.success) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login berhasil",
      });
      router.navigate(`/verification?kodeId=${response.kodeId}`);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: response.message,
      });
    }

    // const randomAlfabet = Math.random().toString(36).substring(2, 8);
    // const randomNumber = Math.floor(Math.random() * 1000000);
    // const id = randomAlfabet + randomNumber + fixNumber;
    // console.log("login user id :", id);

    // router.navigate("/verification");
    // router.replace("/(application)/coba");
    // router.navigate("/admin/dashboard")
  }

  return (
    <ViewWrapper withBackground>
      <View style={GStyles.authContainer}>
        <View>
          <View style={GStyles.authContainerTitle}>
            <Text style={GStyles.authSubTitle}>WELCOME TO</Text>
            <Spacing height={5} />
            <Text style={GStyles.authTitle}>HIPMI BADUNG APPS</Text>
            <Spacing height={5} />
          </View>
          <Spacing height={50} />
          <Text
            style={{
              position: "absolute",
              bottom: 35,
              right: 50,
              fontSize: 10,
              fontWeight: "thin",
              fontStyle: "italic",
              color: MainColor.white_gray,
            }}
          >
            {version} | powered by muku.id
          </Text>
        </View>

        <PhoneInput
          value={inputValue}
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          defaultCountry="ID"
          placeholder="Masukkan nomor"
        />

        <Spacing />

        <ButtonCustom onPress={handleLogin}>Login</ButtonCustom>
        <Spacing />

        {/* <ButtonCustom onPress={() => router.navigate("/admin/investment")}>
          Admin ( Delete Soon )
        </ButtonCustom> */}
      </View>
    </ViewWrapper>
  );
}
