import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import { apiAdminCollaborationReject } from "@/service/api-admin/api-admin-collaboration";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function AdminCollaborationRejectInput() {
  const { id } = useLocalSearchParams();
  const [value, setValue] = useState("");

  const handlerReject = async () => {
    console.log("value:", value);
    // router.replace(`/admin/job/reject/status`);
    try {
      const response = await apiAdminCollaborationReject({
        id: id as string,
        data: value,
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

      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <AdminButtonReject
        title="Reject"
        onReject={() =>
          AlertDefaultSystem({
            title: "Reject",
            message: "Apakah anda yakin ingin menolak data ini?",
            textLeft: "Batal",
            textRight: "Ya",
            onPressRight: () => {
              handlerReject();
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
          <AdminBackButtonAntTitle title="Penolakan Collaboration" />
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
