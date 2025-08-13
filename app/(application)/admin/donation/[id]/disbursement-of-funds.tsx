import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { router, useLocalSearchParams } from "expo-router";

export default function AdminDonationDisbursementOfFunds() {
  const { id } = useLocalSearchParams();
  const handleSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => {
          router.back();
        }}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <ViewWrapper
      headerComponent={<AdminBackButtonAntTitle title="Pencairan Dana" />}
      footerComponent={handleSubmit}
    >
      <BaseBox>
        <StackCustom gap="md">
          <TextCustom align="center" bold size="large">
            Dana Tersisa
          </TextCustom>
          <TextCustom align="center" bold size="large">
            Rp 1.000.000
          </TextCustom>
        </StackCustom>
      </BaseBox>

      <BaseBox>
        <TextCustom bold size="large" align="center">
          Form Pencairan Dana
        </TextCustom>
        <Spacing />
        <StackCustom gap={"xs"}>
          <TextInputCustom
            required
            keyboardType="numeric"
            label="Nominal"
            placeholder="0"
            iconLeft={"Rp"}
          />

          <TextInputCustom required label="Judul" placeholder="Masukan judul" />

          <TextAreaCustom
            required
            label="Deskripsi"
            placeholder="Masukan deskripsi"
            showCount
            maxLength={500}
          />
        </StackCustom>
      </BaseBox>
      <InformationBox text="Wajib menyertakan bukti transfer" />

      <ButtonCenteredOnly
        onPress={() => {
          router.push(`/(application)/(image)/take-picture/${id}`);
        }}
        icon="upload"
      >
        Upload
      </ButtonCenteredOnly>
      <Spacing />
    </ViewWrapper>
  );
}
