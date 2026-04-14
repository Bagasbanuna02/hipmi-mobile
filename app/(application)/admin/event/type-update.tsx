/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCustom,
  OS_Wrapper,
  Spacing,
  TextCustom,
  TextInputCustom,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import {
  apiAdminMasterTypeOfEventGetOne,
  apiAdminMasterTypeOfEventUpdate,
} from "@/service/api-admin/api-master-admin";

import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Switch } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminEventTypeOfEventUpdate() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [data, setData] = useState<{ name: string; active: boolean }>({
    name: "",
    active: false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminMasterTypeOfEventGetOne({
        id: id as string,
      });

      if (response.success) {
        setData({
          name: response.data.name,
          active: response.data.active,
        });
      }
    } catch (error) {
      console.log("[ERROR UPDATE]", error);
    }
  };

  const handlerSubmit = async () => {
    try {
      setLoading(true);

      const response = await apiAdminMasterTypeOfEventUpdate({
        id: id as string,
        data: data,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mengupdate tipe acara",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Berhasil mengupdate tipe acara",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR UPDATE]", error);
    } finally {
      setLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom isLoading={isLoading} onPress={() => handlerSubmit()}>
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <OS_Wrapper
      enableKeyboardHandling
      contentPaddingBottom={250}
      headerComponent={<AdminBackButtonAntTitle title="Ubah Tipe Acara" />}
      footerComponent={buttonSubmit}
    >
      <TextInputCustom
        placeholder="Masukkan Tipe Acara"
        value={data.name}
        onChangeText={(text) => setData({ ...data, name: text })}
      />

      <TextCustom>Aktivasi</TextCustom>
      <Spacing height={10} />
      <Switch
        color={MainColor.yellow}
        value={data.active}
        onValueChange={(value) => setData({ ...data, active: value })}
      />
    </OS_Wrapper>
  );
}
