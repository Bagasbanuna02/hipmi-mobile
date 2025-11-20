import {
  AlertDefaultSystem,
  BaseBox,
  ButtonCustom,
  CenterCustom,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiDeleteUser } from "@/service/api-client/api-user";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function DeleteAccount() {
  const { token, logout, user } = useAuth();
  const { phone } = useLocalSearchParams();
  const [text, setText] = useState("");
  const [isLoading, setLoading] = useState(false);

  const deleteAccount = async () => {
    if (text !== "Delete Account") {
      return Toast.show({
        type: "error",
        text1: "Ketik 'Delete Account' untuk menghapus akun",
      });
    }

    AlertDefaultSystem({
      title: "Anda yakin akan menghapus akun ini?",
      message:
        "Semua data yang pernah anda buat akan terhapus secara permanen !",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: async () => {
        try {
          setLoading(true);
          const response = await apiDeleteUser({ id: user?.id as string });

          if (response.success) {
            console.log("RESPONSE >> ", response);
            Toast.show({
              type: "success",
              text1: "Akun berhasil dihapus",
            });

            setTimeout(() => {
              logout();
              setLoading(false);
            }, 2000);
          } else {
            Toast.show({
              type: "error",
              text1: "Gagal menghapus akun",
            });
            setLoading(false);
          }
        } catch (error) {
          console.log("ERROR >> ", error);
          setLoading(false);
        }
      },
    });
  };

  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <BaseBox>
            <StackCustom>
              <CenterCustom>
                <Image
                  source={require("@/assets/images/constants/logo-hipmi.png")}
                  style={{
                    width: 150,
                    height: 150,
                  }}
                />
              </CenterCustom>
              <TextCustom align="center">
                Anda akan menghapus akun dengan nomor +{phone}
              </TextCustom>
              <TextCustom align="center">
                Ketik 'Delete Account' untuk menghapus akun
              </TextCustom>
              <TextInputCustom
                value={text}
                onChangeText={setText}
                placeholder="Ketik 'Delete Account'"
              />

              <ButtonCustom
                backgroundColor="red"
                textColor="white"
                onPress={deleteAccount}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Submit
              </ButtonCustom>
            </StackCustom>
          </BaseBox>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
