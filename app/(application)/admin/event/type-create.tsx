import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { useRouter } from "expo-router";

export default function AdminEventTypeOfEventCreate() {
  const router = useRouter();
  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom onPress={() => router.back()}>Simpan</ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Tambah Tipe Acara" />}
        footerComponent={buttonSubmit}
      >
        <TextInputCustom placeholder="Masukkan Tipe Acara" />
      </ViewWrapper>
    </>
  );
}
