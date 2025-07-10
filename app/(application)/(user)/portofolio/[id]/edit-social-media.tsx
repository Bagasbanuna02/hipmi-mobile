import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { useLocalSearchParams, router } from "expo-router";

export default function PortofolioEditSocialMedia() {
  const { id } = useLocalSearchParams();

  const buttonFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          console.log(`Simpan sosmed ${id}`);
          router.back();
        }}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper footerComponent={buttonFooter}>
        <TextInputCustom label="Tiktok" placeholder="Masukkan tiktok" />
        <TextInputCustom label="Instagram" placeholder="Masukkan instagram" />
        <TextInputCustom label="Facebook" placeholder="Masukkan facebook" />
        <TextInputCustom label="Twitter" placeholder="Masukkan twitter" />
        <TextInputCustom label="Youtube" placeholder="Masukkan youtube" />
      </ViewWrapper>
    </>
  );
}
