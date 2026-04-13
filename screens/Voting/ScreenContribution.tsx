/* eslint-disable react-hooks/exhaustive-deps */
import { OS_Wrapper } from "@/components";
import { PADDING_INLINE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { apiVotingGetAll } from "@/service/api-client/api-voting";
import { useMemo } from "react";
import { RefreshControl } from "react-native";

export default function Voting_ScreenContribution() {
  const { user } = useAuth();

  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiVotingGetAll({
        category: "contribution",
        authorId: user?.id as string,
        page: String(page),
      });
    },
    pageSize: 4,
    dependencies: [user?.id],
    onError: (error) => console.error("[ERROR] Fetch contribution:", error),
  });

  // Gunakan helper untuk membuat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Tidak ada kontribusi",
      emptySearchMessage: "Tidak ada hasil pencarian",
      skeletonCount: 5,
      skeletonHeight: 200,
      isInitialLoad: pagination.isInitialLoad,
    });

  // Render item untuk FlatList
  const renderItem = useMemo(
    () =>
      ({ item }: { item: any }) =>
        (
          <Voting_BoxPublishSection
            data={item}
            key={item.id}
            href={`/voting/${item.id}/contribution`}
          />
        ),
    [],
  );

  return (
    <OS_Wrapper
      contentPadding={PADDING_INLINE}
      listData={pagination.listData}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={pagination.loadMore}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      hideFooter
    />
  );
}
