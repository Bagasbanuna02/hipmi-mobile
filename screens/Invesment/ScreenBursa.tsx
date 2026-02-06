import {
  FloatingButton,
  TextCustom,
} from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import Investment_BoxBerandaSection from "@/screens/Invesment/BoxBerandaSection";
import { apiInvestmentGetAll } from "@/service/api-client/api-investment";
import { router } from "expo-router";
import _ from "lodash";
import { RefreshControl } from "react-native";

export default function Investment_ScreenBursa() {
  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiInvestmentGetAll({
        category: "bursa",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [],
    onError: (error) => console.error("[ERROR] Fetch investment bursa:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    emptyMessage: "Belum ada investasi",
    skeletonCount: PAGINATION_DEFAULT_TAKE,
    skeletonHeight: 100,
  });

  // Render item investment
  const renderInvestmentItem = ({ item }: { item: any }) => (
    <Investment_BoxBerandaSection
      key={item.id}
      id={item.id}
      data={item}
    />
  );

  return (
    <NewWrapper
      listData={pagination.listData}
      renderItem={renderInvestmentItem}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/investment/create")} />
      }
    />
  );
}
