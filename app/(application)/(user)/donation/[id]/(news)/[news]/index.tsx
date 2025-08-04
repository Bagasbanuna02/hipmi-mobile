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
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import { IconTrash } from "@/components/_Icon/IconTrash";
import dayjs from "dayjs";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function DonationNews() {
  const { id, news } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Detail Kabar",
          headerLeft: () => <BackButton />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
      <ViewWrapper>
        <BaseBox>
          <StackCustom>
            <TextCustom style={{ alignSelf: "flex-end" }}>
              {dayjs().format("DD MMM YYYY")}
            </TextCustom>

            <DummyLandscapeImage />

            <TextCustom bold size="large" align="center">
              Judul Berita
            </TextCustom>

            <TextCustom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              est id temporibus perferendis eos reiciendis reprehenderit tempora
              ut quibusdam dolores facilis rerum exercitationem recusandae quis
              neque, adipisci dolorum, aspernatur labore?
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
              icon: <IconEdit />,
              label: "Edit Berita",
              path: `/donation/${id}/(news)/${news}/edit-news` as any,
            },
            {
              icon: <IconTrash />,
              label: "Hapus Berita",
              path: `` as any,
              color: "red",
            },
          ]}
          onPressItem={(item) => {
            if ((item.path as any) === "") {
              setOpenDrawer(false);
              AlertDefaultSystem({
                title: "Hapus Berita",
                message: "Apakah Anda yakin ingin menghapus berita ini?",
                textLeft: "Batal",
                textRight: "Hapus",
                onPressRight: () => {
                  router.back();
                },
              });
            } else {
              router.navigate(item.path as any);
              setOpenDrawer(false);
            }
          }}
        />
      </DrawerCustom>
    </>
  );
}
