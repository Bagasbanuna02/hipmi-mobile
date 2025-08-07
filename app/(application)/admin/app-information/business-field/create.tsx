import {
    BoxButtonOnFooter,
    ButtonCustom,
    StackCustom,
    TextInputCustom,
    ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { router } from "expo-router";

export default function AdminAppInformation_BusinessFieldCreate() {
  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => router.back()}
      >
        Tambah
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={buttonSubmit}>
        <StackCustom>
          <AdminBackButtonAntTitle title="Tambah Bidang Bisnis" />

          <TextInputCustom
            label="Nama Bidang Bisnis"
            placeholder="Masukan Nama Bidang Bisnis"
            required
          />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
