/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCustom,
  OS_Wrapper,
  StackCustom,
  TextCustom,
  TextInputCustom,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import {
  apiAdminMasterBusinessFieldById,
  apiAdminMasterBusinessFieldUpdate,
} from "@/service/api-admin/api-master-admin";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Switch } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminAppInformation_BusinessFieldDetail() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadDetail();
    }, [id])
  );

  const onLoadDetail = async () => {
    try {
      const response = await apiAdminMasterBusinessFieldById({
        id: id as string,
        category: "sub-bidang",
        subBidangId: id as string,
      });

      console.log("Response >>", JSON.stringify(response, null, 2));




      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
      setData(null);
    }
  };

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
      const response = await apiAdminMasterBusinessFieldUpdate({
        id: id as string,
        data: data,
        category: "sub-bidang",
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal update data",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Data berhasil di update",
      });
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        disabled={!data?.name}
        isLoading={isLoading}
        onPress={() => handlerSubmit()}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <OS_Wrapper enableKeyboardHandling contentPaddingBottom={250} footerComponent={buttonSubmit}>
        <StackCustom>
          <AdminBackButtonAntTitle title="Update Bidang Bisnis" />

          <TextInputCustom
            label="Nama Bidang Bisnis"
            placeholder="Masukan Nama Bidang Bisnis"
            required
            value={data?.name}
            onChangeText={(value) => setData({ ...data, name: value })}
          />

          <StackCustom
            gap={"sm"}
            style={{
              alignContent: "flex-start",
            }}
          >
            <TextCustom>Status</TextCustom>

            <Switch
              style={{
                alignSelf: "flex-start",
              }}
              color={MainColor.yellow}
              value={data?.isActive}
              onValueChange={(value) => setData({ ...data, isActive: value })}
            />
          </StackCustom>
        </StackCustom>
      </OS_Wrapper>
    </>
  );
}
