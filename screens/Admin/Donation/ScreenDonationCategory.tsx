import { BadgeCustom, TextCustom } from "@/components";
import AdminActionIconPlus from "@/components/_ShareComponent/Admin/ActionIconPlus";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminMasterDonationCategory } from "@/service/api-admin/api-master-admin";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";
import Admin_BoxDonationCategory from "./BoxDonationCategory";

export function Admin_ScreenDonationCategory() {
  const [search, setSearch] = useState<string>("");

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminMasterDonationCategory({
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

  // Komponen action plus untuk header
  const rightComponent = useMemo(
    () => (
      <AdminActionIconPlus
        onPress={() => {
          router.push(`/admin/donation/category-create`);
        }}
      />
    ),
    [],
  );

  // Header component untuk title
  const headerComponent = useMemo(
    () => (
      <AdminComp_BoxTitle
        title="Kategori Donasi"
        rightComponent={rightComponent}
      />
    ),
    [rightComponent],
  );

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, []),
  );

  // Render item untuk daftar kategori donasi
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Admin_BoxDonationCategory key={index} item={item} />
    ),
    [],
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
