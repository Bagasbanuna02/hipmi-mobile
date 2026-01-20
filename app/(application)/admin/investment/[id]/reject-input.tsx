/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import { useAuth } from "@/hooks/use-auth";
import {
  apiAdminInvestasiUpdateByStatus,
  apiAdminInvestmentDetailById,
} from "@/service/api-admin/api-admin-investment";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminInvestmentRejectInput() {
  const { user } = useAuth();
  const { id, status } = useLocalSearchParams();
  console.log("[STATUS]", status);
  const [value, setValue] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminInvestmentDetailById({ id: id as string });
      console.log("[DATA]", JSON.stringify(response, null, 2));
      if (response.success) {
        setValue(response.data?.catatan);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmit = async () => {
    if (!value) {
      Toast.show({
        type: "error",
        text1: "Harap masukan alasan penolakan",
      });
      return;
    }

    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "User tidak ditemukan",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await apiAdminInvestasiUpdateByStatus({
        id: id as string,
        status: "reject",
        data: {
          catatan: value,
          senderId: user?.id as string,
        },
      });

      console.log("[RESPONSE]", JSON.stringify(response, null, 2));

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal melakukan report",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Berhasil melakukan report",
      });

      if (status === "review") {
        router.replace(`/admin/investment/reject/status`);
      } else {
        router.back();
      }
    } catch (error) {
      console.error(["ERROR"], error);
    } finally {
      setLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <AdminButtonReject
        isLoading={isLoading}
        title="Reject"
        onReject={() =>
          AlertDefaultSystem({
            title: "Reject",
            message: "Apakah anda yakin ingin menolak data ini?",
            textLeft: "Batal",
            textRight: "Ya",
            onPressRight: () => {
              handlerSubmit();
            },
          })
        }
      />
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper
        footerComponent={buttonSubmit}
        headerComponent={
          <AdminBackButtonAntTitle title="Penolakan Investasi" />
        }
      >
        <TextAreaCustom
          value={value}
          onChangeText={setValue}
          placeholder="Masukan alasan"
          required
          showCount
          maxLength={1000}
        />
      </ViewWrapper>
    </>
  );
}
