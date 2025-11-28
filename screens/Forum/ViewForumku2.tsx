/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarComp,
  ButtonCustom,
  CenterCustom,
  FloatingButton,
  Grid,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import { apiForumGetAll } from "@/service/api-client/api-forum";
import { apiUser } from "@/service/api-client/api-user";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";

const PAGE_SIZE = 5;

export default function View_Forumku2() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [listData, setListData] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    onLoadDataProfile(id as string);
  }, [id]);

  useEffect(() => {
    setPage(1);
    setListData([]);
    setHasMore(true);
    fetchData(1, true);
  }, [user?.id]);

  const onLoadDataProfile = async (id: string) => {
    try {
      const response = await apiUser(id);

      setDataUser(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
    }
  };

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
        category: "forumku",
        authorId: id as string,
        userLoginId: user.id,
        page: String(pageNumber), // API terima string
      });

      const newData = response.data.data || [];
      setListData((prev) => {
        const current = Array.isArray(prev) ? prev : [];
        return clear ? newData : [...current, ...newData];
      });
      setHasMore(newData.length === PAGE_SIZE);
      setPage(pageNumber);
      setCount(response.data.count);
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
  }, [user?.id]);

  // 🔹 Infinite scroll
  const loadMore = useCallback(() => {
    if (hasMore && !loading && !refreshing) {
      fetchData(page + 1, false);
    }
  }, [hasMore, loading, refreshing, page, user?.id]);

  const randerHeaderComponent = () => (
    <>
      <CenterCustom>
        <AvatarComp
          fileId={dataUser?.Profile?.imageId}
          href={`/(application)/(image)/preview-image/${dataUser?.Profile?.imageId}`}
          size="xl"
        />
      </CenterCustom>

      <Grid>
        <Grid.Col style={{ paddingLeft: 8 }} span={6}>
          <TextCustom bold truncate>
            @{dataUser?.username || "-"}
          </TextCustom>
          <TextCustom>{count || "0"} postingan</TextCustom>
        </Grid.Col>
        <Grid.Col span={6} style={{ alignItems: "flex-end", paddingRight: 8 }}>
          <ButtonCustom href={`/profile/${dataUser?.Profile?.id}`}>
            Kunjungi Profile
          </ButtonCustom>
        </Grid.Col>
      </Grid>
      <Spacing />
    </>
  );

  const renderList = ({ item }: { item: any }) => (
    <Forum_BoxDetailSection
      key={item.id}
      data={item}
      onSetData={() => {}}
      isTruncate={true}
      href={`/forum/${item.id}`}
      isRightComponent={false}
    />
  );

  // Skeleton List (untuk initial load)
  const SkeletonListComponent = () => (
    <View style={{ flex: 1 }}>
      <StackCustom>
        {Array.from({ length: 5 }).map((_, i) => (
          <CustomSkeleton height={200} key={i} />
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
      <NoDataText />
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

  return (
    <>
      <NewWrapper
        floatingButton={
          user?.id === id && (
            <FloatingButton
              onPress={() =>
                router.navigate("/(application)/(user)/forum/create")
              }
            />
          )
        }
        listData={listData}
        renderItem={renderList}
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
        ListHeaderComponent={randerHeaderComponent()}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={
          loading && _.isEmpty(listData) ? <SkeletonListComponent /> : <EmptyComponent />
        }
      />
    </>
  );
}
