import {
    BoxButtonOnFooter,
    ButtonCustom,
    StackCustom,
    TextInputCustom,
    ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { apiAdminMasterBusinessFieldCreate } from "@/service/api-admin/api-master-admin";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminAppInformation_BusinessFieldCreate() {
  const [data, setData] = useState<any>({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlerSubmit = async () => {
    if (!data.name) {
      Toast.show({
        type: "error",
        text1: "Lengkapi Data",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await apiAdminMasterBusinessFieldCreate({ data: data });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Data berhasil di tambah",
        });
        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
      Toast.show({
        type: "error",
        text1: "Gagal tambah data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => handlerSubmit()}
        isLoading={isLoading}
      >
        Tambah
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={buttonSubmit}>
        <StackCustom>
          <AdminBackButtonAntTitle title="Tambah Bidang Bisnis" />

          <TextInputCustom
            label="Nama Bidang Bisnis"
            placeholder="Masukan Nama Bidang Bisnis"
            required
            value={data.name}
            onChangeText={(value) => setData({ ...data, name: value })}
          />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
