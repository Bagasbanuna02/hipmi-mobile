import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import OS_Wrapper from "@/components/_ShareComponent/OS_Wrapper";
import { PAGINATION_DEFAULT_TAKE, PADDING_INLINE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminDonationDisbursementOfFundsListById } from "@/service/api-admin/api-admin-donation";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";
import { RefreshControl } from "react-native";
import Admin_BoxDonationListDisbursementOfFunds from "./BoxDonationListDisbursementOfFunds";

export function Admin_ScreenDonationListDisbursementOfFunds() {
  const { id } = useLocalSearchParams();

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminDonationDisbursementOfFundsListById({
        id: id as string,
        category: "get-all",
        page: String(page),
      });

      if (response.success) {
        return { data: response.data };
      } else {
        return { data: [] };
      }
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    searchQuery: "",
    dependencies: [id],
  });

  // Header component dengan back button dan title
  const headerComponent = useMemo(
    () => <AdminBackButtonAntTitle title="Daftar Pencairan Dana" />,
    [],
  );

  // Render item untuk daftar pencairan dana
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Admin_BoxDonationListDisbursementOfFunds key={index} item={item} />
    ),
    [],
  );

  // Buat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: "",
      emptyMessage: "Belum ada data",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
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
