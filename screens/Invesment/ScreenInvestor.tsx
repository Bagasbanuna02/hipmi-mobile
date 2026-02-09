/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  CenterCustom,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiInvestmentGetInvestorById } from "@/service/api-client/api-investment";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { RefreshControl } from "react-native";

interface InvestmentInvestorProps {
  investmentId: string;
}

export default function Investment_ScreenInvestor({
  investmentId,
}: InvestmentInvestorProps) {
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiInvestmentGetInvestorById({
        id: investmentId,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [investmentId],
    onError: (error) => {
      console.error("Error fetching investors:", error);
    },
  });

  const renderItem = ({ item }: { item: any }) => (
    <BoxWithHeaderSection>
      <StackCustom>
        <AvatarUsernameAndOtherComponent
          avatar={item?.Author?.Profile?.imageId}
          name={item?.Author?.username}
          avatarHref={`/profile/${item?.Author?.Profile?.id}`}
        />
        <CenterCustom>
          <TextCustom size="large" bold>
            Rp. {formatCurrencyDisplay(item?.nominal)}
          </TextCustom>
        </CenterCustom>
      </StackCustom>
      <Spacing height={10} />
    </BoxWithHeaderSection>
  );

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Tidak ada investor",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 120,
    });

  return (
    <NewWrapper
      hideFooter
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
    />
  );
}
