import {
    AlertDefaultSystem,
    BackButton,
    DotButton,
    DrawerCustom,
    MenuDrawerDynamicGrid,
    Spacing,
    ViewWrapper,
} from "@/components";
import { IconArchive, IconEdit } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Voting_BoxDetailSection } from "@/screens/Voting/BoxDetailSection";
import Voting_ButtonStatusSection from "@/screens/Voting/ButtonStatusSection";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function VotingDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawerDraft, setOpenDrawerDraft] = useState(false);
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);

  const handlePressDraft = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawerDraft(false);
  };

  const handlePressPublish = (item: IMenuDrawerItem) => {
    if (item.path === "") {
      AlertDefaultSystem({
        title: "Update Arsip",
        message: "Apakah Anda yakin ingin mengarsipkan voting ini?",
        textLeft: "Batal",
        textRight: "Ya",
        onPressRight: () => {
          console.log("Hapus");
          router.back();
        },
      });
    }
    router.navigate(item.path as any);
    setOpenDrawerPublish(false);
  };
    

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail ${status}`,
          headerLeft: () => <BackButton />,
          headerRight: () =>
            status === "draft" ? (
              <DotButton onPress={() => setOpenDrawerDraft(true)} />
            ) : status === "publish" ? (
              <DotButton onPress={() => setOpenDrawerPublish(true)} />
            ) : null,
        }}
      />
      <ViewWrapper>
        <Voting_BoxDetailSection />
        <Voting_ButtonStatusSection status={status as string} />
        <Spacing />
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawerDraft}
        closeDrawer={() => setOpenDrawerDraft(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconEdit />,
              label: "Edit",
              path: `/voting/${id}/edit`,
            },
          ]}
          columns={4}
          onPressItem={handlePressDraft as any}
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
              icon: (
                <Ionicons
                  name="people"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              label: "Daftar Kontributor",
              path: `/voting/${id}/list-of-contributor`,
            },
            {
              icon: <IconArchive />,
              label: "Update Arsip",
              path: "" as any,
            },
          ]}
          onPressItem={handlePressPublish as any}
        />
      </DrawerCustom>
    </>
  );
}
