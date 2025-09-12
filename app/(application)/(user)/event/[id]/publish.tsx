/* eslint-disable react-hooks/exhaustive-deps */
import {
  ButtonCustom,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  ViewWrapper,
} from "@/components";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import LeftButtonCustom from "@/components/Button/BackButton";
import Event_BoxDetailPublishSection from "@/screens/Event/BoxDetailPublishSection";
import { menuDrawerPublishEvent } from "@/screens/Event/menuDrawerPublish";
import { apiEventGetOne } from "@/service/api-client/api-event";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function EventDetailPublish() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [data, setData] = useState();

  useEffect(() => {
    onLoadData();
  }, [id]);

  async function onLoadData() {
    try {
      const response = await apiEventGetOne({ id: id as string });
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  }

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  const footerButton = (
    <ButtonCustom
      backgroundColor="green"
      textColor="white"
      onPress={() => Alert.alert("Anda berhasil join event ini")}
    >
      Join
    </ButtonCustom>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: `Event publish`,
          headerLeft: () => <LeftButtonCustom />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
      <ViewWrapper>
        <Event_BoxDetailPublishSection data={data} footerButton={footerButton} />
        <Spacing />
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={menuDrawerPublishEvent({ id: id as string })}
          columns={4}
          // onPressItem={handlePress}
        />
      </DrawerCustom>
    </>
  );
}
