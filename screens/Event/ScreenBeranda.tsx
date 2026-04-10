import { TextCustom, OS_Wrapper } from "@/components";
import FloatingButton from "@/components/Button/FloatingButton";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE, PADDING_INLINE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import Event_BoxPublishSection from "@/screens/Event/BoxPublishSection";
import { apiEventGetAll } from "@/service/api-client/api-event";
import { dateTimeView } from "@/utils/dateTimeView";
import { router } from "expo-router";
import { RefreshControl } from "react-native";


export default function Event_ScreenBeranda() {
  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiEventGetAll({
        category: "beranda",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [],
    onError: (error) => console.error("[ERROR] Fetch event beranda:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    emptyMessage: "Belum ada event",
    skeletonCount: PAGINATION_DEFAULT_TAKE,
    skeletonHeight: 100,
  });

  // Render item event
  const renderEventItem = ({ item }: { item: any }) => (
    <Event_BoxPublishSection
      key={item.id}
      href={`/event/${item.id}/publish`}
      data={item}
      rightComponentAvatar={
        <TextCustom>
          {dateTimeView({ date: item?.tanggal, withoutTime: true })}
        </TextCustom>
      }
    />
  );


  return (
    <OS_Wrapper
      contentPadding={PADDING_INLINE}
      listData={pagination.listData}
      renderItem={renderEventItem}
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
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/event/create")} />
      }
    />
  );
}
