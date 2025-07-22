import {
  ViewWrapper,
  StackCustom,
  TextCustom,
  BaseBox,
  Grid,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  ButtonCustom,
  AlertCustom,
  Spacing,
} from "@/components";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import LeftButtonCustom from "@/components/Button/BackButton";
import Event_BoxDetailPublishSection from "@/screens/Event/BoxDetailPublishSection";
import { menuDrawerPublishEvent } from "@/screens/Event/menuDrawerPublish";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export default function EventPublish() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);

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
        <Event_BoxDetailPublishSection footerButton={footerButton} />
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
          onPressItem={handlePress}
        />
      </DrawerCustom>
    </>
  );
}
