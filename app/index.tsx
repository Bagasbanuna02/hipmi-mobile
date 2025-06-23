import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { TextInputCustom } from "@/components/TextInput/TextInputCustom";
import { MainColor } from "@/constants/color-palet";
import { globalStyles } from "@/constants/global-styles";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
        <TextInputCustom
          label="Nomor Telepon"
          placeholder="Masukkan nomor"
          value={phone}
          onChangeText={setPhone}
          iconLeft="+62"
          keyboardType="phone-pad"
        />

        <ButtonCustom
          title="Login"
          backgroundColor={MainColor.yellow}
          textColor={MainColor.black}
          radius={10}
          onPress={() => router.push("/verification")}
        />
      </View>
    </ViewWrapper>
  );
}
