import {
  BaseBox,
  TextCustom,
  Spacing,
  StackCustom,
  DummyLandscapeImage,
} from "@/components";

export default function AdminDonation_BoxOfDonationStory() {
  return (
    <>
      <BaseBox>
        <TextCustom bold>Cerita Penggalang Dana</TextCustom>
        <Spacing />

        <StackCustom>
          <TextCustom>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem magni
            perspiciatis eius ipsam provident, impedit, fugiat aliquid nobis
            pariatur asperiores fuga quidem temporibus labore, molestias
            perferendis optio ipsum. Praesentium, tempore?
          </TextCustom>
          <DummyLandscapeImage />
          <TextCustom>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem magni
            perspiciatis eius ipsam provident, impedit, fugiat aliquid nobis
            pariatur asperiores fuga quidem temporibus labore, molestias
            perferendis optio ipsum. Praesentium, tempore?
          </TextCustom>
        </StackCustom>
      </BaseBox>
    </>
  );
}
