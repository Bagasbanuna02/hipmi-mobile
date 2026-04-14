import { OS_Wrapper, SearchInput } from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import {
  PAGINATION_DEFAULT_TAKE
} from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminVoting } from "@/service/api-admin/api-admin-voting";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import Admin_BoxVotingStatus from "./BoxVotingStatus";

export function Admin_ScreenVotingHistory() {
  const [search, setSearch] = useState<string>("");

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminVoting({
        category: "history",
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
    dependencies: [],
  });

  // Komponen search input untuk header
  const rightComponent = useMemo(
    () => (
      <SearchInput
        containerStyle={{ width: "100%", marginBottom: 0 }}
        placeholder="Cari"
        value={search}
        onChangeText={(value) => setSearch(value)}
      />
    ),
    [search],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Admin_BoxVotingStatus
        key={index}
        item={item}
        path={`/admin/voting/${item.id}/history`}
      />
    ),
    [],
  );

  // Header component dengan judul voting history
  const headerComponent = useMemo(
    () => (
      <AdminComp_BoxTitle title="Riwayat" rightComponent={rightComponent} />
    ),
    [rightComponent],
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
      skeletonHeight: 80,
    });

  return (
    <OS_Wrapper
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
