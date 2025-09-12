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
import { useAuth } from "@/hooks/use-auth";
import Event_BoxDetailPublishSection from "@/screens/Event/BoxDetailPublishSection";
import { menuDrawerPublishEvent } from "@/screens/Event/menuDrawerPublish";
import { apiEventGetOne, apiEventJoin } from "@/service/api-client/api-event";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function EventDetailPublish() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);

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

  const handlerJoin = async () => {
    const userId = user?.id;
    if (!userId) {
      return Toast.show({
        type: "error",
        text2: "Anda belum login",
      });
    }

    try {
      setIsLoadingJoin(true);
      const response = await apiEventJoin({
        id: id as string,
        userId: userId as string,
      });
      if (response.success) {
        router.navigate(
          `/(application)/(user)/event/${id}/list-of-participants`
        );
        Toast.show({
          type: "success",
          text1: "Anda berhasil join",
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadingJoin(false);
    }
  };

  const footerButton = (
    <ButtonCustom
      isLoading={isLoadingJoin}
      backgroundColor="green"
      textColor="white"
      onPress={() => handlerJoin()}
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
        <Event_BoxDetailPublishSection
          data={data}
          footerButton={footerButton}
        />
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
          onPressItem={handlePress as any}
        />
      </DrawerCustom>
    </>
  );
}
