/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  BaseBox,
  DotButton,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconPlus } from "@/components/_Icon";
import { apiInvestmentGetNews } from "@/service/api-client/api-investment";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function InvestmentRecapOfNews() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [id])
  );

  const onLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiInvestmentGetNews({
        id: id as string,
        category: "all-news",
      });

      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Rekap Berita",
          headerLeft: () => <BackButton />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
      <ViewWrapper>
        {loadList ? (
          <LoaderCustom />
        ) : _.isEmpty(list) ? (
          <TextCustom align="center" color="gray">
            Tidak ada data
          </TextCustom>
        ) : (
          list?.map((item: any, index: number) => (
            <BaseBox
              key={index}
              paddingBlock={5}
              href={`/investment/[id]/(news)/${item.id}`}
            >
              <TextCustom bold>{item.title}</TextCustom>
            </BaseBox>
          ))
        )}
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Tambah Berita",
              path: `/investment/${id}/add-news`,
              icon: <IconPlus />,
            },
          ]}
          onPressItem={(item) => {
            router.push(item.path as any);
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
