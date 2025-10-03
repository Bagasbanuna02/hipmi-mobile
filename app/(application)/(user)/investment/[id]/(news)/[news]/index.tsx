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
import { IconTrash } from "@/components/_Icon/IconTrash";
import { useAuth } from "@/hooks/use-auth";
import {
  apiInvestmentDeleteNews,
  apiInvestmentGetNews,
} from "@/service/api-client/api-investment";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function InvestmentNews() {
  const { user } = useAuth();
  const { news } = useLocalSearchParams();
  const id = news as string;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiInvestmentGetNews({
        id: id,
        category: "one-news",
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
          title: "Detail Berita",
          headerLeft: () => <BackButton />,
          headerRight: () =>
            user?.id === data?.authorId && (
              <DotButton onPress={() => setOpenDrawer(true)} />
            ),
        }}
      />
      <ViewWrapper>
        <BaseBox>
          <StackCustom>
            {data && data?.imageId && (
              <DummyLandscapeImage imageId={data?.imageId || ""} />
            )}
            <TextCustom bold align="center" size="large">
              {(data && data?.title) || "-"}
            </TextCustom>
            <TextCustom>{(data && data?.deskripsi) || "-"}</TextCustom>
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
              label: "Hapus Berita",
              path: ``,
              icon: <IconTrash />,
              color: "red",
            },
          ]}
          onPressItem={(item) => {
            AlertDefaultSystem({
              title: "Hapus Berita",
              message: "Apakah Anda yakin ingin menghapus berita ini?",
              textLeft: "Batal",
              textRight: "Hapus",
              onPressRight: async () => {
                try {
                  const response = await apiInvestmentDeleteNews({ id });
                
                  if (response.success) {
                    Toast.show({
                      type: "success",
                      text1: "Berita berhasil dihapus",
                    });
                    router.back();
                    setOpenDrawer(false);
                  } else {
                    Toast.show({
                      type: "error",
                      text1: "Gagal menghapus berita",
                    });
                  }
                } catch (error) {
                  console.log("[ERROR]", error);
                }
              },
            });
          }}
        />
      </DrawerCustom>
    </>
  );
}
