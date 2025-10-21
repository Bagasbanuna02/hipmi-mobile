/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import funUpdateStatusVoting from "@/screens/Admin/Voting/funUpdateStatus";
import { apiAdminVotingById } from "@/service/api-admin/api-admin-voting";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminVotingRejectInput() {
  const { id, status } = useLocalSearchParams();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminVotingById({
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
      const response = await funUpdateStatusVoting({
        id: id as string,
        changeStatus,
        data: data,
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
        router.replace(`/admin/voting/reject/status`);
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
        title="Reject"
        isLoading={isLoading}
        onReject={() =>
          AlertDefaultSystem({
            title: "Reject",
            message: "Apakah anda yakin ingin menolak data ini?",
            textLeft: "Batal",
            textRight: "Ya",
            onPressRight: () => handleUpdate({ changeStatus: "reject" }),
          })
        }
      />
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper
        footerComponent={buttonSubmit}
        headerComponent={<AdminBackButtonAntTitle title="Penolakan Voting" />}
      >
        <TextAreaCustom
          value={data}
          onChangeText={setData}
          placeholder="Masukan alasan"
          required
          showCount
          maxLength={1000}
        />
      </ViewWrapper>
    </>
  );
}
