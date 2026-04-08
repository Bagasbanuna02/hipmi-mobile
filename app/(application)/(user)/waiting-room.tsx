import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  ButtonCustom,
  InformationBox,
  OS_Wrapper,
  StackCustom
} from "@/components";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import { apiUser } from "@/service/api-client/api-user";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { RefreshControl } from "react-native";
import Toast from "react-native-toast-message";

export default function WaitingRoom() {
  const { token, isLoading, logout, userData } = useAuth();

  async function handleCheck() {
    try {
      const response = await userData(token as string);

      if (response.active) {
        const checkProfile = await apiUser(response.id);

        if (checkProfile?.data?.Profile) {
          Toast.show({
            type: "success",
            text1: "Akun anda telah aktif kembali", // text2: "Anda berhasil login",
          });
          router.replace(`/(application)/(user)/home`);
        } else {
          Toast.show({
            type: "success",
            text1: "Selamat ! Akun anda telah aktif", // text2: "Anda berhasil login",
          });
          router.replace(`/(application)/(user)/profile/create`);
        }

        // router.replace(`/(application)/(user)/profile/create`);
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
              });
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
      <OS_Wrapper
        footerComponent={logoutButton()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleCheck} />
        }
      >
        <StackCustom>
          <InformationBox
            text="Akun Anda sedang menunggu aktivasi.
Silakan tunggu beberapa saat. Untuk memperbarui status, tarik layar ke bawah."
          />
          {/* <ButtonCenteredOnly
            isLoading={isLoading}
            onPress={() => {
              handleCheck();
            }}
            icon="refresh-ccw"
          >
            Check
          </ButtonCenteredOnly> */}
        </StackCustom>
      </OS_Wrapper>
    </>
  );
}
