import {
  BoxButtonOnFooter,
  ButtonCustom,
  StackCustom,
  TextCustom,
  TextInputCustom,
} from "@/components";
import OS_Wrapper from "@/components/_ShareComponent/OS_Wrapper";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import { apiAdminMasterDonationCategoryCreate } from "@/service/api-admin/api-master-admin";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Switch } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminDonationCategoryCreate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    active: false,
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await apiAdminMasterDonationCategoryCreate({ data });
      if (response.success) {
        Toast.show({
          type: "success",
          text2: "Data berhasil disimpan",
        });
        router.back();
        return;
      }

      Toast.show({
        type: "error",
        text1: "Gagal menyimpan data",
      });
    } catch (error) {
      console.log("[Error]", error);
    } finally {
      setLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom isLoading={loading} onPress={onSubmit}>
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <OS_Wrapper
        enableKeyboardHandling
        contentPaddingBottom={250}
        headerComponent={<AdminBackButtonAntTitle title="Tambah Kategori" />}
        footerComponent={buttonSubmit}
      >
        <TextInputCustom
          label=""
          placeholder="Masukkan Kategori"
          value={data.name}
          onChangeText={(text) => setData({ ...data, name: text })}
        />
        <StackCustom gap={"sm"}>
          <TextCustom>Status</TextCustom>
          <Switch
            style={{
              alignSelf: "flex-start",
            }}
            color={MainColor.yellow}
            value={data.active}
            onValueChange={(value) => setData({ ...data, active: value })}
          />
        </StackCustom>
      </OS_Wrapper>
    </>
  );
}
