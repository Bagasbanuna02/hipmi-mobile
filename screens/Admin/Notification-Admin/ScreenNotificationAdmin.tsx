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
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconPlus } from "@/components/_Icon";
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
import { router, Stack, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { RefreshControl, View } from "react-native";

const selectedCategory = (value: string) => {
  const category = listOfcategoriesAppNotification.find(
    (c) => c.value === value
  );
  return category?.label;
};

const BoxNotification = ({
  data,
  activeCategory,
}: {
  data: any;
  activeCategory: string | null;
}) => {
  const { markAsRead } = useNotificationStore();
  return (
    <>
      <BaseBox
        backgroundColor={data.isRead ? AccentColor.darkblue : AccentColor.blue}
        onPress={() => {
          console.log(
            "Notification >",
            selectedCategory(activeCategory as string)
          );
          router.push(data.deepLink);
          markAsRead(data.id);
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

export default function Admin_ScreenNotification() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>("event");
  const [listData, setListData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { markAsReadAll } = useNotificationStore();

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // tambahkan logika lain seperti filter dsb.
  };

  useFocusEffect(
    useCallback(() => {
      fecthData();
    }, [activeCategory])
  );

  const fecthData = async () => {
    try {
      setLoading(true);
      const response = await apiGetNotificationsById({
        id: user?.id as any,
        category: activeCategory as any,
      });

      if (response.success) {
        setListData(response.data);
      } else {
        setListData([]);
      }
    } catch (error) {
      console.log("Error Notification", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fecthData();
    setRefreshing(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Admin Notifikasi"
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ListSkeletonComponent />
        ) : _.isEmpty(listData) ? (
          <NoDataText text="Belum ada notifikasi" />
        ) : (
          listData.map((e, i) => (
            <View key={i}>
              <BoxNotification
                data={e}
                activeCategory={activeCategory as any}
              />
            </View>
          ))
        )}
      </NewWrapper>

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
