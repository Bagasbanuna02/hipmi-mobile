import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { apiEventCreateTypeOfEvent } from "@/service/api-admin/api-master-admin";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminEventTypeOfEventCreate() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handlerSubmit = async () => {
    try {
      setLoading(true);
      const response = await apiEventCreateTypeOfEvent({
        data: value,
      });


      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal menambahkan tipe acara",
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: "Berhasil menambahkan tipe acara",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR CREATE TYPE EVENT]", error);
    } finally {
      setLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom isLoading={isLoading} onPress={() => handlerSubmit()}>
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Tambah Tipe Acara" />}
        footerComponent={buttonSubmit}
      >
        <TextInputCustom
          placeholder="Masukkan Tipe Acara"
          value={value}
          onChangeText={setValue}
        />
      </ViewWrapper>
    </>
  );
}
