import { NewWrapper, TextCustom } from "@/components";
import ButtonCustom from "@/components/Button/ButtonCustom";
import ModalReactNative from "@/components/Modal/ModalReactNative";
import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { apiVersion, BASE_URL } from "@/service/api-config";
import { GStyles } from "@/styles/global-styles";
import { openBrowser } from "@/utils/openBrower";
import versionBadge from "@/utils/viersionBadge";
import VersionBadge from "@/utils/viersionBadge";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, RefreshControl, Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import Toast from "react-native-toast-message";
import EULASection from "./EULASection";

export default function LoginView() {
  const url = BASE_URL;
  const [version, setVersion] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberToEULA, setNumberToEULA] = useState<string>("");

  const { loginWithNomor, token, isAdmin, isUserActive } = useAuth();

  useEffect(() => {
    onLoadVersion();
  }, []);

  async function onLoadVersion() {
    const res = await apiVersion();

    if (res.success) {
      setVersion(versionBadge());
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await onLoadVersion();
    setInputValue("");
    setLoading(false);
    setRefreshing(false);
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
    let fixNumber = inputValue.replace(/\s+/g, "").replace(/^0+/, "");

    const realNumber = callingCode + fixNumber;
    

    try {
      setLoading(true);
      const loginRes = await loginWithNomor(realNumber);

      if (!loginRes) {
        setModalVisible(true);
      }

      setNumberToEULA(realNumber);
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

  if (token && token !== "" && !isUserActive) {
    return <Redirect href={"/(application)/(user)/waiting-room"} />;
  }

  if (token && token !== "" && !isAdmin) {
    return <Redirect href={"/(application)/(user)/home"} />;
  }

  if (token && token !== "" && isAdmin) {
    // Akan di aktifkan jika sudah losos review
    // return <Redirect href={"/(application)/admin/dashboard"} />;

    // Sementara gunakan ini
    return <Redirect href={"/(application)/(user)/home"} />;
  }

  return (
    <NewWrapper
      withBackground
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
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
        <Spacing height={50} />

        {/* <ButtonCustom
          onPress={() => {
            setModalVisible(true);
            console.log("Show modal", modalVisible);
          }}
        >
          Show Modal
        </ButtonCustom> */}
        {/* <CheckboxCustom value={term} onChange={() => setTerm(!term)} /> */}

        <Text
          style={{ ...GStyles.textLabel, textAlign: "center", fontSize: 12 }}
        >
          Dengan menggunakan aplikasi ini, Anda telah menyetujui{" "}
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
          dan seluruh kebijakan privasi yang berlaku.
        </Text>
      </View>

      <ModalReactNative isVisible={modalVisible}>
        <EULASection nomor={numberToEULA || ""} onSetModalVisible={setModalVisible} />
      </ModalReactNative>
    </NewWrapper>
  );
}
