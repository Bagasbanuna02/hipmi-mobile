/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  BaseBox,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { apiInvestmentGetInvoice } from "@/service/api-client/api-investment";
import { GStyles } from "@/styles/global-styles";
import { formatChatTime } from "@/utils/formatChatTime";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback } from "react";
import { RefreshControl, View } from "react-native";

export default function Investment_ScreenTransaction() {
  const { user } = useAuth();

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!user?.id) return { data: [] };

      return await apiInvestmentGetInvoice({
        authorId: user.id,
        category: "transaction",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [user?.id],
    onError: (error) => console.error("[ERROR] Fetch transaction:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Tidak ada transaksi",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  const handlerColor = (status: string) => {
    if (status === "menunggu") {
      return "orange";
    } else if (status === "proses") {
      return "white";
    } else if (status === "berhasil") {
      return "green";
    } else if (status === "gagal") {
      return "red";
    }
  };

  const handlePress = ({ id, status }: { id: string; status: string }) => {
    console.log("ID", id);
    console.log("Status", status);
    if (status === "menunggu") {
      router.push(`/investment/${id}/(transaction-flow)/invoice`);
    } else if (status === "proses") {
      router.push(`/investment/${id}/(transaction-flow)/process`);
    } else if (status === "berhasil") {
      router.push(`/investment/${id}/(transaction-flow)/success`);
    } else if (status === "gagal") {
      router.push(`/investment/${id}/(transaction-flow)/failed`);
    }
  };

  // Render item transaksi
  const renderTransactionItem = ({ item }: { item: any }) => (
    <BaseBox
      key={item.id}
      paddingTop={7}
      paddingBottom={7}
      onPress={() => {
        handlePress({
          id: item.id,
          status: _.lowerCase(item.statusInvoice),
        });
      }}
    >
      <Grid>
        <Grid.Col span={6}>
          <StackCustom gap={"xs"}>
            <TextCustom truncate>{item?.title || "-"}</TextCustom>
            <TextCustom color="gray" size="small">
              {formatChatTime(item?.createdAt)}
            </TextCustom>
          </StackCustom>
        </Grid.Col>
        <Grid.Col span={1}>
          <View />
        </Grid.Col>
        <Grid.Col span={5} style={{ alignItems: "flex-end" }}>
          <StackCustom gap={"xs"}>
            <TextCustom bold truncate>
              Rp. {formatCurrencyDisplay(item?.nominal) || "-"}
            </TextCustom>
            <BadgeCustom
              variant="light"
              color={handlerColor(_.lowerCase(item.statusInvoice))}
              style={GStyles.alignSelfFlexEnd}
            >
              {item?.statusInvoice || "-"}
            </BadgeCustom>
          </StackCustom>
        </Grid.Col>
      </Grid>
    </BaseBox>
  );

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [user?.id])
  );

  return (
    <NewWrapper
      hideFooter
      listData={pagination.listData}
      renderItem={renderTransactionItem}
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
