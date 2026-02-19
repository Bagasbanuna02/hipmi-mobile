import { SearchInput } from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import {
  PAGINATION_DEFAULT_TAKE,
} from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminInvestment } from "@/service/api-admin/api-admin-investment";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import Admin_BoxInvestmentStatus from "./BoxInvestmentStatus";

export function Admin_ScreenInvestmentStatus() {
  const { status } = useLocalSearchParams();
  const [search, setSearch] = useState<string>("");

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminInvestment({
        category: status as "publish" | "review" | "reject",
        search: searchQuery,
        page: String(page),
      });

      if (response.success) {
        return { data: response.data };
      } else {
        return { data: [] };
      }
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    searchQuery: search,
    dependencies: [status],
  });

  // Komponen search input untuk header
  const rightComponent = useMemo(
    () => (
      <SearchInput
        containerStyle={{ width: "100%", marginBottom: 0 }}
        placeholder="Cari judul investasi"
        value={search}
        onChangeText={(value) => setSearch(value)}
      />
    ),
    [search],
  );

  // Render item untuk daftar investasi menggunakan Box Component
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Admin_BoxInvestmentStatus
        key={index}
        item={item}
        status={status as string}
      />
    ),
    [status],
  );

  // Header component dengan judul status investasi
  const headerComponent = useMemo(
    () => (
      <AdminComp_BoxTitle
        title={`Investasi ${_.startCase(status as string)}`}
        rightComponent={rightComponent}
      />
    ),
    [status, rightComponent],
  );

  // Buat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: search,
      emptyMessage: "Belum ada data",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 120,
    });

  return (
    <NewWrapper
      listData={pagination.listData}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id?.toString() || `fallback-${item.id}`}
      headerComponent={headerComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={pagination.loadMore}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
          tintColor="#E1B525"
          colors={["#E1B525"]}
        />
      }
    />
  );
}
