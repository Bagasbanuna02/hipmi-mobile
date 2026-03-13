import {
  AvatarComp,
  BackButton,
  FloatingButton,
  SearchInput,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import { apiForumGetAll } from "@/service/api-client/api-forum";
import { apiUser } from "@/service/api-client/api-user";
import { router, Stack } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import { RefreshControl, TouchableOpacity, View } from "react-native";

const PAGE_SIZE = 5;

export default function Forum_ViewBeranda3() {
  const { user } = useAuth();
  const [dataUser, setDataUser] = useState<any>(null);
  const [search, setSearch] = useState("");

  // Load data profil user
  useEffect(() => {
    if (user?.id) {
      apiUser(user.id).then((res) => setDataUser(res.data));
    }
  }, [user?.id]);

  // Setup pagination (menggantikan 50+ lines code!)
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      if (!user?.id) return { data: [] };

      return await apiForumGetAll({
        category: "beranda",
        search: searchQuery || "",
        userLoginId: user.id,
        page: String(page),
      });
    },
    pageSize: PAGE_SIZE,
    searchQuery: search,
    dependencies: [user?.id],
    onError: (error) => console.error("[ERROR] Fetch forum:", error),
  });

  // Generate komponen (menggantikan 40+ lines code!)
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: search,
      emptyMessage: "Tidak ada diskusi",
      emptySearchMessage: "Tidak ada hasil pencarian",
      skeletonCount: 5,
      skeletonHeight: 150,
    });

  // Render item forum
  const renderForumItem = ({ item }: { item: any }) => (
    <Forum_BoxDetailSection
      key={item.id}
      data={item}
      onSetData={() => {}}
      isTruncate={true}
      href={`/forum/${item.id}`}
      isRightComponent={false}
    />
  );

  //   const ListHeaderComponent = (
  //     <View style={{ paddingVertical: 8, alignItems: "center" }}>
  //       <TextCustom>Diskusi Terbaru</TextCustom>
  //     </View>
  //   );

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Forum"
              left={<BackButton />}
              right={
                <TouchableOpacity
                  onPress={() => router.navigate(`/forum/${user?.id}/forumku`)}
                >
                  <AvatarComp
                    fileId={dataUser?.Profile?.imageId}
                    size="base"
                    href={`/forum/${user?.id}/forumku`}
                  />
                </TouchableOpacity>
              }
            />
          ),
        }}
      />

      <NewWrapper
        hideFooter
        headerComponent={
          <View style={{ paddingTop: 8 }}>
            <SearchInput
              placeholder="Cari topik diskusi"
              onChangeText={_.debounce((text) => setSearch(text), 500)}
            />
          </View>
        }
        floatingButton={
          <FloatingButton
            onPress={() =>
              router.navigate("/(application)/(user)/forum/create")
            }
          />
        }
        listData={pagination.listData}
        renderItem={renderForumItem}
        refreshControl={
          <RefreshControl
            tintColor={MainColor.yellow}
            colors={[MainColor.yellow]}
            refreshing={pagination.refreshing}
            onRefresh={pagination.onRefresh}
          />
        }
        onEndReached={pagination.loadMore}
        // ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </>
  );
}
