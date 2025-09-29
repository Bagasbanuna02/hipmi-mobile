import {
  BaseBox,
  DummyLandscapeImage,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { View } from "react-native";

export default function Invesment_BoxDetailDataSection({
  title,
  imageId,
  data,
  bottomSection,
}: {
  title?: string;
  imageId?: string;
  data: any;
  bottomSection?: React.ReactNode;
}) {
  return (
    <>
      <BaseBox paddingBottom={0}>
        <StackCustom gap={"xs"}>
          <DummyLandscapeImage imageId={imageId} />
          <Spacing />
          <TextCustom align="center" size="xlarge" bold>
            {title || "Judul Investasi"}
          </TextCustom>
          <Spacing />

          {data?.map((item: any, index: any) => (
            <Grid key={index}>
              <Grid.Col span={4}>
                <TextCustom bold>{item.label}</TextCustom>
              </Grid.Col>
              <Grid.Col span={1}>
                <View />
              </Grid.Col>
              <Grid.Col span={7} style={{ justifyContent: "center" }}>
                <TextCustom>{item.value}</TextCustom>
              </Grid.Col>
            </Grid>
          ))}
          <Spacing />
          {bottomSection}
        </StackCustom>
      </BaseBox>
    </>
  );
}
