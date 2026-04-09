import { OS_Wrapper, TextCustom } from "@/components";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { MainColor } from "@/constants/color-palet";
import { usePagination } from "@/hooks/use-pagination";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { apiGetPortofolio } from "@/service/api-client/api-portofolio";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { RefreshControl } from "react-native";
import Portofolio_BoxView from "./BoxPortofolioView";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { PADDING_INLINE, PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";

export default function ViewListPortofolio() {
  const { id } = useLocalSearchParams();

  // Initialize pagination for portfolio items
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiGetPortofolio({
        id: id as string,
        page: String(page), // API expects string
      });
      //   return response.data;
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
  });

  useFocusEffect(
    useCallback(() => {
      // Reset and load first page when id changes
      pagination.reset();
      pagination.onRefresh();
    }, [id]),
  );

  // Render individual portfolio item
  const renderItem = ({ item }: { item: any }) => (
    <Portofolio_BoxView key={item.id} data={item} />
  );

  // Generate pagination components using helper
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Tidak ada portofolio",
      skeletonCount: 3,
      skeletonHeight: 100,
    });

  return (
    <OS_Wrapper
      contentPadding={PADDING_INLINE}
      listData={pagination.listData}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          // IOS
          tintColor={MainColor.yellow}
          // Android
          colors={[MainColor.yellow]}
          progressBackgroundColor={MainColor.yellow}
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
