/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  BoxButtonOnFooter,
  ButtonCustom,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  StackCustom,
  ViewWrapper,
} from "@/components";
import { IconNews } from "@/components/_Icon";
import { useAuth } from "@/hooks/use-auth";
import Donation_ComponentBoxDetailData from "@/screens/Donation/ComponentBoxDetailData";
import Donation_ComponentInfoFundrising from "@/screens/Donation/ComponentInfoFundrising";
import Donation_ComponentStoryFunrising from "@/screens/Donation/ComponentStoryFunrising";
import Donation_ProgressSection from "@/screens/Donation/ProgressSection";
import { apiDonationGetOne } from "@/service/api-client/api-donation";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";

export default function DonasiDetailBeranda() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  console.log("ID ", id);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [data, setData] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetOne({
        id: id as string,
        category: "permanent",
      });

      console.log("[RES GET ONE]", JSON.stringify(response.data, null, 2));

      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const buttonSection = (
    <>
      <BoxButtonOnFooter>
        <ButtonCustom
          onPress={() => router.navigate(`/donation/${id}/(transaction-flow)`)}
        >
          Donasi
        </ButtonCustom>
      </BoxButtonOnFooter>
    </>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail Donasi`,
          headerLeft: () => <BackButton />,
          headerRight: () =>
            user?.id === data?.Author?.id ? (
              <DotButton onPress={() => setOpenDrawer(true)} />
            ) : null,
        }}
      />
      <ViewWrapper footerComponent={buttonSection}>
        <StackCustom>
          <Donation_ComponentBoxDetailData
            data={data}
            bottomSection={<Donation_ProgressSection id={id as string} />}
          />
          <Donation_ComponentInfoFundrising dataAuthor={data?.Author} />
          <Donation_ComponentStoryFunrising
            id={id as string}
            dataStory={data?.CeritaDonasi}
          />
        </StackCustom>
      </ViewWrapper>

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
