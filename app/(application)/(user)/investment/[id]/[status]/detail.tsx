/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BackButton,
  BaseBox,
  CenterCustom,
  DotButton,
  DrawerCustom,
  Grid,
  MenuDrawerDynamicGrid,
  ProgressCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM, ICON_SIZE_SMALL } from "@/constants/constans-value";
import { listDataNotPublish } from "@/lib/dummy-data/investment/dummy-data-not-publish";
import BoxDetailDataSection from "@/screens/Invesment/BoxDetailDataSection";
import Investment_ButtonStatusSection from "@/screens/Invesment/ButtonStatusSection";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
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
    <Grid>
      <Grid.Col span={6} style={{ paddingRight: 10 }}>
        <BaseBox
          backgroundColor={AccentColor.blue}
          style={{ borderColor: AccentColor.softblue, borderWidth: 1 }}
          href={`/investment/${id}/prospektus/file`}
        >
          <StackCustom>
            <TextCustom align="center">Prospektus</TextCustom>
            <CenterCustom>
              <FontAwesome6
                name="file-contract"
                size={50}
                color={MainColor.white}
              />
            </CenterCustom>
          </StackCustom>
        </BaseBox>
      </Grid.Col>

      <Grid.Col span={6} style={{ paddingLeft: 10 }}>
        <BaseBox
          backgroundColor={AccentColor.blue}
          style={{ borderColor: AccentColor.softblue, borderWidth: 1 }}
          href={`/investment/${id}/list-of-document`}
        >
          <StackCustom>
            <TextCustom align="center">Dokumen</TextCustom>
            <CenterCustom>
              <FontAwesome6
                name="file-lines"
                size={50}
                color={MainColor.white}
              />
            </CenterCustom>
          </StackCustom>
        </BaseBox>
      </Grid.Col>
    </Grid>
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
          <BoxDetailDataSection
            data={listDataNotPublish}
            bottomSection={bottomSection}
          />
          <Investment_ButtonStatusSection status={status as string} />
          <Spacing />
        </StackCustom>
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
              icon: (
                <FontAwesome6
                  name="file-lines"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              label: "Update Dokumen",
              path: `/investment/${id}/recap-of-document`,
            },
            {
              icon: (
                <Ionicons
                  name="newspaper-outline"
                  size={ICON_SIZE_MEDIUM}
                  color={MainColor.white}
                />
              ),
              label: "Update Berita",
              path: `/investment/${id}/edit`,
            },
          ]}
          columns={4}
          onPressItem={handlePressPublish as any}
        />
      </DrawerCustom>
    </>
  );
}
