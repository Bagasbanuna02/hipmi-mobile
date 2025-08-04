import {
    BackButton,
    BaseBox,
    DrawerCustom,
    Grid,
    MenuDrawerDynamicGrid,
    TextCustom,
    ViewWrapper
} from "@/components";
import { IconPlus } from "@/components/_Icon";
import dayjs from "dayjs";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function DonationRecapOfNews() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Daftar Kabar",
          headerLeft: () => <BackButton />, }}
      />
      <ViewWrapper>
        {Array.from({ length: 15 }).map((_, index) => (
          <BaseBox key={index} href={`/donation/${id}/(news)/${index}`}>
            <Grid>
              <Grid.Col span={8}>
                <TextCustom truncate bold>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </TextCustom>
              </Grid.Col>
              <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
                <TextCustom size="small">
                  {dayjs().format("DD MMM YYYY")}
                </TextCustom>
              </Grid.Col>
            </Grid>
          </BaseBox>
        ))}
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconPlus />,
              label: "Tambah Berita",
              path: `/donation/${id}/(news)/add-news`,
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
