/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxWithHeaderSection,
  Grid,
  ScrollableCustom,
  StackCustom,
  TextCustom,
  OS_Wrapper,
} from "@/components";
import { PAGINATION_DEFAULT_TAKE, PADDING_INLINE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import { apiEventGetByStatus } from "@/service/api-client/api-event";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, View } from "react-native";

export default function Event_ScreenStatus() {
  const { user } = useAuth();
  const { status } = useLocalSearchParams<{ status?: string }>();

  const id = user?.id || "";
  const [activeCategory, setActiveCategory] = useState<string | null>(
    status || "publish",
  );

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!id) return { data: [] };

      return await apiEventGetByStatus({
        id: id!,
        status: activeCategory!,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id, activeCategory],
    onError: (error) => console.error("[ERROR] Fetch event by status:", error),
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

  // Render item event
  const renderEventItem = ({ item }: { item: any }) => (
    <BoxWithHeaderSection
      key={item.id}
      href={`/event/${item.id}/${activeCategory}/detail-event`}
    >
      <StackCustom gap={"xs"}>
        <Grid>
          <Grid.Col span={8}>
            <TextCustom truncate bold>
              {item?.title}
            </TextCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
            <TextCustom>
              {new Date(item?.tanggal).toLocaleDateString()}
            </TextCustom>
          </Grid.Col>
        </Grid>

        <TextCustom truncate={2}>{item?.deskripsi}</TextCustom>
      </StackCustom>
    </BoxWithHeaderSection>
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

  const tabsComponent = (
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
      hideFooter
      contentPadding={PADDING_INLINE}
      headerComponent={<View style={{ paddingTop: 8 }}>{tabsComponent}</View>}
      listData={pagination.listData}
      renderItem={renderEventItem}
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
