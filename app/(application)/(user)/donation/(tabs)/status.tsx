import {
  Grid,
  BaseBox,
  DummyLandscapeImage,
  ScrollableCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import { useState } from "react";
import { View } from "react-native";

export default function DonationStatus() {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "publish"
  );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // tambahkan logika lain seperti filter dsb.
  };

  const scrollComponent = (
    <ScrollableCustom
      data={dummyMasterStatus.map((e, i) => ({
        id: i,
        label: e.label,
        value: e.value,
      }))}
      onButtonPress={handlePress}
      activeId={activeCategory as any}
    />
  );
  return (
    <ViewWrapper hideFooter headerComponent={scrollComponent}>
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox
          key={index}
          paddingTop={7}
          paddingBottom={7}
          href={`/investment/${index}`}
        >
          <Grid>
            <Grid.Col span={5}>
              <DummyLandscapeImage height={100} />
            </Grid.Col>
            <Grid.Col span={1}>
              <View />
            </Grid.Col>
            <Grid.Col span={6}>
              <StackCustom>
                <TextCustom truncate>
                  Judul Donasi: {activeCategory} Lorem ipsum dolor sit amet
                  consectetur adipisicing elit.
                </TextCustom>

                <View>
                  <TextCustom>Target Dana</TextCustom>
                  <TextCustom bold color="yellow">
                    Rp. 7.500.000
                  </TextCustom>
                </View>
                {/* <TextCustom>
                 Terkumpul : Rp 300.000
                </TextCustom> */}
              </StackCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
