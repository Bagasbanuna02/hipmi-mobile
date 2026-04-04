/* eslint-disable react-hooks/exhaustive-deps */
import { BaseBox, NewWrapper_V2, TextCustom, ViewWrapper } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { apiJobGetAll } from "@/service/api-client/api-job";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useState } from "react";
import { RefreshControl } from "react-native";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";

export default function Job_ScreenArchive2() {
  const { user } = useAuth();

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!user?.id) return { data: [] };

      return await apiJobGetAll({
        category: "archive",
        authorId: user?.id,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [user?.id],
    onError: (error) => console.error("[ERROR] Fetch job archive:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    emptyMessage: "Anda tidak memiliki arsip",
    skeletonCount: PAGINATION_DEFAULT_TAKE,
    skeletonHeight: 80,
  });

  // Render item job
  const renderJobItem = ({ item }: { item: any }) => (
    <BaseBox
      key={item.id}
      paddingTop={20}
      paddingBottom={20}
      href={`/job/${item.id}/archive`}
    >
      <TextCustom align="center" bold truncate size="large">
        {item?.title || "-"}
      </TextCustom>
    </BaseBox>
  );

  return (
    <NewWrapper_V2
      contentPaddingHorizontal={16}
      listData={pagination.listData}
      renderItem={renderJobItem}
      refreshControl={
        <RefreshControl
          tintColor={MainColor.yellow}
          colors={[MainColor.yellow]}
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      hideFooter
    />
  );
}
