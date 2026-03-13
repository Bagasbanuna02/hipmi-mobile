/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  BaseBox,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  NewWrapper,
  ScrollableCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconDot } from "@/components/_Icon/IconComponent";
import ListSkeletonComponent from "@/components/_ShareComponent/ListSkeletonComponent";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { apiGetNotificationsById } from "@/service/api-notifications";
import { listOfcategoriesAppNotification } from "@/types/type-notification-category";
import { formatChatTime } from "@/utils/formatChatTime";
import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";

const selectedCategory = (value: string) => {
  const category = listOfcategoriesAppNotification.find(
    (c) => c.value === value,
  );
  return category?.label;
};

const fixPath = ({
  deepLink,
  categoryApp,
}: {
  deepLink: string;
  categoryApp: string;
}) => {
  if (categoryApp === "OTHER") {
    return deepLink;
  }

  const separator = deepLink.includes("?") ? "&" : "?";

  const fixedPath = `${deepLink}${separator}from=notifications&category=${_.lowerCase(
    categoryApp,
  )}`;

  console.log("Fix Path", fixedPath);

  return fixedPath;
};

const BoxNotification = ({
  data,
  activeCategory,
  setListData,
}: {
  data: any;
  activeCategory: string | null;
  setListData: (data: any) => void;
}) => {
  // console.log("DATA NOTIFICATION", JSON.stringify(data, null, 2));
  const { markAsRead } = useNotificationStore();
  return (
    <>
      <BaseBox
        backgroundColor={data.isRead ? AccentColor.darkblue : AccentColor.blue}
        onPress={() => {
          // console.log(
          //   "Notification >",
          //   selectedCategory(activeCategory as string)
          // );
          const newPath = fixPath({
            deepLink: data.deepLink,
            categoryApp: data.kategoriApp,
          });

          router.navigate(newPath as any);
          selectedCategory(activeCategory as string);

          if (!data.isRead) {
            markAsRead(data.id);
            const updatedData = {
              ...data,
              isRead: true,
            };

            console.log("Updated Data", updatedData);
            setListData((prev: any) =>
              prev.map((item: any) =>
                item.id === data.id ? updatedData : item,
              ),
            );
          }
        }}
      >
        <StackCustom>
          <TextCustom truncate={2} bold>
            {data.title}
          </TextCustom>

          <TextCustom truncate={2}>{data.pesan}</TextCustom>

          <TextCustom size="small" color="gray">
            {formatChatTime(data.createdAt)}
          </TextCustom>
        </StackCustom>
      </BaseBox>
    </>
  );
};

export default function ScreenNotification_V1() {
  const { user } = useAuth();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    category || "event",
  );
  const [listData, setListData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { markAsReadAll } = useNotificationStore();

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // Reset pagination saat kategori berubah
    setListData([]);
    setPage(1);
    setHasMore(true);
  };

  //   useFocusEffect(
  //     useCallback(() => {
  //       fecthData(1, true);
  //     }, [activeCategory])
  //   );

  useEffect(() => {
    fecthData(1, true);
  }, [activeCategory]);

  const fecthData = async (pageNum: number, clear: boolean = false) => {
    if (pageNum === 1 && !clear) return; // Hindari duplicate call untuk page 1

    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await apiGetNotificationsById({
        id: user?.id as any,
        category: activeCategory as any,
        page: String(pageNum),
      });

      if (response.success) {
        if (clear || pageNum === 1) {
          setListData(response.data);
        } else {
          setListData((prev) => [...prev, ...response.data]);
        }

        // Jika data yang dikembalikan kurang dari ukuran halaman, maka tidak ada halaman berikutnya
        setHasMore(response.data.length >= 10); // Asumsikan ukuran halaman 10
      } else {
        if (pageNum === 1) {
          setListData([]);
        }
      }
    } catch (error) {
      console.log("Error Notification", error);
      if (pageNum === 1) {
        setListData([]);
      }
    } finally {
      if (pageNum === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fecthData(1, true);
    setRefreshing(false);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fecthData(nextPage, false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Notifikasi"
              left={<BackButton />}
              right={
                <IconDot
                  color={MainColor.yellow}
                  onPress={() => setOpenDrawer(true)}
                />
              }
            />
          ),
        }}
      />

      <NewWrapper
        hideFooter
        headerComponent={
          <ScrollableCustom
            data={listOfcategoriesAppNotification.map((e, i) => ({
              id: i,
              label: e.label,
              value: e.value,
            }))}
            onButtonPress={handlePress}
            activeId={activeCategory as string}
          />
        }
        listData={listData}
        renderItem={({ item }) => (
          <View key={item.id}>
            <BoxNotification
              data={item}
              activeCategory={activeCategory as any}
              setListData={setListData}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        // onEndReachedThreshold={0.1}
        ListEmptyComponent={
          loading ? (
            <ListSkeletonComponent />
          ) : (
            <NoDataText text="Belum ada notifikasi" />
          )
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={{ padding: 16, alignItems: "center" }}>
              <LoaderCustom />
            </View>
          ) : null
        }
      />

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Tandai Semua Dibaca",
              value: "read-all",
              icon: (
                <Ionicons
                  name="reader-outline"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              path: "",
            },
          ]}
          onPressItem={(item: any) => {
            console.log("Item", item.value);
            if (item.value === "read-all") {
              AlertDefaultSystem({
                title: "Tandai Semua Dibaca",
                message:
                  "Apakah Anda yakin ingin menandai semua notifikasi dibaca?",
                textLeft: "Batal",
                textRight: "Ya",
                onPressRight: () => {
                  markAsReadAll(user?.id as any);
                  const data = _.cloneDeep(listData);
                  data.forEach((e) => {
                    e.isRead = true;
                  });
                  setListData(data);
                  onRefresh();
                  setOpenDrawer(false);
                },
              });
            }
          }}
        />
      </DrawerCustom>
    </>
  );
}
