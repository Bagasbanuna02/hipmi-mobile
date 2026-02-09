/* eslint-disable react-hooks/exhaustive-deps */
import {
    BaseBox,
    ProgressCustom,
    StackCustom,
    TextCustom
} from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { apiInvestmentGetAll } from "@/service/api-client/api-investment";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { RefreshControl } from "react-native";

export default function Investment_ScreenMyHolding() {
  const { user } = useAuth();

  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiInvestmentGetAll({
        category: "my-holding",
        authorId: user?.id,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [user?.id],
    onError: (error) => console.error("[ERROR] Fetch my holding:", error),
  });

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [user?.id]),
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <BaseBox
      paddingTop={7}
      paddingBottom={7}
      onPress={() =>
        router.push(`/investment/${item?.id}/(my-holding)/${item?.id}`)
      }
    >
      <StackCustom>
        <TextCustom truncate={2}>{item?.title}</TextCustom>
        <TextCustom>Rp. {formatCurrencyDisplay(item?.nominal)}</TextCustom>
        <TextCustom>{item?.lembarTerbeli} Lembar</TextCustom>
        <ProgressCustom
          label={`${item.progress}%`}
          value={Number(item.progress)}
          size="lg"
          animated
          color="primary"
        />
      </StackCustom>
    </BaseBox>
  );

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Tidak ada investasi yang dimiliki",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 120,
    });

  return (
    <NewWrapper
      listData={pagination.listData}
      renderItem={renderItem}
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
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
