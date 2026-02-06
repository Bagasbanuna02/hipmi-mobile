/* eslint-disable react-hooks/exhaustive-deps */
import { TextCustom } from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import Investment_BoxDetailDocument from "@/screens/Invesment/Document/RecapBoxDetail";
import { apiInvestmentGetDocument } from "@/service/api-client/api-investment";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback } from "react";
import { RefreshControl } from "react-native";

export default function Investment_ScreenListOfDocument() {
  const { id } = useLocalSearchParams();
  console.log("ID >> ", id);

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!id) return { data: [] };

      return await apiInvestmentGetDocument({
        id: id as string,
        category: "all-document",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
    onError: (error) => console.error("[ERROR] Fetch document:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Tidak ada dokumen",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  // Render item dokumen
  const renderDocumentItem = ({ item }: { item: any }) => (
    <Investment_BoxDetailDocument
      key={item.id}
      title={item.title}
      href={`/(file)/${item.fileId}`}
    />
  );

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [id]),
  );

  return (
    <NewWrapper
      hideFooter
      listData={pagination.listData}
      renderItem={renderDocumentItem}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
}
