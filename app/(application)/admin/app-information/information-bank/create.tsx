import {
    BoxButtonOnFooter,
    ButtonCustom,
    StackCustom,
    TextInputCustom,
    ViewWrapper
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { router } from "expo-router";

export default function AdminAppInformation_BankCreate() {
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
          <AdminBackButtonAntTitle title="Tambah Daftar Bank" />

          <StackCustom>
            <TextInputCustom
              label="Nama Bank"
              placeholder="Masukan Nama Bank"
              required
            />

            <TextInputCustom
              label="Nama Rekening"
              placeholder="Masukan Nama Rekening"
              required
            />

            <TextInputCustom
              label="Nomor Rekening"
              placeholder="Masukan Nomor Rekening"
              required
            />
          </StackCustom>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
