import {
  BackButton,
  BaseBox,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconPlus } from "@/components/_Icon";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function InvestmentRecapOfNews() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Rekap Berita",
          headerLeft: () => <BackButton />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
      <ViewWrapper>
        {Array.from({ length: 15 }).map((_, index) => (
          <BaseBox
            key={index}
            paddingBlock={5}
            href={`/investment/${id}/(news)/${index + 1}`}
          >
            <TextCustom bold>Berita Terbaru {index + 1}</TextCustom>
          </BaseBox>
        ))}
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Tambah Berita",
              path: `/investment/${id}/add-news`,
              icon: <IconPlus />,
            },
          ]}
          onPressItem={(item) => {
            router.push(item.path as any);
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
