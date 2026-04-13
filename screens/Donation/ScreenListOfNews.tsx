/* eslint-disable react-hooks/exhaustive-deps */
import { BackButton, DrawerCustom, MenuDrawerDynamicGrid, OS_Wrapper } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconPlus } from "@/components/_Icon";
import { MainColor } from "@/constants/color-palet";
import { PADDING_INLINE } from "@/constants/constans-value";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiDonationGetNewsById } from "@/service/api-client/api-donation";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { RefreshControl } from "react-native";
import Donation_BoxNews from "./BoxNews";

interface Donation_ScreenListOfNewsProps {
  donationId: string;
}

export default function Donation_ScreenListOfNews({
  donationId,
}: Donation_ScreenListOfNewsProps) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiDonationGetNewsById({
        id: donationId,
        category: "get-all",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE, // Sesuaikan dengan jumlah item per halaman dari API
    dependencies: [donationId],
  });

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Donation_BoxNews key={index} item={item} />
  );

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Tidak ada kabar",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 80,
    });

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Daftar Kabar"
              left={<BackButton />}
            />
          ),
        }}
      />
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
      />

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconPlus />,
              label: "Tambah Berita",
              path: `/donation/${donationId}/(news)/add-news`,
            },
          ]}
          onPressItem={(item) => {
            console.log("PATH ", item.path);
            router.navigate(item.path as any);
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
