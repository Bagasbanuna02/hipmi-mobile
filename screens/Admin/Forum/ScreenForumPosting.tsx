import {
  SearchInput, StackCustom,
  TextCustom
} from "@/components";
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
import { RefreshControl, View } from "react-native";
import { Divider } from "react-native-paper";

export function Admin_ScreenForumPosting() {
  const [search, setSearch] = useState("");

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminForum({
        category: "posting",
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
        placeholder="Cari postingan"
        value={search}
        onChangeText={setSearch}
      />
    ),
    [search],
  );

  // Header component
  const headerComponent = useMemo(
    () => (
      <AdminComp_BoxTitle
        title={"Forum Posting"}
        rightComponent={searchComponent}
      />
    ),
    [searchComponent],
  );

  // Render item untuk daftar posting
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <AdminBasicBox
        style={{ marginHorizontal: 5, marginVertical: 5 }}
        onPress={() => {
          router.push(`/admin/forum/${item.id}`);
        }}
      >
        <StackCustom gap={0}>
          <View style={{ paddingBlock: 8 }}>
            <TextCustom size={"large"} bold truncate={2}>
              {item?.diskusi || "-"}
            </TextCustom>
          </View>
          <Divider />
          <GridSpan_4_8
            label={<TextCustom>Komentar</TextCustom>}
            value={
              <TextCustom truncate={1}>{item?.komentar || "-"}</TextCustom>
            }
          />
          <GridSpan_4_8
            label={<TextCustom>Report</TextCustom>}
            value={
              <TextCustom truncate={1}>{item?.reportPosting || "-"}</TextCustom>
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
      emptyMessage: "Belum ada data posting",
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
