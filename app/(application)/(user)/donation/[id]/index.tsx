/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  BoxButtonOnFooter,
  ButtonCustom,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  NewWrapper,
  StackCustom,
  ViewWrapper,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconNews } from "@/components/_Icon";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { useAuth } from "@/hooks/use-auth";
import Donation_ComponentBoxDetailData from "@/screens/Donation/ComponentBoxDetailData";
import Donation_ComponentInfoFundrising from "@/screens/Donation/ComponentInfoFundrising";
import Donation_ComponentStoryFunrising from "@/screens/Donation/ComponentStoryFunrising";
import Donation_ProgressSection from "@/screens/Donation/ProgressSection";
import { apiDonationGetOne } from "@/service/api-client/api-donation";
import { countDownAndCondition } from "@/utils/countDownAndCondition";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function DonasiDetailBeranda() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
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

  const buttonSection = (
    <>
      <BoxButtonOnFooter>
        <ButtonCustom
          disabled={value?.reminder || !data}
          onPress={() => router.navigate(`/donation/${id}/(transaction-flow)`)}
        >
          {!data ? "Loading..." : value?.reminder ? "Waktu berakhir" : "Donasi"}
        </ButtonCustom>
      </BoxButtonOnFooter>
    </>
  );

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Detail Donasi"
              left={<BackButton />}
              right={
                user?.id === data?.Author?.id ? (
                  <DotButton onPress={() => setOpenDrawer(true)} />
                ) : null
              }
            />
          ),
        }}
      />
      <NewWrapper footerComponent={buttonSection}>
        {!data ? (
          <CustomSkeleton height={400} />
        ) : (
          <StackCustom>
            <Donation_ComponentBoxDetailData
              sisaHari={value.sisa}
              reminder={value.reminder}
              data={data}
              bottomSection={
                <Donation_ProgressSection
                  id={id as string}
                  progres={Number(data?.progres) || 0}
                />
              }
            />
            <Donation_ComponentInfoFundrising dataAuthor={data?.Author} />
            <Donation_ComponentStoryFunrising
              id={id as string}
              dataStory={data?.CeritaDonasi}
            />
          </StackCustom>
        )}
      </NewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
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
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
