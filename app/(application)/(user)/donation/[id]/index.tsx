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
import Donation_ComponentBoxDetailData from "@/screens/Donation/ComponentBoxDetailData";
import Donation_ComponentInfoFundrising from "@/screens/Donation/ComponentInfoFundrising";
import Donation_ComponentStoryFunrising from "@/screens/Donation/ComponentStoryFunrising";
import Donation_ProgressSection from "@/screens/Donation/ProgressSection";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function DonasiDetailBeranda() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);

  const buttonSection = (
    <>
      <BoxButtonOnFooter>
        <ButtonCustom>Donasi</ButtonCustom>
      </BoxButtonOnFooter>
    </>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail Donasi`,
          headerLeft: () => <BackButton />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
      <ViewWrapper footerComponent={buttonSection}>
        <StackCustom>
          <Donation_ComponentBoxDetailData
            bottomSection={<Donation_ProgressSection id={id as string} />}
          />
          <Donation_ComponentInfoFundrising id={id as string} />
          <Donation_ComponentStoryFunrising id={id as string} />
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
