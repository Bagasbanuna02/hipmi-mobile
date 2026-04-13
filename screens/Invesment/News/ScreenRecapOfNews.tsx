/* eslint-disable react-hooks/exhaustive-deps */
import {
  BackButton,
  BaseBox,
  DotButton,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  OS_Wrapper,
  Spacing,
  TextCustom,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconPlus } from "@/components/_Icon";
import { PAGINATION_DEFAULT_TAKE, PADDING_INLINE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiInvestmentGetNews } from "@/service/api-client/api-investment";
import { router, Stack, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import Investment_BoxNews from "./BoxNews";

interface InvestmentRecapOfNewsProps {
  investmentId: string;
}

export default function Investment_ScreenRecapOfNews({
  investmentId,
}: InvestmentRecapOfNewsProps) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiInvestmentGetNews({
        id: investmentId,
        category: "all-news",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE, // Sesuaikan dengan jumlah item per halaman dari API
    dependencies: [investmentId],
  });

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [investmentId]),
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Investment_BoxNews key={index} item={item} />
  );

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Tidak ada berita",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 80,
    });

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Rekap Berita"
              left={<BackButton />}
              right={<DotButton onPress={() => setOpenDrawer(true)} />}
            />
          ),
        }}
      />
      <OS_Wrapper
        hideFooter
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
              label: "Tambah Berita",
              path: `/investment/${investmentId}/add-news`,
              icon: <IconPlus />,
            },
          ]}
          onPressItem={(item) => {
            router.push(item.path as any);
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
