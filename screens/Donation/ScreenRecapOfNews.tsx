/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
} from "@/components";
import { IconPlus } from "@/components/_Icon";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiDonationGetNewsById } from "@/service/api-client/api-donation";
import { router, Stack, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import Donation_BoxNews from "./BoxNews";

interface Donation_ScreenRecapOfNewsProps {
  donationId: string;
}

export default function Donation_ScreenRecapOfNews({
  donationId,
}: Donation_ScreenRecapOfNewsProps) {
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

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [donationId]),
  );

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
          title: "Rekap Kabar",
          headerLeft: () => <BackButton />,
          headerRight: () => <DotButton onPress={() => setOpenDrawer(true)} />,
        }}
      />
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
