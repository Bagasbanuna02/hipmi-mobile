/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  BaseBox,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  NewWrapper,
  ScrollableCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import { IconDot } from "@/components/_Icon/IconComponent";
import { AccentColor, MainColor } from "@/constants/color-palet";
import {
  ICON_SIZE_SMALL,
  PAGINATION_DEFAULT_TAKE,
} from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { usePagination } from "@/hooks/use-pagination";
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
import { useCallback, useState } from "react";
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
  const { markAsRead } = useNotificationStore();
  return (
    <>
      <BaseBox
        backgroundColor={data.isRead ? AccentColor.darkblue : AccentColor.blue}
        onPress={() => {
          const newPath = fixPath({
            deepLink: data.deepLink,
            categoryApp: data.kategoriApp,
          });

          router.navigate(newPath as any);
          selectedCategory(activeCategory as string);

          if (!data.isRead) {
            markAsRead(data.id);
            setListData((prev: any) =>
              prev.map((item: any) =>
                item.id === data.id ? { ...item, isRead: true } : item,
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

export default function ScreenNotification() {
  const { user } = useAuth();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    category || "event",
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const { markAsReadAll } = useNotificationStore();

  // Initialize pagination for notifications
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!user?.id) return { data: [] };

      return await apiGetNotificationsById({
        id: user?.id as string,
        category: activeCategory as any,
        page: String(page), // API expects string
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [activeCategory],
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     // Reset and load first page when category changes
  //     pagination.reset();
  //     pagination.onRefresh();
  //   }, [activeCategory]),
  // );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // Reset and load first page when category changes
    // pagination.reset();
    // pagination.onRefresh();
  };

  // Render individual notification item
  const renderItem = ({ item }: { item: any }) => (
    <View key={item.id}>
      <BoxNotification
        data={item}
        activeCategory={activeCategory as any}
        setListData={pagination.setListData}
      />
    </View>
  );

  // Generate pagination components using helper
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Belum ada notifikasi",
      skeletonCount: 5,
      skeletonHeight: 100,
    });

  return (
    <>
      <Stack.Screen
        options={{
          title: "Notifikasi",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <IconDot
              color={MainColor.yellow}
              onPress={() => setOpenDrawer(true)}
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
        listData={pagination.listData}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={pagination.refreshing}
            onRefresh={pagination.onRefresh}
          />
        }
        onEndReached={pagination.loadMore}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
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
            // console.log("Item", item.value);
            if (item.value === "read-all") {
              AlertDefaultSystem({
                title: "Tandai Semua Dibaca",
                message:
                  "Apakah Anda yakin ingin menandai semua notifikasi dibaca?",
                textLeft: "Batal",
                textRight: "Ya",
                onPressRight: () => {
                  // Reset and refresh data after marking all as read
                  markAsReadAll(user?.id as any);
                  const data = _.cloneDeep(pagination.listData);
                  data.forEach((e) => {
                    e.isRead = true;
                  });
                  pagination.setListData(data);
                  pagination.onRefresh();
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
