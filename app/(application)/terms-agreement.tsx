import {
    BoxButtonOnFooter,
    ButtonCustom,
    CheckboxCustom,
    InformationBox,
    StackCustom,
    ViewWrapper
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { apiAcceptTermService, BASE_URL } from "@/service/api-config";
import { GStyles } from "@/styles/global-styles";
import { openBrowser } from "@/utils/openBrower";
import { Stack } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function TermsAgreement() {
  const { user, logout } = useAuth();
  const [term, setTerm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const url = BASE_URL;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await apiAcceptTermService({
        data: {
          id: user?.id as string,
          termsOfServiceAccepted: term,
        },
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: response.message,
        });

        return;
      }

      Toast.show({
        type: "success",
        text1: "Anda berhasil menerima syarat & ketentuan",
        text2: "Silahkan login kembali",
      });

      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const footerComponent = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={handleSubmit}
        disabled={!term}
        isLoading={isLoading}
      >
        Setuju
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Terms & Conditions",
        }}
      />
      <ViewWrapper footerComponent={footerComponent}>
        <StackCustom>
          <InformationBox text="Anda dialihkan ke halaman syarat & ketentuan, karena Anda belum menerima persetujuan syarat & ketentuan." />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              marginBottom: 16,
              paddingInline: 10,
            }}
          >
            <CheckboxCustom value={term} onChange={() => setTerm(!term)} />

            <Text style={GStyles.textLabel}>
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
            </Text>
          </View>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
