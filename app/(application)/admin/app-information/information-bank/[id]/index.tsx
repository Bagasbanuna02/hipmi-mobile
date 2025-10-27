/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCustom,
  CenterCustom,
  Grid,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import {
  apiAdminMasterBankById,
  apiAdminMasterBankUpdate,
} from "@/service/api-admin/api-master-admin";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Switch } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminAppInformation_BankDetail() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [id])
  );

  const onLoadList = async () => {
    try {
      const response = await apiAdminMasterBankById({ id: id as string });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerUpdate = async () => {
    if (!data.namaBank || !data.namaAkun || !data.norek) {
      Toast.show({
        type: "error",
        text1: "Lengkapi Data",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await apiAdminMasterBankUpdate({
        id: id as string,
        data: data,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal update data",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Data berhasil di update",
        });
        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        disabled={!data?.namaBank || !data?.namaAkun || !data?.norek}
        isLoading={isLoading}
        onPress={() => handlerUpdate()}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={buttonSubmit}>
        <StackCustom>
          <AdminBackButtonAntTitle title="Update Bank" />

          <StackCustom>
            <Grid>
              <Grid.Col span={6}>
                <TextInputCustom
                  label="Nama Bank"
                  placeholder="Masukan Nama Bank"
                  required
                  value={data?.namaBank}
                  onChangeText={(value) =>
                    setData({ ...data, namaBank: value })
                  }
                />
              </Grid.Col>
              <Grid.Col span={6} style={{ alignItems: "center" }}>
                <TextCustom>Status Aktivasi</TextCustom>
                <CenterCustom>
                  <Switch
                    onValueChange={(value) =>
                      setData({ ...data, isActive: value })
                    }
                    color={MainColor.yellow}
                    value={data?.isActive}
                  />
                </CenterCustom>
              </Grid.Col>
            </Grid>

            <TextInputCustom
              label="Nama Rekening"
              placeholder="Masukan Nama Rekening"
              required
              value={data?.namaAkun}
              onChangeText={(value) => setData({ ...data, namaAkun: value })}
            />

            <TextInputCustom
              label="Nomor Rekening"
              placeholder="Masukan Nomor Rekening"
              required
              value={data?.norek}
              onChangeText={(value) => setData({ ...data, norek: value })}
            />
          </StackCustom>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
