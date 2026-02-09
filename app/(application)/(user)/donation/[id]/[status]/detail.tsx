/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  ViewWrapper,
} from "@/components";
import { IconEdit, IconNews } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Donation_ButtonStatusSection from "@/screens/Donation/ButtonStatusSection";
import Donation_ComponentBoxDetailData from "@/screens/Donation/ComponentBoxDetailData";
import Donation_ComponentStoryFunrising from "@/screens/Donation/ComponentStoryFunrising";
import Donation_ProgressSection from "@/screens/Donation/ProgressSection";
import { apiDonationGetOne } from "@/service/api-client/api-donation";
import { countDownAndCondition } from "@/utils/countDownAndCondition";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function DonasiDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);

  const [data, setData] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetOne({
        id: id as string,
        category: "permanent",
      });

      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  const [value, setValue] = useState({
    sisa: 0,
    reminder: false,
  });

  useEffect(() => {
    updateCountDown();
  }, [data]);

  const updateCountDown = () => {
    const countDown = countDownAndCondition({
      duration: data?.DonasiMaster_Durasi?.name,
      publishTime: data?.publishTime,
    });

    setValue({
      sisa: countDown.durationDay,
      reminder: countDown.reminder,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail ${_.startCase(status as string)}`,
          headerLeft: () => <BackButton />,
          headerRight: () =>
            status === "draft" ? (
              <DotButton onPress={() => setOpenDrawer(true)} />
            ) : status === "publish" ? (
              <DotButton onPress={() => setOpenDrawerPublish(true)} />
            ) : null,
        }}
      />
      <ViewWrapper>
        <Donation_ComponentBoxDetailData
          sisaHari={value.sisa}
          reminder={value.reminder}
          data={data}
          showSisaHari={status === "publish" ? true : false}
          bottomSection={
            status === "publish" && (
              <Donation_ProgressSection
                id={id as string}
                progres={Number(data?.progres) || 0}
              />
            )
          }
        />
        <Donation_ComponentStoryFunrising
          id={id as string}
          dataStory={data?.CeritaDonasi}
        />
        <Spacing />
        <Donation_ButtonStatusSection
          id={id as string}
          status={status as string}
        />
        <Spacing />
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
              label: "Edit Donasi",
              path: `/donation/${id}/edit`,
            },
            {
              icon: <IconEdit />,
              label: "Edit Cerita",
              path: `/donation/${id}/edit-story`,
            },
            {
              icon: (
                <FontAwesome6
                  name="credit-card"
                  color={MainColor.white}
                  size={ICON_SIZE_SMALL}
                />
              ),
              label: "Edit Rekening",
              path: `/donation/${id}/edit-rekening`,
            },
          ]}
          columns={4}
          onPressItem={handlePress as any}
        />
      </DrawerCustom>

      <DrawerCustom
        isVisible={openDrawerPublish}
        closeDrawer={() => setOpenDrawerPublish(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconNews />,
              label: "Rekap Kabar",
              path: `/donation/${id}/(news)/recap-of-news`,
            },
          ]}
          onPressItem={(item) => {
            console.log("PATH ", item.path);
            router.navigate(item.path as any);
            setOpenDrawerPublish(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
