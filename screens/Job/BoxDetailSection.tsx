import {
  BaseBox,
  StackCustom,
  DummyLandscapeImage,
  TextCustom,
} from "@/components";

export default function Job_BoxDetailSection({ data }: { data: any }) {
  return (
    <>
      <BaseBox>
        <StackCustom gap={"lg"}>
          {data && data.imageId && (
            <DummyLandscapeImage imageId={data?.imageId} />
          )}

          <TextCustom align="center" bold size="large">
            {data?.title || "-"}
          </TextCustom>

          <StackCustom gap={"sm"}>
            <TextCustom bold>Syarat & Ketentuan :</TextCustom>
            <TextCustom>{data?.content || "-"}</TextCustom>
          </StackCustom>

          <StackCustom gap={"sm"}>
            <TextCustom bold>Deskripsi :</TextCustom>
            <TextCustom>{data?.deskripsi || "-"}</TextCustom>
          </StackCustom>
        </StackCustom>
      </BaseBox>
    </>
  );
}
