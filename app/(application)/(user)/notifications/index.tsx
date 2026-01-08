/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  NewWrapper,
  ScrollableCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import ListSkeletonComponent from "@/components/_ShareComponent/ListSkeletonComponent";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { AccentColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { apiGetNotificationsById } from "@/service/api-notifications";
import { listOfcategoriesAppNotification } from "@/types/type-notification-category";
import { formatChatTime } from "@/utils/formatChatTime";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { RefreshControl, View } from "react-native";

const selectedCategory = (value: string) => {
  const category = listOfcategoriesAppNotification.find(
    (c) => c.value === value
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

  const fixedPath =
    `${deepLink}${separator}from=notifications&category=${_.lowerCase(categoryApp)}`;

  console.log("Fix Path", fixedPath);

  return fixedPath;
};

const BoxNotification = ({
  data,
  activeCategory,
}: {
  data: any;
  activeCategory: string | null;
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

          router.replace(newPath as any);
          selectedCategory(activeCategory as string);

          if (!data.isRead) {
            markAsRead(data.id);
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

export default function Notifications() {
  const { user } = useAuth();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    category || "event"
  );
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
            <BoxNotification data={e} activeCategory={activeCategory as any} />
          </View>
        ))
      )}
    </NewWrapper>
  );
}
