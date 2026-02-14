import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminEventListOfParticipants } from "@/service/api-admin/api-admin-event";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { RefreshControl } from "react-native";
import { Admin_BoxEventParticipant } from "./BoxEventParticipant";

export function Admin_ScreenEventListOfParticipants() {
  const { id } = useLocalSearchParams();

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminEventListOfParticipants({
        id: id as string,
        page: String(page),
      });

      if (response.success) {
        return { data: response.data };
      } else {
        return { data: [] };
      }
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
    onError: (error) => {
      console.error("Error loading participants:", error);
    },
  });

  // Render item untuk daftar peserta
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Admin_BoxEventParticipant
        key={index}
        item={item}
        startDate={dayjs(item?.Event?.tanggal)}
      />
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
      emptyMessage: "Belum ada peserta",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 60,
    });

  return (
    <NewWrapper
      listData={pagination.listData}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      headerComponent={<AdminBackButtonAntTitle title="Daftar Peserta" />}
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
