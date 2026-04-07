/* eslint-disable react-hooks/exhaustive-deps */
import { BaseBox, OS_Wrapper, ScrollableCustom, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE, PADDING_INLINE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import { apiJobGetByStatus } from "@/service/api-client/api-job";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, View } from "react-native";

export default function Job_MainViewStatus2() {
  const { user } = useAuth();
  const { status } = useLocalSearchParams<{ status?: string }>();
  console.log("STATUS", status);

  const [activeCategory, setActiveCategory] = useState<string | null>(
    status || "publish",
  );

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!user?.id) return { data: [] };

      return await apiJobGetByStatus({
        authorId: user?.id as string,
        status: activeCategory as string,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [user?.id, activeCategory],
    onError: (error) => console.error("[ERROR] Fetch job by status:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: `Tidak ada data ${activeCategory}`,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  // Render item job
  const renderJobItem = ({ item }: { item: any }) => (
    <BaseBox
      key={item.id}
      paddingTop={20}
      paddingBottom={20}
      href={`/job/${item?.id}/${activeCategory}/detail`}
    >
      <TextCustom align="center" bold truncate size="large">
        {item?.title}
      </TextCustom>
    </BaseBox>
  );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // Reset pagination saat kategori berubah
    pagination.reset();
  };
  
  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [activeCategory])
  );

  const scrollComponent = (
    <ScrollableCustom
      data={dummyMasterStatus.map((e, i) => ({
        id: i,
        label: e.label,
        value: e.value,
      }))}
      onButtonPress={handlePress}
      activeId={activeCategory as any}
    />
  );

  return (
    <OS_Wrapper
      headerComponent={<View style={{ paddingTop: 8 }}>{scrollComponent}</View>}
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
      contentPadding={PADDING_INLINE}
    />
  );
}
