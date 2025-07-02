import ButtonCustom from "@/components/Button/ButtonCustom";
import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";


export default function LoginView() {
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>("");

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  function handleLogin() {
    const callingCode = selectedCountry?.callingCode.replace(/^\+/, "") || "";
    const fixNumber = callingCode + inputValue;
    console.log(fixNumber);
    router.navigate("/(application)/profile/1");
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
              bottom: 30,
              right: 20,
              fontSize: 10,
              fontWeight: "thin",
              fontStyle: "italic",
              color: MainColor.white,
            }}
          >
            powered by muku.id
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

        <Spacing height={20} />

        <ButtonCustom
          title="Login"
          backgroundColor={MainColor.yellow}
          textColor={MainColor.black}
          radius={10}
          onPress={handleLogin}
        />
      </View>
    </ViewWrapper>
  );
}
