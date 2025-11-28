/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarComp,
  BackButton,
  FloatingButton,
  LoaderCustom,
  SearchInput,
  StackCustom,
  TextCustom, // ← gunakan NewWrapper yang sudah diperbaiki
} from "@/components";
import SkeletonCustom from "@/components/_ShareComponent/SkeletonCustom";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { useAuth } from "@/hooks/use-auth";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import { apiForumGetAll } from "@/service/api-client/api-forum";
import { apiUser } from "@/service/api-client/api-user";
import { router, Stack } from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { MainColor } from "@/constants/color-palet";

// Sesuai dengan `takeData = 5` di API-mu
const PAGE_SIZE = 5;

export default function Forum_ViewBeranda2() {
  const { user } = useAuth();
  const [dataUser, setDataUser] = useState<any>(null);
  const [listData, setListData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // 🔹 Load data profil user sekali
  useEffect(() => {
    if (user?.id) {
      apiUser(user.id).then((res) => setDataUser(res.data));
    }
  }, [user?.id]);

  // 🔹 Reset dan muat ulang saat search atau user berubah
  useEffect(() => {
    setPage(1);
    setListData([]);
    setHasMore(true);
    fetchData(1, true);
  }, [search, user?.id]);

  // 🔹 Fungsi fetch data
  const fetchData = async (pageNumber: number, clear: boolean) => {
    if (!user?.id) return;

    // Cegah multiple call
    if (!clear && (loading || refreshing)) return;

    const isRefresh = clear;
    if (isRefresh) setRefreshing(true);
    if (!isRefresh) setLoading(true);

    try {
      const response = await apiForumGetAll({
        category: "beranda",
        search: search || "",
        userLoginId: user.id,
        page: String(pageNumber), // API terima string
      });

      const newData = response.data || [];
      setListData((prev) => {
        const current = Array.isArray(prev) ? prev : [];
        return clear ? newData : [...current, ...newData];
      });
      setHasMore(newData.length === PAGE_SIZE);
      setPage(pageNumber);
    } catch (error) {
      console.error("[ERROR] Fetch forum:", error);
      setHasMore(false);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  // 🔹 Pull-to-refresh
  const onRefresh = useCallback(() => {
    fetchData(1, true);
  }, [search, user?.id]);

  // 🔹 Infinite scroll
  const loadMore = useCallback(() => {
    if (hasMore && !loading && !refreshing) {
      fetchData(page + 1, false);
    }
  }, [hasMore, loading, refreshing, page, search, user?.id]);

  // 🔹 Render item forum
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

  // 🔹 Komponen Header List (di dalam FlatList)
  const ListHeaderComponent = (
    <View style={{ paddingVertical: 8, alignItems: "center" }}>
      <TextCustom>Diskusi Terbaru</TextCustom>
    </View>
  );

  // 🔹 Komponen Footer List (loading indicator)
  const ListFooterComponent =
    loading && !refreshing && listData.length > 0 ? (
      <View style={{ paddingVertical: 16, alignItems: "center" }}>
        {/* <Text style={{ color: "#aaa", fontSize: 14 }}>Memuat diskusi...</Text> */}
        <LoaderCustom />
      </View>
    ) : null;

  // Skeleton List (untuk initial load)
  const SkeletonListComponent = () => (
    <View style={{ flex: 1 }}>
      <StackCustom>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCustom height={200} key={i} />
        ))}
      </StackCustom>
    </View>
  );

  //  Komponen Empty
  const EmptyComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <TextCustom align="center" color="gray">
        {search ? "Tidak ada hasil pencarian" : "Tidak ada diskusi"}
      </TextCustom>
    </View>
  );

  return (
    <>
      {/* 🔹 Header Navigation */}
      <Stack.Screen
        options={{
          title: "Forum",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <AvatarComp
              fileId={dataUser?.Profile?.imageId}
              size="base"
              href={`/forum/${user?.id}/forumku`}
            />
          ),
        }}
      />

      {/* 🔹 NewWrapper dalam mode list */}
      <NewWrapper
        // Header global (di atas FlatList, sticky)
        headerComponent={
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            <SearchInput
              placeholder="Cari topik diskusi"
              onChangeText={_.debounce((text) => setSearch(text), 500)}
              //   value={search}
            />
          </View>
        }
        // Floating action button
        floatingButton={
          <FloatingButton
            onPress={() =>
              router.navigate("/(application)/(user)/forum/create")
            }
          />
        }
        // --- Mode List Props ---
        listData={listData}
        renderItem={renderForumItem}
        refreshControl={
          <RefreshControl
            // IOS
            tintColor={MainColor.yellow}
            // Android
            colors={[MainColor.yellow]}
            progressBackgroundColor={MainColor.yellow}

            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReached={loadMore}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={
         loading && _.isEmpty(listData) ? <SkeletonListComponent /> : <EmptyComponent />
        }
        // ------------------------
      />
    </>
  );
}
