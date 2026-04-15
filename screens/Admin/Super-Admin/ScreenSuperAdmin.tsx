/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  CenterCustom,
  Grid,
  OS_Wrapper,
  SearchInput,
  StackCustom,
  TextCustom,
} from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminUserAccessGetAll } from "@/service/api-admin/api-admin-user-access";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";

export function Admin_ScreenSuperAdmin() {
  const [search, setSearch] = useState("");

  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      return await apiAdminUserAccessGetAll({
        search: searchQuery || "",
        category: "all-role",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    searchQuery: search,
    dependencies: [],
    onError: (error) => {
      console.log("Error fetching super admin data", error);
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

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, []),
  );

  const rightComponent = () => {
    return (
      <SearchInput
        containerStyle={{ width: "100%", marginBottom: 0 }}
        placeholder="Cari Username"
        onChangeText={(text) => setSearch(text)}
      />
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <AdminBasicBox
      key={index}
      onPress={() => router.push(`/admin/super-admin/${item?.id}`)}
      style={{ marginHorizontal: 10, marginVertical: 5 }}
    >
      <Grid>
        <Grid.Col span={8}>
          <StackCustom gap={"xs"}>
            <TextCustom bold truncate>
              {item?.username || "-"}
            </TextCustom>
          </StackCustom>
        </Grid.Col>
        <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
          <CenterCustom>
            {item?.masterUserRoleId === "2" ? (
              <BadgeCustom color={AccentColor.blue}>Admin</BadgeCustom>
            ) : (
              <BadgeCustom color={AccentColor.softblue}>User</BadgeCustom>
            )}
          </CenterCustom>
        </Grid.Col>
      </Grid>
    </AdminBasicBox>
  );

  return (
    <OS_Wrapper
      headerComponent={
        <AdminComp_BoxTitle
          title="Super Admin"
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
