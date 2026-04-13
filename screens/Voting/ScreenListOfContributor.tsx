/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BadgeCustom,
  BaseBox,
  OS_Wrapper,
  Spacing,
  TextCustom,
} from "@/components";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiVotingContribution } from "@/service/api-client/api-voting";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { RefreshControl, View } from "react-native";

export default function Voting_ScreenListOfContributor() {
  const { id } = useLocalSearchParams();

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiVotingContribution({
        id: id as string,
        authorId: "",
        category: "list",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
    onError: (error) =>
      console.error("[ERROR] Fetch voting contributors:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Tidak ada kontributor",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  // Render item contributor
  const renderContributorItem = ({ item }: { item: any }) => (
    <BaseBox paddingTop={5} paddingBottom={5} key={item?.id}>
      <AvatarUsernameAndOtherComponent
        avatar={item?.Author?.Profile?.imageId || ""}
        name={item?.Author?.username || "Username"}
        avatarHref={`/profile/${item?.Author?.Profile?.id}`}
        rightComponent={
          <BadgeCustom style={{ alignSelf: "flex-end" }}>
            {item?.Voting_DaftarNamaVote?.value}
          </BadgeCustom>
        }
      />
    </BaseBox>
  );

  return (
    <OS_Wrapper
      hideFooter
      listData={pagination.listData}
      renderItem={renderContributorItem}
      refreshControl={
        <RefreshControl
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
