/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarComp,
  ButtonCustom,
  CenterCustom,
  FloatingButton,
  Grid,
  LoaderCustom,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import { apiForumGetAll } from "@/service/api-client/api-forum";
import { apiUser } from "@/service/api-client/api-user";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";
import { PADDING_INLINE } from "@/constants/constans-value";

export default function View_Forumku2() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [dataUser, setDataUser] = useState<any | null>(null);
  const [count, setCount] = useState(0);

  // Initialize pagination hook
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!user?.id) throw new Error("User not authenticated");

      const response = await apiForumGetAll({
        category: "forumku",
        authorId: id as string,
        userLoginId: user.id,
        page: String(page), // API terima string
      });

      // Update count when fetching page 1
      if (page === 1) {
        setCount(response.data.count);
      }

      return response.data;
    },
    pageSize: 5,
    dependencies: [user?.id],
  });

  useEffect(() => {
    onLoadDataProfile(id as string);
  }, [id]);

  const onLoadDataProfile = async (id: string) => {
    try {
      const response = await apiUser(id);

      setDataUser(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
    }
  };

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

  // Generate pagination components using helper
  const { ListEmptyComponent, ListFooterComponent } = createPaginationComponents({
    loading: pagination.loading,
    refreshing: pagination.refreshing,
    listData: pagination.listData,
    isInitialLoad: pagination.isInitialLoad,
    emptyMessage: "Tidak ada postingan",
    skeletonCount: 5,
    skeletonHeight: 200,
  });

  return (
    <>
      <OS_Wrapper
      contentPadding={PADDING_INLINE}
        floatingButton={
          user?.id === id && (
            <FloatingButton
              onPress={() =>
                router.navigate("/(application)/(user)/forum/create")
              }
            />
          )
        }
        listData={pagination.listData}
        renderItem={renderList}
        refreshControl={
          <RefreshControl
            // IOS
            tintColor={MainColor.yellow}
            // Android
            colors={[MainColor.yellow]}
            progressBackgroundColor={MainColor.yellow}
            refreshing={pagination.refreshing}
            onRefresh={pagination.onRefresh}
          />
        }
        onEndReached={pagination.loadMore}
        ListHeaderComponent={randerHeaderComponent()}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </>
  );
}
