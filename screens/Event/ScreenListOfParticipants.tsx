/* eslint-disable react-hooks/exhaustive-deps */
import {
    AvatarUsernameAndOtherComponent,
    BadgeCustom,
    BaseBox
} from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import {
    apiEventGetOne,
    apiEventListOfParticipants,
} from "@/service/api-client/api-event";
import dayjs, { Dayjs } from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";

export default function Event_ScreenListOfParticipants() {
  const { id } = useLocalSearchParams();
  const [startDate, setStartDate] = useState<Dayjs | undefined>();

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiEventListOfParticipants({
        id: id as string,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
    onError: (error) =>
      console.error("[ERROR] Fetch event participants:", error),
  });

  useEffect(() => {
    onLoadData();
  }, []);

  // Fetch event data separately (not part of pagination)
  //   useFocusEffect(() => {
  //     onLoadData();
  //     pagination.onRefresh();
  //   });

  const onLoadData = async () => {
    try {
      const response = await apiEventGetOne({ id: id as string });
      if (response.success) {
        const date = dayjs(response.data.tanggal);
        setStartDate(date);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Belum ada peserta",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  // Render item participant
  const renderParticipantItem = ({ item }: { item: any }) => (
    <BaseBox key={item.id}>
      <AvatarUsernameAndOtherComponent
        avatar={item?.User?.Profile?.imageId}
        name={item?.User?.username}
        avatarHref={`/profile/${item?.User?.Profile?.id}`}
        rightComponent={
          startDate && startDate.subtract(1, "hour").diff(dayjs()) < 0 ? (
            <View
              style={{
                justifyContent: "flex-end",
              }}
            >
              <BadgeCustom color={item?.isPresent ? "green" : "red"}>
                {item?.isPresent ? "Hadir" : "Tidak Hadir"}
              </BadgeCustom>
            </View>
          ) : (
            <View
              style={{
                justifyContent: "flex-end",
              }}
            >
              <BadgeCustom color="gray">-</BadgeCustom>
            </View>
          )
        }
      />
    </BaseBox>
  );

  return (
    <NewWrapper
      listData={pagination.listData}
      renderItem={renderParticipantItem}
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
  );
}
