/* eslint-disable react-hooks/exhaustive-deps */
import {
  LoaderCustom,
  ScrollableCustom,
  TextCustom,
} from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { useAuth } from "@/hooks/use-auth";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import Donasi_BoxStatus from "@/screens/Donation/BoxStatus";
import { usePagination } from "@/hooks/use-pagination";
import { apiDonationGetByStatus } from "@/service/api-client/api-donation";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { createPaginationComponents } from "@/helpers/paginationHelpers";

interface DonationStatusProps {
  initialStatus?: string;
}

export default function Donation_ScreenStatus({ initialStatus = "publish" }: DonationStatusProps) {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(initialStatus);

  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiDonationGetByStatus({
        authorId: user?.id as string,
        status: activeCategory as string,
        page: String(page),
      });
    },
    pageSize: 5, // Sesuaikan dengan jumlah item per halaman dari API
    dependencies: [user?.id, activeCategory],
  });

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, [user?.id, activeCategory])
  );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
  };

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

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Donasi_BoxStatus
      data={item}
      status={activeCategory as string}
    />
  );

  const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    isInitialLoad: pagination.isInitialLoad,
    emptyMessage: `Tidak ada data ${activeCategory}`,
    skeletonCount: 5,
    skeletonHeight: 200,
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
      headerComponent={scrollComponent}
    />
  );
}