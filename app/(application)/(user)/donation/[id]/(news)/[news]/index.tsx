/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  BaseBox,
  DotButton,
  DrawerCustom,
  DummyLandscapeImage,
  MenuDrawerDynamicGrid,
  OS_Wrapper,
  StackCustom,
  TextCustom,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconEdit } from "@/components/_Icon";
import { IconTrash } from "@/components/_Icon/IconTrash";
import { useAuth } from "@/hooks/use-auth";
import {
  apiDonationDeleteNews,
  apiDonationGetNewsById,
} from "@/service/api-client/api-donation";
import { formatChatTime } from "@/utils/formatChatTime";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";
import { dateTimeView } from "@/utils/dateTimeView";

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
          header: () => (
            <AppHeader
              title="Detail Kabar"
              left={<BackButton />}
              right={
                user?.id === data?.authorId && (
                  <DotButton onPress={() => setOpenDrawer(true)} />
                )
              }
            />
          ),
        }}
      />
      <OS_Wrapper>
        <BaseBox>
          <StackCustom>
            <TextCustom color="gray" size={"small"} style={{ alignSelf: "flex-end" }}>
              {dateTimeView({date: data?.createdAt})}
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
      </OS_Wrapper>

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
              path: "",
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
                onPressRight: async () => {
                  const response = await apiDonationDeleteNews({
                    id: news as string,
                  });

                  if (!response.success) {
                    Toast.show({
                      type: "error",
                      text1: "Gagal menghapus berita",
                    });
                    return;
                  }

                  Toast.show({
                    type: "success",
                    text1: "Berita berhasil dihapus",
                  });
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
