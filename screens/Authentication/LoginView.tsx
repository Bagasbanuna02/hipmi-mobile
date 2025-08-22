import ButtonCustom from "@/components/Button/ButtonCustom";
import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { apiVersion } from "@/service/api-config";
import { GStyles } from "@/styles/global-styles";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import Toast from "react-native-toast-message";

export default function LoginView() {
  const [version, setVersion] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { loginWithNomor, token, isAdmin, isUserActive } = useAuth();

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

  async function validateData() {
    if (inputValue.length === 0) {
      return Toast.show({
        type: "error",
        text1: "Masukan nomor anda",
      });
    }

    if (selectedCountry === null) {
      return Toast.show({
        type: "error",
        text1: "Pilih negara",
      });
    }

    if (inputValue.length < 9) {
      return Toast.show({
        type: "error",
        text1: "Nomor tidak valid",
      });
    }

    return true;
  }

  async function handleLogin() {
    const isValid = await validateData();
    if (!isValid) return;

    const callingCode = selectedCountry?.callingCode.replace(/^\+/, "") || "";
    const fixNumber = inputValue.replace(/\s+/g, "");
    const realNumber = callingCode + fixNumber;

    try {
      setLoading(true);
      // const response = await apiLogin({ nomor: realNumber });
      await loginWithNomor(realNumber);

      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Kode OTP berhasil dikirim",
      });

      router.navigate(`/verification?nomor=${realNumber}`);
    } catch (error) {
      console.log("Error login", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error as string,
      });
    } finally {
      setLoading(false);
    }
  }

  if (token && !isUserActive) {
    return <Redirect href={"/(application)/(user)/waiting-room"} />;
  }

  if (token && !isAdmin) {
    return <Redirect href={"/(application)/(user)/home"} />;
  }

  if (token && isAdmin) {
    return <Redirect href={"/(application)/admin/dashboard"} />;
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

        <ButtonCustom onPress={handleLogin} isLoading={loading}>
          Login
        </ButtonCustom>
        <Spacing />
        {/* <ButtonCustom onPress={() => router.navigate("/waiting-room")}>
          Admin ( Delete Soon )
        </ButtonCustom> */}
      </View>
    </ViewWrapper>
  );
}
