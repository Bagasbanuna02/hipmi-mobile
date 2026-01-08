import {
  BackButton,
  BaseBox,
  NewWrapper,
  ScrollableCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import { IconPlus } from "@/components/_Icon";
import ListSkeletonComponent from "@/components/_ShareComponent/ListSkeletonComponent";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { apiGetNotificationsById } from "@/service/api-notifications";
import { listOfcategoriesAppNotification } from "@/types/type-notification-category";
import { formatChatTime } from "@/utils/formatChatTime";
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

export default function AdminNotification() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>("event");
  const [listData, setListData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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
          title: "Admin Notifikasi",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <IconPlus
              color={MainColor.yellow}
              onPress={() => router.push("/test-notifications")}
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
    </>
  );
}
