import {
  BaseBox,
  Grid,
  ScrollableCustom,
  Spacing,
  TextCustom,
  ViewWrapper
} from "@/components";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { masterStatus } from "@/lib/dummy-data/_master/status";
import { Image } from "expo-image";
import { useState } from "react";
import { View } from "react-native";

export default function InvestmentPortofolio() {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "publish"
  );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // tambahkan logika lain seperti filter dsb.
  };

  const scrollComponent = (
    <ScrollableCustom
      data={masterStatus.map((e, i) => ({
        id: i,
        label: e.label,
        value: e.value,
      }))}
      onButtonPress={handlePress}
      activeId={activeCategory as any}
    />
  );
  return (
    <ViewWrapper headerComponent={scrollComponent} hideFooter>
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox key={index} paddingTop={7} paddingBottom={7}>
          <Grid>
            <Grid.Col span={6}>
              <TextCustom truncate={2}>
                Title here : {activeCategory} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Omnis, exercitationem, sequi enim quod distinctio maiores
                laudantium amet, quidem atque repellat sit vitae qui aliquam est
                veritatis laborum eum voluptatum totam!
              </TextCustom>

              <Spacing />

              <TextCustom bold size="small">
                Target Dana:
              </TextCustom>
              <TextCustom>Rp. {index + 1 % 3/4 * 1004000}</TextCustom>
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
      ))}
    </ViewWrapper>
  );
}
