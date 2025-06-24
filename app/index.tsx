import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { MainColor } from "@/constants/color-palet";
import { globalStyles } from "@/constants/global-styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";

export default function Login() {
  const router = useRouter();

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
    router.push("/verification");
  }

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
            <Text style={globalStyles.authSubTitle}>WELCOME TO</Text>
            <Spacing height={5} />
            <Text style={globalStyles.authTitle}>HIPMI BADUNG APPS</Text>
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

        {/* Input dengan prefix teks */}
        {/* <TextInputCustom
          label="Nomor Telepon"
          placeholder="Masukkan nomor"
          value={phone}
          onChangeText={setPhone}
          iconLeft="+62"
          keyboardType="phone-pad"
        /> */}

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
