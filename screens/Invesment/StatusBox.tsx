import { BaseBox, Grid, Spacing, TextCustom } from "@/components";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { Image } from "expo-image";
import { Href } from "expo-router";
import { View } from "react-native";

interface Investment_StatusBoxProps {
  id: string;
  status: string;
  href?: Href
}

export default function Investment_StatusBox({
  id,
  status,
  href
}: Investment_StatusBoxProps) {
  return (
    <BaseBox paddingTop={7} paddingBottom={7} href={href}>
      <Grid>
        <Grid.Col span={6}>
          <TextCustom truncate={2}>
            Title here : {status} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Omnis, exercitationem, sequi enim quod distinctio
            maiores laudantium amet, quidem atque repellat sit vitae qui aliquam
            est veritatis laborum eum voluptatum totam!
          </TextCustom>

          <Spacing />

          <TextCustom bold size="small">
            Target Dana:
          </TextCustom>
          <TextCustom>Rp. 7.500.000</TextCustom>
        </Grid.Col>
        <Grid.Col span={1}>
          <View />
        </Grid.Col>
        <Grid.Col span={5}>
          <Image
            source={DUMMY_IMAGE.background}
            style={{ width: "auto", height: 100, borderRadius: 10 }}
          />
        </Grid.Col>
      </Grid>
    </BaseBox>
  );
}
