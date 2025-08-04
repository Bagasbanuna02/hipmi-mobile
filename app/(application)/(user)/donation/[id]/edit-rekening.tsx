import { ViewWrapper, StackCustom, InformationBox, TextInputCustom, Spacing, ButtonCustom } from "@/components";
import { router } from "expo-router";

export default function DonationEditRekening() {
  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Pastikan Anda mengisi nama bank dan nomor rekening dengan benar. Informasi ini akan membantu admin memverifikasi dan memproses penggalangan dana Anda dengan cepat dan tepat setelah penggalangan dana dipublikasikan." />
        <TextInputCustom
          label="Nama Bank"
          placeholder="Masukkan nama bank"
          required
        />
        <TextInputCustom
          label="Nomor Rekening"
          placeholder="Masukkan nomor rekening"
          required
        />

        <Spacing />
        <ButtonCustom
          onPress={() => {
            router.back();
          }}
        >
          Update
        </ButtonCustom>
      </StackCustom>
      <Spacing />
    </ViewWrapper>
  );
}