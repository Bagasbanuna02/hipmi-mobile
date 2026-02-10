import FloatingButton from "@/components/Button/FloatingButton";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import Donation_BoxPublish from "@/screens/Donation/BoxPublish";
import { apiDonationGetAll } from "@/service/api-client/api-donation";
import { router } from "expo-router";
import { RefreshControl } from "react-native";

export default function Donation_ScreenBeranda() {
  const pagination = usePagination({
    fetchFunction: async (page, search) => {
      return await apiDonationGetAll({
        category: "beranda",
        page: String(page),
      }).then((res) => {
        console.log("RES", JSON.stringify(res, null, 2));
        return res;
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE, // Sesuaikan dengan jumlah item per halaman yang diinginkan
    onError: (error) => console.error("[ERROR] Fetch event beranda:", error),
    dependencies: [],
  });

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Belum ada donasi",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 150,
    });

  return (
    <NewWrapper
      listData={pagination.listData}
      renderItem={({ item }) => (
        <Donation_BoxPublish data={item} id={item.id} />
      )}
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
