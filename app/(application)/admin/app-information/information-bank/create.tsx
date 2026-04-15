import {
  BoxButtonOnFooter,
  ButtonCustom,
  OS_Wrapper,
  StackCustom,
  TextInputCustom,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { apiAdminMasterBankCreate } from "@/service/api-admin/api-master-admin";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminAppInformation_BankCreate() {
  const [data, setData] = useState<any>({
    namaBank: "",
    namaAkun: "",
    norek: "",
  });

  const [isLoading, setLoading] = useState(false);

  const handlerSubmit = async () => {
    try {
      setLoading(true);
      const response = await apiAdminMasterBankCreate({ data: data });

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
      setLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom isLoading={isLoading} onPress={handlerSubmit}>
        Tambah
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <OS_Wrapper enableKeyboardHandling contentPaddingBottom={250} footerComponent={buttonSubmit}>
        <StackCustom>
          <AdminBackButtonAntTitle title="Tambah Daftar Bank" />

          <StackCustom>
            <TextInputCustom
              label="Nama Bank"
              placeholder="Masukan Nama Bank"
              required
              value={data.namaBank}
              onChangeText={(value) => setData({ ...data, namaBank: value })}
            />

            <TextInputCustom
              label="Nama Rekening"
              placeholder="Masukan Nama Rekening"
              required
              value={data.namaAkun}
              onChangeText={(value) => setData({ ...data, namaAkun: value })}
            />

            <TextInputCustom
              keyboardType="numeric"
              label="Nomor Rekening"
              placeholder="Masukan Nomor Rekening"
              required
              value={data.norek}
              onChangeText={(value) => setData({ ...data, norek: value })}
            />
          </StackCustom>
        </StackCustom>
      </OS_Wrapper>
    </>
  );
}
