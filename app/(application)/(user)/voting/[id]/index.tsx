import {
  AlertDefaultSystem,
  AvatarUsernameAndOtherComponent,
  BackButton,
  DotButton,
  DrawerCustom,
  InformationBox,
  MenuDrawerDynamicGrid,
  StackCustom,
  ViewWrapper,
} from "@/components";
import { IconArchive, IconContribution } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import Voting_BoxDetailHasilVotingSection from "@/screens/Voting/BoxDetailHasilVotingSection";
import { Voting_BoxDetailPublishSection } from "@/screens/Voting/BoxDetailPublishSection";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

export default function VotingDetail() {
  const { id } = useLocalSearchParams();
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);
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
          title: `Detail Voting`,
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <DotButton onPress={() => setOpenDrawerPublish(true)} />
          ),
        }}
      />

      <ViewWrapper>
        <StackCustom>
          <InformationBox text="Untuk sementara voting ini belum di buka. Voting akan dimulai sesuai dengan tanggal awal pemilihan, dan akan ditutup sesuai dengan tanggal akhir pemilihan." />

          <Voting_BoxDetailPublishSection
            headerAvatar={<AvatarUsernameAndOtherComponent />}
          />

          <Voting_BoxDetailHasilVotingSection />
        </StackCustom>
      </ViewWrapper>

      {/* ========= Publish Drawer ========= */}
      <DrawerCustom
        isVisible={openDrawerPublish}
        closeDrawer={() => setOpenDrawerPublish(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconContribution />,
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
