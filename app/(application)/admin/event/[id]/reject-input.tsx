/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  OS_Wrapper,
  TextAreaCustom,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import { useAuth } from "@/hooks/use-auth";
import { funUpdateStatusEvent } from "@/screens/Admin/Event/funUpdateStatus";
import { apiAdminEventById } from "@/service/api-admin/api-admin-event";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminEventRejectInput() {
  const { user } = useAuth();
  const { id, status } = useLocalSearchParams();

  const [data, setData] = useState<any>({
    catatan: "",
    senderId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );
  const onLoadData = async () => {
    try {
      const response = await apiAdminEventById({
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

      const newData = {
        catatan: data,
        senderId: user?.id as string,
      };

      const response = await funUpdateStatusEvent({
        id: id as string,
        changeStatus,
        data: newData,
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
        router.replace(`/admin/event/reject/status`);
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
              handleUpdate({ changeStatus: "reject" });
            },
          })
        }
      />
    </BoxButtonOnFooter>
  );

  return (
    <OS_Wrapper
      enableKeyboardHandling
      contentPaddingBottom={250}
      footerComponent={buttonSubmit}
      headerComponent={<AdminBackButtonAntTitle title="Penolakan Event" />}
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
  );
}
