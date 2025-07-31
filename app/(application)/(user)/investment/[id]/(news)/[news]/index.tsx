import {
  AlertDefaultSystem,
  BackButton,
  BaseBox,
  DotButton,
  DrawerCustom,
  DummyLandscapeImage,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import { IconTrash } from "@/components/_Icon/IconTrash";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function InvestmentNews() {
  const { id, news } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Detail Berita",
          headerLeft: () => <BackButton />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
      <ViewWrapper>
        <BaseBox>
          <StackCustom>
            <DummyLandscapeImage />
            <TextCustom bold align="center" size="large">
              Judul Berita {news} Terbaru
            </TextCustom>
            <TextCustom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              fuga mollitia laboriosam voluptatibus quos molestias, illo fugiat
              esse repellat, ad officia earum numquam? Aliquid corrupti quam
              tempora cum harum est!
            </TextCustom>
          </StackCustom>
        </BaseBox>
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Hapus Berita",
              path: `/investment/${id}/add-news`,
              icon: <IconTrash />,
              color: "red",
            },
          ]}
          onPressItem={(item) => {
            AlertDefaultSystem({
              title: "Hapus Berita",
              message: "Apakah Anda yakin ingin menghapus berita ini?",
              textLeft: "Batal",
              textRight: "Hapus",
              onPressRight: () => {
                router.back();
                setOpenDrawer(false);
              },
            });
          }}
        />
      </DrawerCustom>
    </>
  );
}
