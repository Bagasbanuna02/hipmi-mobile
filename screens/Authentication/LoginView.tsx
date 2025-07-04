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
    // console.log("fixNumber", fixNumber); 
    
    const randomAlfabet = Math.random().toString(36).substring(2, 8);
    const randomNumber = Math.floor(Math.random() * 1000000);
    const id = randomAlfabet + randomNumber + fixNumber;
    console.log("user id :", id);
    
    // router.navigate("/verification");
    router.navigate(`/(application)/profile/${id}`);
    // router.navigate("/(application)/home");
    // router.navigate(`/(application)/profile/${id}/edit`);

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

        <ButtonCustom onPress={handleLogin}>Login</ButtonCustom>
      </View>
    </ViewWrapper>
  );
}
