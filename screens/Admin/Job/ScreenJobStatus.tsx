import { OS_Wrapper, SearchInput } from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminJob } from "@/service/api-admin/api-admin-job";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import { Divider } from "react-native-paper";
import { BoxStatusJob } from "./BoxStatusJob";

export function Admin_ScreenJobStatus() {
  const { status } = useLocalSearchParams();
  const [search, setSearch] = useState("");

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminJob({
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

  // Komponen kanan untuk header
  const rightComponent = useMemo(
    () => (
      <SearchInput
        placeholder="Cari perkerjaan"
        onChangeText={setSearch}
        value={search}
      />
    ),
    [search],
  );

  // Render item untuk daftar pekerjaan
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <BoxStatusJob key={index} item={item} status={status as string} />
    ),
    [status],
  );

  const headerComponent = useMemo(
    () => (
      <AdminComp_BoxTitle
        title={`Job ${_.startCase(status as string)}`}
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
      emptyMessage: "Tidak ada data",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  return (
    <OS_Wrapper
      listData={pagination.listData}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      headerComponent={headerComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={pagination.loadMore}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
          tintColor={MainColor.yellow}
          colors={[MainColor.yellow]}
        />
      }
    />
  );
}
