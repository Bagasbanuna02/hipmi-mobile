/* eslint-disable react-hooks/exhaustive-deps */
import { FloatingButton, SearchInput } from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { apiVotingGetAll } from "@/service/api-client/api-voting";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { RefreshControl } from "react-native";

export default function Voting_ScreenBeranda() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      return await apiVotingGetAll({
        search: searchQuery || "",
        category: "beranda",
        userLoginId: user?.id,
        page: String(page),
      });
    },
    pageSize: 5,
    searchQuery: search,
    dependencies: [user?.id],
    onError: (error) => console.error("[ERROR] Fetch voting:", error),
  });

  // Gunakan helper untuk membuat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: search,
      emptyMessage: "Tidak ada data",
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
            href={`/voting/${item.id}`}
          />
        ),
    [],
  );

  return (
    <NewWrapper
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
      floatingButton={
        <FloatingButton onPress={() => router.push("/voting/create")} />
      }
      headerComponent={
        <SearchInput placeholder="Cari voting" onChangeText={setSearch} />
      }
    />
  );
}
