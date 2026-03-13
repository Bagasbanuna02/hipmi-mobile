/* eslint-disable react-hooks/exhaustive-deps */
import {
  DotButton,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  ViewWrapper,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import LeftButtonCustom from "@/components/Button/BackButton";
import Event_BoxDetailPublishSection from "@/screens/Event/BoxDetailPublishSection";
import { menuDrawerPublishEvent } from "@/screens/Event/menuDrawerPublish";
import { apiEventGetOne } from "@/service/api-client/api-event";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function EventDetailContribution() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any>();
  const [isLoadData, setIsLoadData] = useState(false);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      setIsLoadData(true);
      const response = await apiEventGetOne({ id: id as string });
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
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
          header: () => (
            <AppHeader
              title="Detail kontribusi"
              left={<LeftButtonCustom />}
              right={<DotButton onPress={() => setOpenDrawer(true)} />}
            />
          ),
        }}
      />
      <ViewWrapper>
        {isLoadData ? (
          <LoaderCustom />
        ) : (
          <Event_BoxDetailPublishSection data={data} />
        )}
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
