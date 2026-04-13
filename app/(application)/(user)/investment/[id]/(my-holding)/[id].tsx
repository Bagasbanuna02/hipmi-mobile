/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  BaseBox,
  DotButton,
  DrawerCustom,
  Grid,
  MenuDrawerDynamicGrid,
  OS_Wrapper,
  StackCustom,
  TextCustom,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconDocument, IconEdit, IconNews } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import Invesment_ComponentBoxOnBottomDetail from "@/screens/Invesment/ComponentBoxOnBottomDetail";
import Invesment_DetailDataPublishSection from "@/screens/Invesment/DetailDataPublishSection";
import { apiInvestmentGetInvoice } from "@/service/api-client/api-investment";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function InvestmentDetailHolding() {
  const { user } = useAuth();
  const { id, status } = useLocalSearchParams();
  const [openDrawerDraft, setOpenDrawerDraft] = useState(false);
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);
    const [data, setData] = useState<any>(null);

    useFocusEffect(
      useCallback(() => {
        onLoadData();
      }, [id, status])
    );

    const onLoadData = async () => {
      try {
        const response = await apiInvestmentGetInvoice({
          id: id as string,
          authorId: user?.id,
          category: "invoice",
        });

        console.log("[DATA]", JSON.stringify(response.data, null, 2));
        setData(response.data);
      } catch (error) {
        console.log("[ERROR]", error);
      }
    };

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
      prospectusId={id as string}
      id={data?.Investasi?.id as string}
      status={"publish"}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title={`Detail ${_.startCase(status as string)}`}
              left={<BackButton />}
              right={
                status === "draft" ? (
                  <DotButton onPress={() => setOpenDrawerDraft(true)} />
                ) : status === "publish" ? (
                  <DotButton onPress={() => setOpenDrawerPublish(true)} />
                ) : null
              }
            />
          ),
        }}
      />

      <OS_Wrapper>
        <BaseBox>
          <StackCustom gap={"xs"}>
            <Grid>
              <Grid.Col span={6}>
                <TextCustom bold>Nilai Transaksi</TextCustom>
              </Grid.Col>
              <Grid.Col span={6}>
                <TextCustom bold>
                  Rp. {data ? formatCurrencyDisplay(data?.nominal) : ""}
                </TextCustom>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <TextCustom bold>Saham Terbeli</TextCustom>
              </Grid.Col>
              <Grid.Col span={6}>
                <TextCustom bold>
                  {data ? data?.lembarTerbeli : ""} Lembar
                </TextCustom>
              </Grid.Col>
            </Grid>
          </StackCustom>
        </BaseBox>

        <Invesment_DetailDataPublishSection
          data={data && data?.Investasi}
          status={"publish"}
          bottomSection={bottomSection}
        />
      </OS_Wrapper>

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
