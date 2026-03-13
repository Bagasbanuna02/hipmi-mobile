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
import { IconPlus } from "@/components/_Icon";
import { IconDot } from "@/components/_Icon/IconComponent";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL, PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { usePagination } from "@/hooks/use-pagination";
import { apiGetNotificationsById } from "@/service/api-notifications";
import { listOfcategoriesAppNotification } from "@/types/type-notification-category";
import { formatChatTime } from "@/utils/formatChatTime";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useState } from "react";
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
  // Jika categoryApp adalah "OTHER", kembalikan deepLink tanpa perubahan
  if (categoryApp === "OTHER") {
    return deepLink;
  }

  // Jika dalam deepLink terdapat "/admin/", kembalikan path tersebut tanpa modifikasi tambahan
  if (deepLink.includes("/admin/")) {
    return deepLink;
  }

  console.log("Category App", categoryApp);
  console.log("Deep Link", deepLink);

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

          selectedCategory(activeCategory as string);
          router.navigate(newPath as any);

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

export default function Admin_ScreenNotification2() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>("event");
  const [openDrawer, setOpenDrawer] = useState(false);

  const { markAsReadAll } = useNotificationStore();

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!user?.id) return { data: [] };

      return await apiGetNotificationsById({
        id: user?.id as any,
        category: activeCategory as any,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [user?.id, activeCategory],
    onError: (error) =>
      console.error("[ERROR] Fetch admin notifications:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Belum ada notifikasi",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  // Render item notification
  const renderNotificationItem = ({ item }: { item: any }) => (
    <View key={item.id}>
      <BoxNotification
        data={item}
        activeCategory={activeCategory as any}
        setListData={pagination.setListData}
      />
    </View>
  );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // Reset pagination saat kategori berubah
    pagination.reset();
  };

  return (
    <>
      <Stack.Screen
        options={{
          // title: "Admin Notifikasi",
          header: () => (
            <AppHeader
              title="Admin Notifikasi"
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
        renderItem={renderNotificationItem}
        refreshControl={
          <RefreshControl
            tintColor={MainColor.yellow}
            colors={[MainColor.yellow]}
            refreshing={pagination.refreshing}
            onRefresh={pagination.onRefresh}
          />
        }
        onEndReached={pagination.loadMore}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
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
