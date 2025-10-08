/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  BaseBox,
  DrawerCustom,
  Grid,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconPlus } from "@/components/_Icon";
import { apiDonationGetNewsById } from "@/service/api-client/api-donation";
import { formatChatTime } from "@/utils/formatChatTime";
import dayjs from "dayjs";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function DonationRecapOfNews() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [id])
  );

  const onLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiDonationGetNewsById({
        id: id as string,
        category: "get-all",
      });

      console.log("[RESPONSE LIST]", JSON.stringify(response, null, 2));
      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
      setList([]);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Daftar Kabar",
          headerLeft: () => <BackButton />,
        }}
      />
      <ViewWrapper>
        {loadList ? (
          <LoaderCustom />
        ) : _.isEmpty(list) ? (
          <TextCustom align="center" color="gray">
            Tidak ada kabar
          </TextCustom>
        ) : (
          list?.map((item: any, index: number) => (
            <BaseBox key={index} href={`/donation/[id]/(news)/${item.id}`}>
              <Grid>
                <Grid.Col span={8}>
                  <TextCustom truncate bold>
                    {item?.title || "-"}
                  </TextCustom>
                </Grid.Col>
                <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
                  <TextCustom size="small">
                    {formatChatTime(item?.createdAt)}
                  </TextCustom>
                </Grid.Col>
              </Grid>
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
