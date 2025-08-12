import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function AdminVotingRejectInput() {
  const { id } = useLocalSearchParams();
  const [value, setValue] = useState(id as string);
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
            onPressLeft: () => {
              router.back();
            },
            onPressRight: () => {
              console.log("value:", value);
              router.replace(`/admin/voting/reject/status`);
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
        headerComponent={<AdminBackButtonAntTitle title="Masukan Alasan" />}
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
