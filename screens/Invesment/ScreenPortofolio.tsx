/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollableCustom, TextCustom } from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import Investment_StatusBox from "@/screens/Invesment/StatusBox";
import { apiInvestmentGetByStatus } from "@/service/api-client/api-investment";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";

export default function Investment_ScreenPortofolio() {
  const { user } = useAuth();
  const { status } = useLocalSearchParams<{ status?: string }>();

  const [activeCategory, setActiveCategory] = useState<string | null>(
    status || "publish",
  );

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!user?.id) return { data: [] };

      return await apiInvestmentGetByStatus({
        authorId: user.id,
        status: activeCategory!,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [user?.id, activeCategory],
    onError: (error) =>
      console.error("[ERROR] Fetch investment by status:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: `Tidak ada data ${activeCategory}`,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 150,
    });

  // Render item investment
  const renderInvestmentItem = ({ item }: { item: any }) => (
    <Investment_StatusBox
      key={item.id}
      data={item}
      status={activeCategory as string}
      href={`/investment/${item.id}/${activeCategory}/detail`}
    />
  );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // Reset pagination saat kategori berubah
    pagination.reset();
  };

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [activeCategory]),
  );

  const tabsComponent = (
    <ScrollableCustom
      data={dummyMasterStatus.map((e, i) => ({
        id: i,
        label: e.label,
        value: e.value,
      }))}
      onButtonPress={handlePress}
      activeId={activeCategory as any}
    />
  );

  return (
    <NewWrapper
      hideFooter
      headerComponent={tabsComponent}
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
    />
  );
}
