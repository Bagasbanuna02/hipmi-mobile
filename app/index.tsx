/* eslint-disable @typescript-eslint/no-unused-vars */
import ButtonCustom from "@/components/Button/ButtonCustom";
import { TextInputCustom } from "@/components/TextInput/TextInputCustom";
import { MainColor } from "@/constants/color-palet";
import { styles } from "@/constants/styles";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const navigation = useNavigation();
  const assetBackground = require("../assets/images/main-background.png");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      edges={[]}
      style={{
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 2 }}>
        <ImageBackground
          source={assetBackground}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                height: "100%",
              }}
            >
              <View>
                <View style={stylesHome.container}>
                  {/* Teks "WELCOME TO" */}
                  <Text style={stylesHome.welcomeTo}>WELCOME TO</Text>

                  {/* Spacing antara "WELCOME TO" dan "HIPMI BADUNG APPS" */}
                  <View style={stylesHome.spacing} />

                  {/* Teks "HIPMI BADUNG APPS" */}
                  <Text style={stylesHome.hipmiBadungApps}>
                    HIPMI BADUNG APPS
                  </Text>

                  {/* Spacing antara "HIPMI BADUNG APPS" dan "powered by muku.id" */}
                  <View style={stylesHome.spacing} />
                </View>
                {/* Teks "powered by muku.id" */}
                <Text style={stylesHome.poweredBy}>powered by muku.id</Text>
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
                onPress={() => alert("Pressed!")}
                // iconLeft={<MaterialIcons name="login" size={20} color="#000" />}
              />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesHome = StyleSheet.create({
  container: {
    // backgroundColor: "#0A192F", // Warna latar belakang biru tua
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  welcomeTo: {
    fontSize: 22,
    color: MainColor.yellow, // Warna kuning
    fontWeight: "bold",
  },
  hipmiBadungApps: {
    fontSize: 27,
    color: MainColor.yellow, // Warna kuning
    fontWeight: "bold",
  },
  spacing: {
    height: 5, // Jarak antar teks
  },
  poweredBy: {
    position: "absolute",
    bottom: 30, // sesuaikan jarak dari bawah
    right: 20, // sesuaikan jarak dari kanan
    fontSize: 10,
    fontWeight: "thin",
    fontStyle: "italic",
    color: MainColor.white, // Warna putih
  },
});
