/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  BaseBox,
  DotButton,
  DrawerCustom,
  DummyLandscapeImage,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import { IconTrash } from "@/components/_Icon/IconTrash";
import { useAuth } from "@/hooks/use-auth";
import { apiDonationGetNewsById } from "@/service/api-client/api-donation";
import { formatChatTime } from "@/utils/formatChatTime";
import dayjs from "dayjs";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";

export default function DonationNews() {
  const { user } = useAuth();
  const { news } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [news])
  );

  const onLoadData = async () => {
    try {
      const response = await apiDonationGetNewsById({
        id: news as string,
        category: "get-one",
      });

      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Detail Kabar",
          headerLeft: () => <BackButton />,
          headerRight: () =>
            user?.id === data && data?.authorId && (
              <DotButton onPress={() => setOpenDrawer(true)} />
            ),
        }}
      />
      <ViewWrapper>
        <BaseBox>
          <StackCustom>
            <TextCustom style={{ alignSelf: "flex-end" }}>
              {formatChatTime(data?.createdAt)}
            </TextCustom>

            {data && data.imageId && (
              <DummyLandscapeImage imageId={data.imageId} />
            )}

            <TextCustom bold size="large" align="center">
              {data?.title || "-"}
            </TextCustom>

            <TextCustom>{data?.deskripsi || "-"}</TextCustom>
          </StackCustom>
        </BaseBox>
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
              label: "Edit Berita",
              path: `/donation/[id]/(news)/${news}/edit-news` as any,
            },
            {
              icon: <IconTrash />,
              label: "Hapus Berita",
              path: `/donation/[id]/(news)/${news}/edit-news` as any,
              color: "red",
            },
          ]}
          onPressItem={(item) => {
            if ((item.path as any) === "") {
              setOpenDrawer(false);
              AlertDefaultSystem({
                title: "Hapus Berita",
                message: "Apakah Anda yakin ingin menghapus berita ini?",
                textLeft: "Batal",
                textRight: "Hapus",
                onPressRight: () => {
                  router.back();
                },
              });
            } else {
              router.navigate(item.path as any);
              setOpenDrawer(false);
            }
          }}
        />
      </DrawerCustom>
    </>
  );
}
