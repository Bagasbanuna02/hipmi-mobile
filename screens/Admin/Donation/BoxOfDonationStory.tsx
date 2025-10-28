import {
  BaseBox,
  TextCustom,
  Spacing,
  StackCustom,
  DummyLandscapeImage,
} from "@/components";

export default function AdminDonation_BoxOfDonationStory({
  data,
}: {
  data: any;
}) {
  return (
    <>
      <BaseBox>
        <TextCustom bold>Cerita Penggalang Dana</TextCustom>
        <Spacing />

        <StackCustom>
          <TextCustom>{(data && data?.pembukaan) || "-"}</TextCustom>
          <DummyLandscapeImage imageId={data?.imageId || "-"} />
          <TextCustom>{(data && data?.cerita) || "-"}</TextCustom>
        </StackCustom>
      </BaseBox>
    </>
  );
}
