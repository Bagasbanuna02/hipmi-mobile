/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  ViewWrapper,
} from "@/components";
import { IconDocument, IconEdit, IconNews } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import Investment_ButtonInvestasiSection from "@/screens/Invesment/ButtonInvestasiSection";
import Invesment_ComponentBoxOnBottomDetail from "@/screens/Invesment/ComponentBoxOnBottomDetail";
import Invesment_DetailDataPublishSection from "@/screens/Invesment/DetailDataPublishSection";
import { apiInvestmentGetOne } from "@/service/api-client/api-investment";
import { countDownAndCondition } from "@/utils/countDownAndCondition";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function InvestmentDetail() {
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
      const response = await apiInvestmentGetOne({
        id: id as string,
      });

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

  const [value, setValue] = useState({
    sisa: 0,
    reminder: false,
  });

  useEffect(() => {
    updateCountDown();
  }, [data]);

  console.log("[DATA DETAIL]", JSON.stringify(data, null, 2));

  const updateCountDown = () => {
    const countDown = countDownAndCondition({
      duration: data?.MasterPencarianInvestor.name,
      publishTime: data?.countDown,
    });

    setValue({
      sisa: countDown.durationDay,
      reminder: countDown.reminder,
    });
  };

  const bottomSection = (
    <Invesment_ComponentBoxOnBottomDetail
      id={id as string}
      prospectusId={data?.prospektusFileId}
      status={"publish"}
    />
  );

  const buttonSection = (
    <Investment_ButtonInvestasiSection
      id={id as string}
      isMine={user?.id === data?.author?.id}
      reminder={value.reminder}
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
        <Invesment_DetailDataPublishSection
          status={"publish"}
          data={data}
          bottomSection={bottomSection}
          buttonSection={buttonSection}
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
