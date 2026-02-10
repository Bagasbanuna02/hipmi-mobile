/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  Grid,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { usePagination } from "@/hooks/use-pagination";
import { apiDonationListOfDonaturById } from "@/service/api-client/api-donation";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { FontAwesome6 } from "@expo/vector-icons";
import dayjs from "dayjs";
import { RefreshControl } from "react-native";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";

interface Donation_ScreenListOfDonaturProps {
  donationId: string;
}

export default function Donation_ScreenListOfDonatur({
  donationId,
}: Donation_ScreenListOfDonaturProps) {
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiDonationListOfDonaturById({
        id: donationId,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE, // Sesuaikan dengan jumlah item per halaman dari API
    dependencies: [donationId],
  });

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <BaseBox key={index}>
      <Grid>
        <Grid.Col
          span={3}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <FontAwesome6
            name="face-smile-wink"
            size={50}
            style={{ color: MainColor.yellow }}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <TextCustom bold size="large">
            {item?.Author?.username || "-"}
          </TextCustom>
          <Spacing />
          <StackCustom gap={"xs"}>
            <TextCustom size={"small"}>Berdonas sebesar </TextCustom>
            <TextCustom bold size="large" color="yellow">
              Rp. {formatCurrencyDisplay(item?.nominal)}
            </TextCustom>
            <TextCustom>
              {dayjs(item?.createdAt).format("DD MMM YYYY, HH:mm")}
            </TextCustom>
          </StackCustom>
        </Grid.Col>
      </Grid>
    </BaseBox>
  );

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Belum ada donatur",
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
