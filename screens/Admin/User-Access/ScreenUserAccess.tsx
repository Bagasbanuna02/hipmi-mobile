/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  CenterCustom,
  Grid,
  SearchInput,
  StackCustom,
  TextCustom
} from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import {
  PAGINATION_DEFAULT_TAKE
} from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminUserAccessGetAll } from "@/service/api-admin/api-admin-user-access";
import { router } from "expo-router";
import { useState } from "react";
import { RefreshControl } from "react-native";

export function Admin_ScreenUserAccess() {
  const [search, setSearch] = useState("");

  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      return await apiAdminUserAccessGetAll({
        search: searchQuery || "",
        category: "only-user",
        page: String(page),
      });
      // Pastikan mengembalikan struktur data yang sesuai dengan yang diharapkan oleh usePagination
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    searchQuery: search,
    dependencies: [],
    onError: (error) => {
      console.log("Error fetching data user access", error);
    },
  });

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: search,
      emptyMessage: "Tidak ada data pengguna",
      emptySearchMessage: "Tidak ada hasil pencarian",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
      isInitialLoad: pagination.isInitialLoad,
    });

  const rightComponent = () => {
    return (
      <>
        <SearchInput
          containerStyle={{ width: "100%", marginBottom: 0 }}
          placeholder="Cari User"
          onChangeText={(text) => setSearch(text)}
        />
      </>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <AdminBasicBox
      key={index}
      onPress={() => router.push(`/admin/user-access/${item?.id}`)}
      style={{ marginHorizontal: 10, marginVertical: 5 }}
    >
      <Grid>
        <Grid.Col span={8}>
          <StackCustom gap={"xs"}>
            <TextCustom bold truncate>
              {item?.username || "-"}
            </TextCustom>
            <TextCustom size={"small"} bold truncate color="gray">
              {item?.nomor || "-"}
            </TextCustom>
          </StackCustom>
        </Grid.Col>
        <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
          <CenterCustom>
            {item?.active ? (
              <BadgeCustom color="green">Aktif</BadgeCustom>
            ) : (
              <BadgeCustom color="red">Tidak Aktif</BadgeCustom>
            )}
          </CenterCustom>
        </Grid.Col>
      </Grid>
    </AdminBasicBox>
  );

  return (
    <NewWrapper
      headerComponent={
        <AdminComp_BoxTitle
          title="User Access"
          rightComponent={rightComponent()}
        />
      }
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
          tintColor={MainColor.yellow}
          colors={[MainColor.yellow]}
        />
      }
      renderItem={renderItem}
      listData={pagination.listData}
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      hideFooter
    />
  );
}
