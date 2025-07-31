import {
    BackButton,
    BaseBox,
    DotButton,
    DrawerCustom,
    MenuDrawerDynamicGrid,
    ProgressCustom,
    Spacing,
    StackCustom,
    TextCustom,
    ViewWrapper
} from "@/components";
import { IconDocument, IconEdit, IconNews } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import {
    listDataNotPublishInvesment,
    listDataPublishInvesment,
} from "@/lib/dummy-data/investment/dummy-data-not-publish";
import Invesment_BoxDetailDataSection from "@/screens/Invesment/BoxDetailDataSection";
import Investment_ButtonInvestasiSection from "@/screens/Invesment/ButtonInvestasiSection";
import Investment_ButtonStatusSection from "@/screens/Invesment/ButtonStatusSection";
import Invesment_ComponentBoxOnBottomDetail from "@/screens/Invesment/ComponentBoxOnBottomDetail";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useState } from "react";

export default function InvestmentDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawerDraft, setOpenDrawerDraft] = useState(false);
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);

  const handlePressDraft = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawerDraft(false);
  };

  const handlePressPublish = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawerPublish(false);
  };

  const bottomSection = (
    <Invesment_ComponentBoxOnBottomDetail
      id={id as string}
      status={status as string}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail ${_.startCase(status as string)}`,
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
        <StackCustom gap={"sm"}>
          {status === "publish" && (
            <BaseBox>
              <StackCustom>
                <TextCustom bold>Progress Saham</TextCustom>
                <ProgressCustom value={70} size="lg" />
              </StackCustom>
            </BaseBox>
          )}
          <Invesment_BoxDetailDataSection
            data={
              status === "publish"
                ? listDataPublishInvesment
                : listDataNotPublishInvesment
            }
            bottomSection={bottomSection}
          />
          <Investment_ButtonStatusSection status={status as string} />
          <Investment_ButtonInvestasiSection isMine={false} />
        </StackCustom>
        <Spacing />
      </ViewWrapper>

      {/* ========= Draft Drawer ========= */}
      <DrawerCustom
        isVisible={openDrawerDraft}
        closeDrawer={() => setOpenDrawerDraft(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconEdit />,
              label: "Edit Data",
              path: `/investment/${id}/edit`,
            },
            {
              icon: (
                <AntDesign
                  name="edit"
                  size={ICON_SIZE_MEDIUM}
                  color={MainColor.white}
                />
              ),
              label: "Edit Prospektus",
              path: `/investment/${id}/edit-prospectus`,
            },
            {
              icon: (
                <MaterialIcons
                  name="create"
                  size={ICON_SIZE_MEDIUM}
                  color={MainColor.white}
                />
              ),
              label: "Update Dokumen",
              path: `/investment/${id}/recap-of-document`,
            },
          ]}
          columns={4}
          onPressItem={handlePressDraft as any}
        />
      </DrawerCustom>

      {/* ========= Publish Drawer ========= */}
      <DrawerCustom
        isVisible={openDrawerPublish}
        closeDrawer={() => setOpenDrawerPublish(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconDocument />,
              label: "Update Dokumen",
              path: `/investment/${id}/recap-of-document`,
            },
            {
              icon: <IconNews />,
              label: "Update Berita",
              path: `/investment/${id}/(news)/recap-of-news`,
            },
          ]}
          onPressItem={handlePressPublish as any}
        />
      </DrawerCustom>
    </>
  );
}
