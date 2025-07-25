import {
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import Job_BoxDetailSection from "@/screens/Job/BoxDetailSection";
import Job_ButtonStatusSection from "@/screens/Job/ButtonStatusSection";
import { jobDataDummy } from "@/screens/Job/listDataDummy";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function JobDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const jobDetail = jobDataDummy.find((e) => e.id === Number(id));

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail`,
          headerLeft: () => <BackButton />,
          headerRight: () =>
            status === "draft" ? (
              <DotButton onPress={() => setOpenDrawer(true)} />
            ) : null,
        }}
      />
      <ViewWrapper>
        <Job_BoxDetailSection data={jobDetail} />
        <Job_ButtonStatusSection status={status as string} />
        <Spacing />
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconEdit />,
              label: "Edit",
              path: `/job/${id}/edit`,
            },
          ]}
          columns={4}
          onPressItem={handlePress as any}
        />
      </DrawerCustom>
    </>
  );
}
