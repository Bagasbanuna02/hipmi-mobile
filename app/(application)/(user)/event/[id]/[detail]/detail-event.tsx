import {
  BaseBox,
  DotButton,
  DrawerCustom,
  Grid,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import LeftButtonCustom from "@/components/Button/BackButton";
import { AccentColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import Event_ButtonStatusSection from "@/screens/Event/ButtonStatusSection";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

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

export default function EventDetail() {
  const { id, detail } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  const drawerItemsDraftEvent = [
    {
      icon: (
        <Ionicons
          name="create"
          size={ICON_SIZE_MEDIUM}
          color={AccentColor.white}
        />
      ),
      label: "Edit event",
      path: `/(application)/(user)/event/${id}/edit`,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail ${detail === "publish" ? "" : detail}`,
          headerLeft: () => <LeftButtonCustom />,
          headerRight: () =>
            detail === "draft" ? (
              <DotButton onPress={() => setOpenDrawer(true)} />
            ) : null,
        }}
      />
      <ViewWrapper>
        <BaseBox>
          <StackCustom>
            <TextCustom bold align="center" size="xlarge">
              Judul event {id}
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
      </ViewWrapper>

      {/* <Event_ButtonStatusSection detail={detail as string} /> */}

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={250}
      >
        <MenuDrawerDynamicGrid
          data={drawerItemsDraftEvent}
          columns={4}
          onPressItem={handlePress}
        />
      </DrawerCustom>
    </>
  );
}
