import { NewWrapper, PhoneInputCustom, ViewWrapper } from "@/components";
import ButtonCustom from "@/components/Button/ButtonCustom";
import ModalReactNative from "@/components/Modal/ModalReactNative";
import Spacing from "@/components/_ShareComponent/Spacing";
import { MainColor } from "@/constants/color-palet";
import { DEFAULT_COUNTRY, type CountryData } from "@/constants/countries";
import { useAuth } from "@/hooks/use-auth";
import { apiVersion, BASE_URL } from "@/service/api-config";
import { GStyles } from "@/styles/global-styles";
import { openBrowser } from "@/utils/openBrower";
import versionBadge from "@/utils/viersionBadge";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, RefreshControl, Text, View } from "react-native";
import { parsePhoneNumber } from "libphonenumber-js";
import Toast from "react-native-toast-message";
import EULASection from "./EULASection";

export default function LoginView() {
  const url = BASE_URL;
  const [version, setVersion] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberToEULA, setNumberToEULA] = useState<string>("");
  const [loadingTerm, setLoadingTerm] = useState<boolean>(false);

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
    setPhoneNumber("");
    setSelectedCountry(DEFAULT_COUNTRY);
    setLoading(false);
    setRefreshing(false);
  }

  async function validateData() {
    if (phoneNumber.length === 0) {
      return Toast.show({
        type: "error",
        text1: "Masukan nomor anda",
      });
    }

    if (phoneNumber.length < 9) {
      return Toast.show({
        type: "error",
        text1: "Nomor tidak valid",
      });
    }

    // Validate with libphonenumber-js
    try {
      const parsedNumber = parsePhoneNumber(phoneNumber, selectedCountry.code);
      if (!parsedNumber || !parsedNumber.isValid()) {
        return Toast.show({
          type: "error",
          text1: "Nomor tidak valid",
        });
      }
    } catch (error) {
      return Toast.show({
        type: "error",
        text1: "Format nomor tidak valid",
      });
    }

    return true;
  }

  async function handleLogin() {
    const isValid = await validateData();
    if (!isValid) return;

    // Format phone number with country code
    const callingCode = selectedCountry.callingCode;
    let fixNumber = phoneNumber.replace(/\s+/g, "").replace(/^0+/, "");

    // Remove country code if already present
    if (fixNumber.startsWith(callingCode)) {
      fixNumber = fixNumber.substring(callingCode.length);
    }

    // Remove leading zero
    fixNumber = fixNumber.replace(/^0+/, "");

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
      style={{ flex: 1 }}
    >
      <ViewWrapper
        withBackground
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={[GStyles.authContainer, { paddingBottom: 40 }]}>
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

          <Spacing height={20} />

          <PhoneInputCustom
            value={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            selectedCountry={selectedCountry}
            onChangeCountry={setSelectedCountry}
            placeholder="Masukkan nomor"
          />

          <Spacing />

          <ButtonCustom
            onPress={handleLogin}
            disabled={loadingTerm}
            isLoading={loading || loadingTerm}
          >
            Login
          </ButtonCustom>
          <Spacing height={50} />

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
      </ViewWrapper>

      <ModalReactNative isVisible={modalVisible}>
        <EULASection
          nomor={numberToEULA || ""}
          onSetModalVisible={setModalVisible}
          setLoadingTerm={setLoadingTerm}
        />
      </ModalReactNative>
    </KeyboardAvoidingView>
  );
}
