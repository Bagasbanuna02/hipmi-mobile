/* eslint-disable react-hooks/exhaustive-deps */
import {
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  ViewWrapper,
  Spacing,
} from "@/components";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import LeftButtonCustom from "@/components/Button/BackButton";
import Event_BoxDetailPublishSection from "@/screens/Event/BoxDetailPublishSection";
import { menuDrawerPublishEvent } from "@/screens/Event/menuDrawerPublish";
import { apiEventGetOne } from "@/service/api-client/api-event";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function EventDetailHistory() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      const response = await apiEventGetOne({ id: id as string });
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail riwayat`,
          headerLeft: () => <LeftButtonCustom />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
      <ViewWrapper>
        <Event_BoxDetailPublishSection data={data} />
        <Spacing />
      </ViewWrapper>
      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={250}
      >
        <MenuDrawerDynamicGrid
          data={menuDrawerPublishEvent({ id: id as string })}
          columns={4}
          onPressItem={handlePress as any}
        />
      </DrawerCustom>
    </>
  );
}
