import {
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Donation_ButtonStatusSection from "@/screens/Donation/ButtonStatusSection";
import Donation_ComponentBoxDetailData from "@/screens/Donation/ComponentBoxDetailData";
import Donation_ComponentStoryFunrising from "@/screens/Donation/ComponentStoryFunrising";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useState } from "react";

export default function DonasiDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
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
            ) : null,
        }}
      />
      <ViewWrapper>
        <Donation_ComponentBoxDetailData />
        <Donation_ComponentStoryFunrising id={id as string} />
        <Spacing />
        <Donation_ButtonStatusSection status={status as string} />
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
              label: "Edit Cerita Penggalang",
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
    </>
  );
}
