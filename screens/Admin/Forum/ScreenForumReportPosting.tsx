import { SearchInput, StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminForum } from "@/service/api-admin/api-admin-forum";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";

export function Admin_ScreenForumReportPosting() {
  const [search, setSearch] = useState("");

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminForum({
        category: "report_posting",
        search: searchQuery || "",
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

  // Komponen search input
  const searchComponent = useMemo(
    () => (
      <SearchInput
        containerStyle={{ width: "100%", marginBottom: 0 }}
        placeholder="Cari Postingan"
        value={search}
        onChangeText={setSearch}
      />
    ),
    [search],
  );

  // Box title component
  const headerComponent = useMemo(
    () => (
      <AdminComp_BoxTitle
        title="Report Posting"
        rightComponent={searchComponent}
      />
    ),
    [searchComponent],
  );

  // Render item untuk daftar report posting
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <AdminBasicBox
        key={index}
        style={{ marginHorizontal: 5, marginVertical: 5 }}
        onPress={() => {
          router.push(
            `/admin/forum/${item?.Forum_Posting?.id}/list-report-posting`,
          );
        }}
      >
        <StackCustom gap={0}>
          <GridSpan_4_8
            label={<TextCustom>Pelapor</TextCustom>}
            value={
              <TextCustom truncate={1}>
                {item?.User?.username || "-"}
              </TextCustom>
            }
          />
          <GridSpan_4_8
            label={<TextCustom>Postingan</TextCustom>}
            value={
              <TextCustom truncate={2}>
                {item?.Forum_Posting?.diskusi || "-"}
              </TextCustom>
            }
          />
        </StackCustom>
      </AdminBasicBox>
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
      emptyMessage: "Belum ada data report posting",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
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
          tintColor={MainColor.yellow}
          colors={[MainColor.yellow]}
        />
      }
    />
  );
}
