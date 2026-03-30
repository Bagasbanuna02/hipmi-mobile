import {
  AvatarComp,
  ClickableCustom,
  Grid,
  NewWrapper,
  StackCustom,
  TextCustom,
  TextInputCustom,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import {
  ICON_SIZE_SMALL,
  PAGINATION_DEFAULT_TAKE,
} from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAllUser } from "@/service/api-client/api-user";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useRef, useState } from "react";
import { RefreshControl, View } from "react-native";

const PAGE_SIZE = PAGINATION_DEFAULT_TAKE;

/**
 * Render header dengan search input
 */
const renderHeader = (search: string, setSearch: (text: string) => void) => (
  <TextInputCustom
    value={search}
    onChangeText={setSearch}
    iconLeft={
      <Ionicons
        name="search"
        size={ICON_SIZE_SMALL}
        color={MainColor.placeholder}
      />
    }
    placeholder="Cari Pengguna"
    borderRadius={50}
    containerStyle={{ marginBottom: 0 }}
  />
);

/**
 * Render item user
 */
const renderItem = ({ item }: { item: any }) => (
  <View
    style={{
      backgroundColor: MainColor.soft_darkblue,
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    }}
  >
    <ClickableCustom
      onPress={() => {
        router.push(`/profile/${item?.Profile?.id}`);
      }}
    >
      <Grid>
        <Grid.Col span={2}>
          <AvatarComp fileId={item?.Profile?.imageId} size="base" />
        </Grid.Col>
        <Grid.Col span={9}>
          <StackCustom gap={"sm"}>
            <TextCustom size="large">{item?.username}</TextCustom>
            <TextCustom size="small">+{item?.nomor}</TextCustom>
            {item?.Profile?.businessField && (
              <TextCustom size="small">
                {item?.Profile?.businessField}
              </TextCustom>
            )}
          </StackCustom>
        </Grid.Col>
        <Grid.Col
          span={1}
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Ionicons
            name="chevron-forward"
            size={ICON_SIZE_SMALL}
            color={MainColor.placeholder}
          />
        </Grid.Col>
      </Grid>
    </ClickableCustom>
  </View>
);

export default function UserSearchMainView_V2() {
  const isInitialMount = useRef(true);
  const [search, setSearch] = useState("");

  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAllUser({
        page: String(page),
        search: searchQuery || "",
      });
      return response;
    },
    pageSize: PAGE_SIZE,
    searchQuery: search,
  });

  // 🔁 Refresh otomatis saat kembali ke halaman ini
  // useFocusEffect(
  //   useCallback(() => {
  //     if (isInitialMount.current) {
  //       isInitialMount.current = false;
  //       return;
  //     }
  //     pagination.onRefresh();
  //   }, [pagination.onRefresh]),
  // );

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: search,
      emptyMessage: "Tidak ada pengguna ditemukan",
      emptySearchMessage: "Tidak ada hasil pencarian",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
      loadingFooterText: "Memuat lebih banyak pengguna...",
      isInitialLoad: pagination.isInitialLoad,
    });

  return (
    <NewWrapper
      headerComponent={renderHeader(search, setSearch)}
      listData={pagination.listData}
      renderItem={renderItem}
      onEndReached={pagination.loadMore}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={MainColor.yellow}
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}
