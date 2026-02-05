/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  BaseBox,
  ScrollableCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import { apiVotingGetByStatus } from "@/service/api-client/api-voting";
import { dateTimeView } from "@/utils/dateTimeView";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, View } from "react-native";

const PAGE_SIZE = 6

export default function Voting_ScreenStatus() {
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

      return await apiVotingGetByStatus({
        id: id as string,
        status: activeCategory!,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id, activeCategory],
    onError: (error) => console.error("[ERROR] Fetch voting by status:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: `Tidak ada data ${activeCategory}`,
      skeletonCount: 5,
      skeletonHeight: 100,
    });

  // Render item voting
  const renderVotingItem = ({ item }: { item: any }) => (
    <BaseBox
      key={item.id}
      paddingTop={20}
      paddingBottom={20}
      href={`/voting/${item.id}/${activeCategory}/detail`}
    >
      <StackCustom>
        <TextCustom align="center" bold truncate={2} size="large">
          {item?.title || ""}
        </TextCustom>
        <BadgeCustom
          style={{ width: "70%", alignSelf: "center" }}
          variant="light"
        >
          {item?.awalVote &&
            dateTimeView({
              date: item?.awalVote,
              withoutTime: true,
            })}{" "}
          -{" "}
          {item?.akhirVote &&
            dateTimeView({ date: item?.akhirVote, withoutTime: true })}
        </BadgeCustom>
      </StackCustom>
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
    <NewWrapper
      headerComponent={<View style={{ paddingTop: 8 }}>{scrollComponent}</View>}
      listData={pagination.listData}
      renderItem={renderVotingItem}
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
