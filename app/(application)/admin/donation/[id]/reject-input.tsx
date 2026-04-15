/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  TextAreaCustom,
} from "@/components";
import OS_Wrapper from "@/components/_ShareComponent/OS_Wrapper";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import { useAuth } from "@/hooks/use-auth";
import { funUpdateStatusDonation } from "@/screens/Admin/Donation/funDonationUpdateStatus";
import { apiAdminDonationDetailById } from "@/service/api-admin/api-admin-donation";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function AdminDonationRejectInput() {
  const { user } = useAuth();
  const { id, status } = useLocalSearchParams();

  const [data, setData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminDonationDetailById({
        id: id as string,
      });

      if (response.success) {
        setData(response.data.catatan);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setData(null);
    }
  };

  const handleReport = async ({
    changeStatus,
  }: {
    changeStatus: "publish" | "review" | "reject";
  }) => {
    try {
      if (!user?.id) {
        Toast.show({
          type: "error",
          text1: "User tidak ditemukan",
        });

        return;
      }

      setIsLoading(true);
      const response = await funUpdateStatusDonation({
        id: id as string,
        changeStatus,
        data: {
          senderId: user?.id as string,
          catatan: data,
        },
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Report gagal",
        });

        return;
      }

      Toast.show({
        type: "success",
        text1: "Report berhasil",
      });

      if (status === "review") {
        router.replace(`/admin/donation/reject/status`);
      } else if (status === "reject") {
        router.back();
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
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
              handleReport({ changeStatus: "reject" });
            },
          })
        }
      />
    </BoxButtonOnFooter>
  );

  return (
    <>
      <OS_Wrapper
        enableKeyboardHandling
        contentPaddingBottom={250}
        footerComponent={buttonSubmit}
        headerComponent={<AdminBackButtonAntTitle title="Penolakan Donasi" />}
      >
        <TextAreaCustom
          value={data}
          onChangeText={setData}
          placeholder="Masukan alasan"
          required
          showCount
          maxLength={1000}
        />
      </OS_Wrapper>
    </>
  );
}
