/* eslint-disable react-hooks/exhaustive-deps */
import {
  OS_Wrapper,
  StackCustom,
  InformationBox,
  TextInputCustom,
  Spacing,
  ButtonCustom,
} from "@/components";
import {
  apiDonationGetOne,
  apiDonationUpdateData,
} from "@/service/api-client/api-donation";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function DonationEditRekening() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({
    namaBank: "",
    rekening: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetOne({
        id: id as string,
        category: "permanent",
      });

      const resData = response.data;
      console.log("[RESPONSE]", JSON.stringify(resData, null, 2));

      setData({
        namaBank: resData.namaBank,
        rekening: resData.rekening,
      });
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlerSubmitUpdate = async () => {
    try {
      setLoading(true);

      const response = await apiDonationUpdateData({
        id: id as string,
        data: data,
        category: "edit-bank-account",
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mengupdate data bank",
        });
      }

      Toast.show({
        type: "success",
        text1: "Data bank berhasil diupdate",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OS_Wrapper enableKeyboardHandling contentPaddingBottom={250}>
      <StackCustom gap={"xs"}>
        <InformationBox text="Pastikan Anda mengisi nama bank dan nomor rekening dengan benar. Informasi ini akan membantu admin memverifikasi dan memproses penggalangan dana Anda dengan cepat dan tepat setelah penggalangan dana dipublikasikan." />
        <TextInputCustom
          label="Nama Bank"
          placeholder="Masukkan nama bank"
          required
          value={data.namaBank}
          onChangeText={(value) => setData({ ...data, namaBank: value })}
        />
        <TextInputCustom
          label="Nomor Rekening"
          placeholder="Masukkan nomor rekening"
          required
          value={data.rekening}
          onChangeText={(value) => setData({ ...data, rekening: value })}
        />

        <Spacing />
        <ButtonCustom
          isLoading={isLoading}
          onPress={() => {
            handlerSubmitUpdate();
          }}
        >
          Update
        </ButtonCustom>
      </StackCustom>
      <Spacing />
    </OS_Wrapper>
  );
}
