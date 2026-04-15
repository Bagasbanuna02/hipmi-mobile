/* eslint-disable react-hooks/exhaustive-deps */
import { OS_Wrapper, StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import { PADDING_INLINE } from "@/constants/constans-value";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminForumCommentById } from "@/service/api-admin/api-admin-forum";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import { Divider } from "react-native-paper";

export function Admin_ScreenForumListComment() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [openDrawerAction, setOpenDrawerAction] = useState(false);
  const [selectedComment, setSelectedComment] = useState({
    id: "",
    komentar: "",
  });

  // Pagination untuk list comment
  const pagination = usePagination({
    fetchFunction: async (page) => {
      const response = await apiAdminForumCommentById({
        id: id as string,
        category: "get-all",
        page: String(page),
      });

      if (response.success) {
        return { data: response.data };
      }
      return { data: [] };
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
  });

  // Render item untuk daftar komentar
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <AdminBasicBox
        key={index}
        // style={{ marginHorizontal: 5, marginVertical: 5 }}
        onPress={() => {
          router.push(`/admin/forum/${item.id}/list-report-comment`);
        }}
      >
        <StackCustom gap={"md"}>
          <TextCustom truncate={1}>
            Report : {item?.countReport || 0}
          </TextCustom>
          <Divider />
          <TextCustom truncate={2}>{item?.komentar || "-"}</TextCustom>
        </StackCustom>
      </AdminBasicBox>
    ),
    [],
  );

  // Header component dengan back button
  const headerComponent = useMemo(
    () => <AdminBackButtonAntTitle title="Daftar Komentar" />,
    [],
  );

  // Buat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Belum ada komentar",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  return (
    <>
      <OS_Wrapper
        contentPadding={PADDING_INLINE}
        listData={pagination.listData}
        renderItem={renderItem}
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
    </>
  );
}
