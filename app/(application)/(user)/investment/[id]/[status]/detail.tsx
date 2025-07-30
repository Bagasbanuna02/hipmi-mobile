/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BackButton,
  BaseBox,
  ButtonCustom,
  CenterCustom,
  DotButton,
  DrawerCustom,
  DummyLandscapeImage,
  Grid,
  MenuDrawerDynamicGrid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
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
import { View } from "react-native";

export default function InvestmentDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawerDraft, setOpenDrawerDraft] = useState(false);

  const handlePressDraft = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawerDraft(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail ${_.startCase(status as string)}`,
          headerLeft: () => <BackButton />,
          headerRight: () =>
            status === "draft" ? (
              <DotButton onPress={() => setOpenDrawerDraft(true)} />
            ) : null,
          //  : status === "publish" ? (
          //   <DotButton onPress={() => setOpenDrawerPublish(true)} />
          // ) : null,
        }}
      />
      <ViewWrapper>
        <BaseBox paddingBottom={0}>
          <StackCustom gap={"xs"}>
            <DummyLandscapeImage />
            <Spacing />
            <TextCustom align="center" size="xlarge" bold>
              Title of Investment
            </TextCustom>
            <Spacing />

            {listData.map((item, index) => (
              <Grid key={index}>
                <Grid.Col span={4}>
                  <TextCustom bold>{item.label}</TextCustom>
                </Grid.Col>
                <Grid.Col span={1}>
                  <View />
                </Grid.Col>
                <Grid.Col span={7} style={{ justifyContent: "center" }}>
                  <TextCustom>{item.value}</TextCustom>
                </Grid.Col>
              </Grid>
            ))}

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
          </StackCustom>
        </BaseBox>
        <Spacing />
        <Investment_ButtonStatusSection status={status as string} />
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
    </>
  );
}

const listData = [
  {
    label: "Target Dana",
    value: "Rp. 7.500.000",
  },
  {
    label: "Harga Per Lembar",
    value: "Rp. 2.400.",
  },
  {
    label: "Return Of Investment (ROI)",
    value: "3 %",
  },
  {
    label: "Total Lembar",
    value: "1.200",
  },
  {
    label: "Jadwal Pembagian",
    value: "Rp. 2.880.000",
  },
  {
    label: "Pembagian Deviden",
    value: "Selamanya",
  },
  {
    label: "Pencarian Investor",
    value: "30 Hari",
  },
];
