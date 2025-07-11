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
  { id: 1, label: "Semua" },
  { id: 2, label: "Event" },
  { id: 3, label: "Job" },
  { id: 4, label: "Voting" },
  { id: 5, label: "Donasi" },
  { id: 6, label: "Investasi" },
  { id: 7, label: "Forum" },
  { id: 8, label: "Collaboration" },
];

const selectedCategory = (id: number) => {
  const category = categories.find((c) => c.id === id);
  return category?.label;
};

const BoxNotification = ({
  index,
  activeCategory,
}: {
  index: number;
  activeCategory: number | null;
}) => {
  return (
    <>
      <BaseBox
        onPress={() =>
          console.log(
            "Notification >",
            selectedCategory(activeCategory as number)
          )
        }
      >
        <StackCustom>
          <TextCustom bold>
            # {selectedCategory(activeCategory as number)}
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
  const [activeCategory, setActiveCategory] = useState<number | null>(1);

  const handlePress = (item: any) => {
    setActiveCategory(item.id);
    // tambahkan logika lain seperti filter dsb.
  };
  return (
    <ViewWrapper
      headerComponent={
        <ScrollableCustom
          data={categories}
          onButtonPress={handlePress}
          activeId={activeCategory as any}
        />
      }
    >
      {Array.from({ length: 20 }).map((e, i) => (
        <View key={i}>
          <BoxNotification index={i} activeCategory={activeCategory} />
        </View>
      ))}

      {/* Konten utama di sini */}
      {/* <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>
          {activeCategory
            ? `Kategori Aktif: ${
                categories.find((c) => c.id === activeCategory)?.label
              }`
            : "Pilih kategori"}
        </Text>
      </View> */}
    </ViewWrapper>
  );
}
