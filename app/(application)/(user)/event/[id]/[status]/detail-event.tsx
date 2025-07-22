import {
  BaseBox,
  DotButton,
  DrawerCustom,
  Grid,
  MenuDrawerDynamicGrid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import LeftButtonCustom from "@/components/Button/BackButton";
import Event_AlertButtonStatusSection from "@/screens/Event/AlertButtonStatusSection";
import Event_ButtonStatusSection from "@/screens/Event/ButtonStatusSection";
import { menuDrawerDraftEvent } from "@/screens/Event/menuDrawerDraft";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function EventDetail() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail ${status === "publish" ? "" : status}`,
          headerLeft: () => <LeftButtonCustom />,
          headerRight: () =>
            status === "draft" ? (
              <DotButton onPress={() => setOpenDrawer(true)} />
            ) : null,
        }}
      />
      <ViewWrapper>
        <BaseBox>
          <StackCustom>
            <TextCustom bold align="center" size="xlarge">
              Judul event {status}
            </TextCustom>
            {listData.map((item, index) => (
              <Grid key={index}>
                <Grid.Col span={4}>
                  <TextCustom bold>{item.title}</TextCustom>
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextCustom>{item.value}</TextCustom>
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
        </BaseBox>
        <Event_ButtonStatusSection
          status={status as string}
          onOpenAlert={setOpenAlert}
          onOpenDeleteAlert={setOpenDeleteAlert}
        />
        <Spacing />
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={250}
      >
        <MenuDrawerDynamicGrid
          data={menuDrawerDraftEvent({ id: id as string })}
          columns={4}
          onPressItem={handlePress}
        />
      </DrawerCustom>

      <Event_AlertButtonStatusSection
        id={id as string}
        status={status as string}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        openDeleteAlert={openDeleteAlert}
        setOpenDeleteAlert={setOpenDeleteAlert}
      />
    </>
  );
}

const listData = [
  {
    title: "Lokasi",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eveniet ab eum ducimus tempore a quia deserunt quisquam. Tempora, atque. Aperiam minima asperiores dicta perferendis quis adipisci, dolore optio porro!",
  },
  {
    title: "Tipe Acara",
    value: "Workshop",
  },
  {
    title: "Tanggal Mulai",
    value: "Senin, 18 Juli 2025, 10:00 WIB",
  },
  {
    title: "Tanggal Berakhir",
    value: "Selasa, 19 Juli 2025, 12:00 WIB",
  },
  {
    title: "Deskripsi",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eveniet ab eum ducimus tempore a quia deserunt quisquam. Tempora, atque. Aperiam minima asperiores dicta perferendis quis adipisci, dolore optio porro!",
  },
];
