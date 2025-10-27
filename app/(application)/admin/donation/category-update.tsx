import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

export default function AdminDonationCategoryUpdate() {
  const { id } = useLocalSearchParams();
  const [value, setValue] = useState(id);

  const router = useRouter();
  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom onPress={() => router.back()}>Update</ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Ubah Kategori" />}
        footerComponent={buttonSubmit}
      >
        <TextInputCustom
          placeholder="Masukkan Kategori"
          value={value as any}
          onChangeText={setValue}
        />
      </ViewWrapper>
    </>
  );
}
