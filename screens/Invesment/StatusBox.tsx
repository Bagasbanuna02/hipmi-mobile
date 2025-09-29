import { BaseBox, Grid, Spacing, TextCustom } from "@/components";
import API_IMAGE from "@/constants/api-storage";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { Image } from "expo-image";
import { Href } from "expo-router";
import { View } from "react-native";

interface Investment_StatusBoxProps {
  data: any;
  status: string;
  href?: Href;
}

export default function Investment_StatusBox({
  data,
  status,
  href,
}: Investment_StatusBoxProps) {
  return (
    <BaseBox paddingTop={7} paddingBottom={7} href={href}>
      <Grid>
        <Grid.Col span={6}>
          <TextCustom truncate={2}>{data?.title || ""}</TextCustom>

          <Spacing />

          <TextCustom bold size="small">
            Target Dana:
          </TextCustom>
          <TextCustom truncate>
            Rp. {formatCurrencyDisplay(data?.targetDana) || ""}
          </TextCustom>
        </Grid.Col>
        <Grid.Col span={1}>
          <View />
        </Grid.Col>
        <Grid.Col span={5}>
          <Image
            source={API_IMAGE.GET({ fileId: data?.imageId })}
            style={{ width: "auto", height: 100, borderRadius: 10 }}
          />
        </Grid.Col>
      </Grid>
    </BaseBox>
  );
}
