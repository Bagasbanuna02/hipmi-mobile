import {
  BaseBox,
  Grid,
  ScrollableCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { useState } from "react";
import { View } from "react-native";

const categories = [
  { value: "all", label: "Semua" },
  { value: "event", label: "Event" },
  { value: "job", label: "Job" },
  { value: "voting", label: "Voting" },
  { value: "donasi", label: "Donasi" },
  { value: "investasi", label: "Investasi" },
  { value: "forum", label: "Forum" },
  { value: "collaboration", label: "Collaboration" },
];

const selectedCategory = (value: string) => {
  const category = categories.find((c) => c.value === value);
  return category?.label;
};

const BoxNotification = ({
  index,
  activeCategory,
}: {
  index: number;
  activeCategory: string | null;
}) => {
  return (
    <>
      <BaseBox
        onPress={() =>
          console.log(
            "Notification >",
            selectedCategory(activeCategory as string)
          )
        }
      >
        <StackCustom>
          <TextCustom bold>
            # {selectedCategory(activeCategory as string)}
          </TextCustom>

          <View
            style={{
              borderBottomColor: MainColor.white_gray,
              borderBottomWidth: 1,
            }}
          />

          <TextCustom truncate={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint odio
            unde quidem voluptate quam culpa sequi molestias ipsa corrupti id,
            soluta, nostrum adipisci similique, et illo asperiores deleniti eum
            labore.
          </TextCustom>

          <Grid>
            <Grid.Col span={6}>
              <TextCustom size="small" color="gray">
                {index + 1} Agustus 2025
              </TextCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
              <TextCustom size="small" color="gray">
                Belum lihat
              </TextCustom>
            </Grid.Col>
          </Grid>
        </StackCustom>
      </BaseBox>
    </>
  );
};

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState<string | null>("all");

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // tambahkan logika lain seperti filter dsb.
  };
  return (
    <ViewWrapper
      headerComponent={
        <ScrollableCustom
          data={categories.map((e, i) => ({
            id: i,
            label: e.label,
            value: e.value,
          }))}
          onButtonPress={handlePress}
          activeId={activeCategory as string}
        />
      }
    >
      {Array.from({ length: 20 }).map((e, i) => (
        <View key={i}>
          <BoxNotification index={i} activeCategory={activeCategory as any} />
        </View>
      ))}
    </ViewWrapper>
  );
}
