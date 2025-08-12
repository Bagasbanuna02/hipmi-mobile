import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AdminEventTypeOfEventUpdate() {
  const { id } = useLocalSearchParams();
  console.log("id >", id);

  const router = useRouter();
  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom onPress={() => router.back()}>Update</ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Ubah Tipe Acara" />}
        footerComponent={buttonSubmit}
      >
        <TextInputCustom placeholder="Masukkan Tipe Acara" value="" />
      </ViewWrapper>
    </>
  );
}
