import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  StackCustom,
  ViewWrapper,
} from "@/components";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function WaitingRoom() {
  const { token, userData, isLoading, logout } = useAuth();

  async function handleCheck() {
    try {
      const response = await userData(token as string);
      console.log("response check", JSON.stringify(response, null, 2));
      if (response.active) {
        Toast.show({
          type: "success",
          text1: "Akun anda telah aktif", // text2: "Anda berhasil login",
        });
        router.replace("/(application)/(user)/home");
      } else {
        Toast.show({
          type: "error",
          text1: "Akun anda belum aktif",
          text2: "Silahkan hubungi admin",
        });
      }
    } catch (error) {
      console.log("Error check", error);
    }
  }

  const logoutButton = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom
            backgroundColor="red"
            textColor="white"
            iconLeft={
              <Ionicons name="log-out" size={ICON_SIZE_BUTTON} color="white" />
            }
            onPress={() => {
              AlertDefaultSystem({
                title: "Keluar",
                message: "Apakah anda yakin ingin keluar?",
                textLeft: "Batal",
                textRight: "Ya",
                onPressRight: () => {
                  logout();
                },
              })
            }}
          >
            Keluar
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  };

  return (
    <>
      <ViewWrapper footerComponent={logoutButton()}>
        <StackCustom>
          <InformationBox text="Permohonan akses Anda sedang dalam proses verifikasi oleh admin. Harap tunggu, Anda akan menerima pemberitahuan melalui Whatsapp setelah disetujui." />
          <ButtonCenteredOnly
            isLoading={isLoading}
            onPress={() => {
              handleCheck();
            }}
            icon="refresh-ccw"
          >
            Check
          </ButtonCenteredOnly>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
