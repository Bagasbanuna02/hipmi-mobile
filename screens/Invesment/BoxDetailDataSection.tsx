import {
  AvatarUsernameAndOtherComponent,
  BaseBox,
  BoxWithHeaderSection,
  DummyLandscapeImage,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { View } from "react-native";

export default function Invesment_BoxDetailDataSection({
  title,
  author,
  imageId,
  data,
  bottomSection,
}: {
  title?: string;
  author?: any;
  imageId?: string;
  data: any;
  bottomSection?: React.ReactNode;
}) {

  return (
    <>
      <BoxWithHeaderSection>
        <StackCustom gap={"xs"}>
          {author && (
            <AvatarUsernameAndOtherComponent
              avatar={author?.Profile?.imageId}
              name={author?.username}
              rightComponent={""}
              withBottomLine={true}
            />
          )}
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
      </BoxWithHeaderSection>
    </>
  );
}
