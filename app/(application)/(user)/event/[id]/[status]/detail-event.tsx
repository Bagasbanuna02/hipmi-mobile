/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  DotButton,
  DrawerCustom,
  Grid,
  MenuDrawerDynamicGrid,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import LeftButtonCustom from "@/components/Button/BackButton";
import Event_ButtonStatusSection from "@/screens/Event/ButtonStatusSection";
import { menuDrawerDraftEvent } from "@/screens/Event/menuDrawerDraft";
import { apiEventGetOne } from "@/service/api-client/api-event";
import { dateTimeView } from "@/utils/dateTimeView";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";

export default function EventDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [openAlert, setOpenAlert] = useState(false);

  const [data, setData] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  async function onLoadData() {
    try {
      const response = await apiEventGetOne({ id: id as string });
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  }

  const listData = [
    {
      title: "Lokasi",
      value: data?.lokasi || "-",
    },
    {
      title: "Tipe Acara",
      value: data?.EventMaster_TipeAcara?.name || "-",
    },
    {
      title: "Tanggal Mulai",
      value: dateTimeView({ date: data?.tanggal }) || "-",
    },
    {
      title: "Tanggal Berakhir",
      value: dateTimeView({ date: data?.tanggalSelesai }) || "-",
    },
    {
      title: "Deskripsi",
      value: data?.deskripsi || "-",
    },
  ];

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title={`Detail ${status === "publish" ? "" : status}`}
              left={<LeftButtonCustom />}
              right={
                status === "draft" ? (
                  <DotButton onPress={() => setOpenDrawer(true)} />
                ) : null
              }
            />
          ),
        }}
      />
      <OS_Wrapper>
        <BaseBox>
          <StackCustom>
            <TextCustom bold align="center" size="xlarge">
              {data?.title || "-"}
            </TextCustom>
            {listData.map((item, index) => (
              <Grid key={index}>
                <Grid.Col span={4}>
                  <TextCustom bold>{item.title}</TextCustom>
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextCustom>{item.value}</TextCustom>
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
        </BaseBox>
        <Event_ButtonStatusSection
          id={id as string}
          status={status as string}
        />
        <Spacing />
      </OS_Wrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={menuDrawerDraftEvent({ id: id as string }) as any}
          columns={4}
          onPressItem={handlePress as any}
        />
      </DrawerCustom>
    </>
  );
}
