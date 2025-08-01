import {
    BackButton,
    BaseBox,
    DotButton,
    DrawerCustom,
    Grid,
    MenuDrawerDynamicGrid,
    StackCustom,
    TextCustom,
    ViewWrapper,
} from "@/components";
import { IconDocument, IconEdit, IconNews } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import Invesment_ComponentBoxOnBottomDetail from "@/screens/Invesment/ComponentBoxOnBottomDetail";
import Invesment_DetailDataPublishSection from "@/screens/Invesment/DetailDataPublishSection";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useState } from "react";

export default function InvestmentDetailHolding() {
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
      status={"publish"}
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
        <BaseBox>
          <StackCustom gap={"xs"}>
            <Grid>
              <Grid.Col span={6}>
                <TextCustom bold>Nila Transaksi</TextCustom>
              </Grid.Col>
              <Grid.Col span={6}>
                <TextCustom bold>Rp. 7.500.000</TextCustom>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <TextCustom bold>Saham Terbeli</TextCustom>
              </Grid.Col>
              <Grid.Col span={6}>
                <TextCustom bold>300 Lembar</TextCustom>
              </Grid.Col>
            </Grid>
          </StackCustom>
        </BaseBox>
        <Invesment_DetailDataPublishSection
          status={"publish"}
          bottomSection={bottomSection}
        />
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
