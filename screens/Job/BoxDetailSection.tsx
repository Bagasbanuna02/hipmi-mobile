import { BaseBox, StackCustom, DummyLandscapeImage, TextCustom } from "@/components";

export default function Job_BoxDetailSection({data}: {data: any}) {
    return (
      <>
        <BaseBox>
          <StackCustom gap={"lg"}>
            <DummyLandscapeImage />

            <TextCustom align="center" bold size="large">
              {data?.posisi}
            </TextCustom>

            <StackCustom gap={"sm"}>
              <TextCustom bold>Syarat & Ketentuan :</TextCustom>
              <TextCustom>{data?.syaratKetentuan}</TextCustom>
            </StackCustom>

            <StackCustom gap={"sm"}>
              <TextCustom bold>Deskripsi :</TextCustom>
              <TextCustom>{data?.deskripsi}</TextCustom>
            </StackCustom>
          </StackCustom>
        </BaseBox>
      </>
    );
}
    