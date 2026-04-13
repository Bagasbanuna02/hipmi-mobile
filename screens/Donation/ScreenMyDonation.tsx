import {
  BadgeCustom,
  BaseBox,
  DummyLandscapeImage,
  Grid,
  OS_Wrapper,
  StackCustom,
  TextCustom,
} from "@/components";
import FloatingButton from "@/components/Button/FloatingButton";
import { MainColor } from "@/constants/color-palet";
import { PADDING_INLINE, PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { apiDonationGetAll } from "@/service/api-client/api-donation";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { Href, router } from "expo-router";
import _ from "lodash";
import { RefreshControl, View } from "react-native";

export default function Donation_ScreenMyDonation() {
  const { user } = useAuth();

  const pagination = usePagination({
    fetchFunction: async (page, search) => {
      if (!user?.id) {
        throw new Error("User tidak ditemukan");
      }

      return await apiDonationGetAll({
        category: "my-donation",
        authorId: user?.id,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE, // Sesuaikan dengan jumlah item per halaman yang diinginkan
    dependencies: [user?.id], // Reload ketika user.id berubah
  });

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Belum ada transaksi",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 150,
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

  const handlePress = ({
    invoiceId,
    donationId,
    status,
  }: {
    invoiceId: string;
    donationId: string;
    status: string;
  }) => {
    const url: Href = `../${donationId}/(transaction-flow)/${invoiceId}`;
    if (status === "menunggu") {
      router.push(`${url}/invoice`);
    } else if (status === "proses") {
      router.push(`${url}/process`);
    } else if (status === "berhasil") {
      router.push(`${url}/success`);
    } else if (status === "gagal") {
      router.push(`${url}/failed`);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <BaseBox
      paddingTop={7}
      paddingBottom={7}
      onPress={() => {
        handlePress({
          status: _.lowerCase(item.statusInvoice),
          invoiceId: item.id,
          donationId: item.donasiId,
        });
      }}
    >
      <Grid>
        <Grid.Col span={5}>
          <DummyLandscapeImage
            height={100}
            unClickPath
            imageId={item.imageId}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <View />
        </Grid.Col>
        <Grid.Col span={6}>
          <StackCustom>
            <TextCustom truncate={2} bold>
              {item.title || "-"}
            </TextCustom>

            <TextCustom bold color="yellow">
              Rp. {formatCurrencyDisplay(item.nominal)}
            </TextCustom>

            <BadgeCustom
              variant="light"
              color={handlerColor(_.lowerCase(item.statusInvoice))}
              fullWidth
            >
              {item.statusInvoice}
            </BadgeCustom>
          </StackCustom>
        </Grid.Col>
      </Grid>
    </BaseBox>
  );

  return (
    <OS_Wrapper
      contentPadding={PADDING_INLINE}
      listData={pagination.listData}
      renderItem={renderItem}
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
          tintColor={MainColor.yellow}
          colors={[MainColor.yellow]}
        />
      }
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/donation/create")} />
      }
    />
  );
}
