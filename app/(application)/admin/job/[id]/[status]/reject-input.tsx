/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import funUpdateStatusJob from "@/screens/Admin/Job/funUpdateStatus";
import { apiAdminJobGetById } from "@/service/api-admin/api-admin-job";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminJobRejectInput() {
  const { id, status } = useLocalSearchParams();
  const [data, setData] = useState({
    catatan: "",
    senderId: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminJobGetById({
        id: id as string,
      });

      if (response.success) {
        setData(response.data.catatan);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handleUpdate = async ({
    changeStatus,
  }: {
    changeStatus: "publish" | "review" | "reject";
  }) => {
    try {
      setIsLoading(true);
      const response = await funUpdateStatusJob({
        id: id as string,
        changeStatus,
        data: data ,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Report gagal",
        });
      }

      Toast.show({
        type: "success",
        text1: "Report berhasil",
      });

      if (status === "review") {
        router.replace(`/admin/job/reject/status`);
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
        title="Report"
        onReject={() =>
          AlertDefaultSystem({
            title: "Reject",
            message: "Apakah anda yakin ingin menolak data ini?",
            textLeft: "Batal",
            textRight: "Ya",
            onPressRight: () => {
              handleUpdate({ changeStatus: "reject" });
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
        headerComponent={<AdminBackButtonAntTitle title="Penolakan Job" />}
      >
        <TextAreaCustom
          value={data?.catatan}
          onChangeText={(text) => setData({ ...data, catatan: text })}
          placeholder="Masukan alasan"
          required
          showCount
          maxLength={1000}
        />
      </ViewWrapper>
    </>
  );
}
