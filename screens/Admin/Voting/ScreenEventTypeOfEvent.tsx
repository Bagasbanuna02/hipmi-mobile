import { BadgeCustom, OS_Wrapper, TextCustom } from "@/components";
import AdminActionIconPlus from "@/components/_ShareComponent/Admin/ActionIconPlus";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { GridViewCustomSpan } from "@/components/_ShareComponent/GridViewCustomSpan";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminMasterTypeOfEvent } from "@/service/api-admin/api-master-admin";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";

export function Admin_ScreenEventTypeOfEvent() {
  const [search, setSearch] = useState<string>("");

  // Gunakan hook pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminMasterTypeOfEvent({
        page: String(page),
      });

      if (response.success) {
        return { data: response.data };
      } else {
        return { data: [] };
      }
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    searchQuery: search,
    dependencies: [],
  });

  // Komponen action plus untuk header
  const rightComponent = useMemo(
    () => (
      <AdminActionIconPlus
        onPress={() => {
          router.push(`/admin/event/type-create`);
        }}
      />
    ),
    [],
  );

  // Header component untuk title
  const headerComponent = useMemo(
    () => (
      <AdminComp_BoxTitle title="Tipe Acara Event" rightComponent={rightComponent} />
    ),
    [rightComponent],
  );

  // Render header tabel (Aksi, Status, Tipe Acara)
  const renderTableHeader = useMemo(
    () => (
      <>
        <GridViewCustomSpan
          span1={2}
          span2={5}
          span3={5}
          component1={
            <TextCustom bold align="center">
              Aksi
            </TextCustom>
          }
          component2={
            <TextCustom bold align="center">
              Status
            </TextCustom>
          }
          component3={<TextCustom bold>Tipe Acara</TextCustom>}
        />
      </>
    ),
    [],
  );

  // Render item untuk daftar tipe event (mengikuti pattern InformationBankSection)
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <AdminBasicBox
        onPress={() => {
          router.push(`/admin/event/type-update?id=${item.id}`);
        }}
        style={{ marginHorizontal: 10, marginVertical: 5 }}
      >
        <GridTwoView
          leftItem={<TextCustom bold>{item?.name || "-"}</TextCustom>}
          rightItem={
            <View>
              {item?.active ? (
                <BadgeCustom color="green">Aktif</BadgeCustom>
              ) : (
                <BadgeCustom color="red">Tidak Aktif</BadgeCustom>
              )}
            </View>
          }
          spanLeft={8}
          spanRight={4}
          styleRight={{
            alignItems: "flex-end",
          }}
        />
      </AdminBasicBox>
    ),
    [],
  );

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, []),
  );

  // Buat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: search,
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
