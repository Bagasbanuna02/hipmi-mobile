import { SearchInput, StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminForum } from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";

export function Admin_ScreenForumReportComment() {
  const [search, setSearch] = useState("");

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminForum({
        category: "report_comment",
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

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, []),
  );

  // Komponen search input
  const searchComponent = useMemo(
    () => (
      <SearchInput
        containerStyle={{ width: "100%", marginBottom: 0 }}
        placeholder="Cari Komentar"
        value={search}
        onChangeText={setSearch}
      />
    ),
    [search],
  );

  // Header component dengan box title
  const headerComponent = useMemo(
    () => (
      <AdminComp_BoxTitle
        title="Report Komentar"
        rightComponent={searchComponent}
      />
    ),
    [searchComponent],
  );

  // Render item untuk daftar report comment
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <AdminBasicBox
        key={index}
        style={{ marginHorizontal: 5, marginVertical: 5 }}
        onPress={() => {
          router.push(
            `/admin/forum/${item?.Forum_Komentar?.id}/list-report-comment`,
          );
        }}
      >
        <StackCustom gap={0}>
           <GridTwoView
            spanLeft={5}
            spanRight={7}
            leftItem={<TextCustom>Jumlah Report</TextCustom>}
            rightItem={
              <TextCustom truncate={2}>
                {item?.count || "-"}
              </TextCustom>
            }
          />

            <GridTwoView
              spanLeft={5}
              spanRight={7}
              leftItem={<TextCustom>Komentar</TextCustom>}
              rightItem={
                <TextCustom truncate={2}>
                  {item?.Forum_Komentar?.komentar || "-"}
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
      emptyMessage: "Belum ada data report komentar",
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
          tintColor="#E1B525"
          colors={["#E1B525"]}
        />
      }
    />
  );
}
