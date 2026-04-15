import { SelectCustom } from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import OS_Wrapper from "@/components/_ShareComponent/OS_Wrapper";
import { PAGINATION_DEFAULT_TAKE, PADDING_INLINE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminDonationListOfDonatur } from "@/service/api-admin/api-admin-donation";
import { apiMasterTransaction } from "@/service/api-client/api-master";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";
import Admin_BoxDonationListOfDonatur from "./BoxDonationListOfDonatur";

export function Admin_ScreenDonationListOfDonatur() {
  const { id } = useLocalSearchParams();
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [master, setMaster] = useState<any[]>([]);

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminDonationListOfDonatur({
        id: id as string,
        status: selectedStatus as any,
        page: String(page),
      });

      if (response.success) {
        return { data: response.data };
      } else {
        return { data: [] };
      }
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    searchQuery: "",
    dependencies: [id, selectedStatus],
  });

  // Load master data untuk select option
  useEffect(() => {
    onLoadMaster();
  }, []);

  const onLoadMaster = async () => {
    try {
      const response = await apiMasterTransaction();
      if (response.success) {
        setMaster(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setMaster([]);
    }
  };

  // Komponen select untuk filter status
  const searchComponent = useMemo(
    () => (
      <View style={{ flexDirection: "row", gap: 5 }}>
        <SelectCustom
          placeholder="Pilih status transaksi"
          data={
            _.isEmpty(master)
              ? []
              : master?.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))
          }
          value={selectValue}
          onChange={(value: any) => {
            setSelectValue(value);
            const nameSelected = master.find((item: any) => item.id === value);
            const statusChooses = _.lowerCase(nameSelected?.name);
            setSelectedStatus(statusChooses);
          }}
          styleContainer={{ width: "100%", marginBottom: 0 }}
          allowClear
        />
      </View>
    ),
    [master, selectValue],
  );

  // Header component dengan back button dan select filter
  const headerComponent = useMemo(
    () => <AdminBackButtonAntTitle newComponent={searchComponent} />,
    [searchComponent],
  );

  // Render item untuk daftar donatur
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Admin_BoxDonationListOfDonatur key={index} item={item} />
    ),
    [],
  );

  // Buat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: "",
      emptyMessage: "Belum ada data",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  return (
    <OS_Wrapper
      listData={pagination.listData}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id?.toString() || `fallback-${item.id}`}
      headerComponent={headerComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={pagination.loadMore}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
          tintColor="#E1B525"
          colors={["#E1B525"]}
        />
      }
    />
  );
}
