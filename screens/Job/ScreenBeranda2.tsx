import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  FloatingButton,
  NewWrapper_V2,
  SearchInput,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiJobGetAll } from "@/service/api-client/api-job";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useState } from "react";
import { RefreshControl, View } from "react-native";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";

const PAGE_SIZE = 10;

export default function Job_ScreenBeranda2() {
  const [search, setSearch] = useState("");

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      return await apiJobGetAll({
        search: searchQuery || "",
        category: "beranda",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    searchQuery: search,
    dependencies: [],
    onError: (error) => console.error("[ERROR] Fetch job:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: search,
      emptyMessage: "Belum ada lowongan",
      emptySearchMessage: "Tidak ada hasil pencarian",
      skeletonCount: 5,
      skeletonHeight: 150,
    });

  // Render item job
  const renderJobItem = ({ item }: { item: any }) => (
    <BoxWithHeaderSection
      key={item.id}
      onPress={() => router.push(`/job/${item.id}`)}
    >
      <StackCustom>
        <AvatarUsernameAndOtherComponent
          avatar={item?.Author?.Profile?.imageId}
          avatarHref={`/profile/${item?.Author?.Profile?.id}`}
          name={item?.Author?.username}
        />

        <TextCustom truncate={2} align="center" bold size="large">
          {item?.title || "-"}
        </TextCustom>
      </StackCustom>
      <Spacing />
    </BoxWithHeaderSection>
  );

  return (
    <NewWrapper_V2
      contentPaddingHorizontal={16}
      hideFooter
      headerComponent={
        <View style={{ paddingTop: 8 }}>
          <SearchInput
            placeholder="Cari pekerjaan"
            onChangeText={_.debounce((text) => setSearch(text), 500)}
          />
        </View>
      }
      floatingButton={
        <FloatingButton onPress={() => router.push("/job/create")} />
      }
      listData={pagination.listData}
      renderItem={renderJobItem}
      refreshControl={
        <RefreshControl
          tintColor={MainColor.yellow}
          colors={[MainColor.yellow]}
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
}
