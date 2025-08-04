import {
    ButtonCenteredOnly,
    ButtonCustom,
    InformationBox,
    LandscapeFrameUploaded,
    Spacing,
    StackCustom,
    TextAreaCustom,
    ViewWrapper
} from "@/components";
import { router } from "expo-router";

export default function DonationEditStory() {
  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Cerita Anda adalah kunci untuk menginspirasi kebaikan. Jelaskan dengan jujur dan jelas tujuan penggalangan dana ini agar calon donatur memahami dampak positif yang dapat mereka wujudkan melalui kontribusi mereka." />
        <TextAreaCustom
          label="Pembukaan Cerita"
          placeholder="Masukkan pembukaan cerita"
          required
          showCount
          maxLength={1000}
        />

        <LandscapeFrameUploaded />
        <ButtonCenteredOnly
          onPress={() => {
            router.push("/(application)/(image)/take-picture/123");
          }}
          icon="upload"
        >
          Upload
        </ButtonCenteredOnly>
        <Spacing />
        <TextAreaCustom
          label="Tujuan Donasi"
          placeholder="Masukkan tujuan donasi"
          required
          showCount
          maxLength={1000}
        />

        <Spacing height={40} />
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
