/* eslint-disable react-hooks/exhaustive-deps */
import {
    AvatarUsernameAndOtherComponent,
    BoxWithHeaderSection,
    Spacing,
    StackCustom,
    TextCustom,
    OS_Wrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE, PADDING_INLINE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import { apiEventGetAll } from "@/service/api-client/api-event";
import { dateTimeView } from "@/utils/dateTimeView";
import { RefreshControl } from "react-native";


export default function Event_ScreenContribution() {
  const { user } = useAuth();

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!user?.id) return { data: [] };

      return await apiEventGetAll({
        category: "contribution",
        userId: user?.id,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [user?.id],
    onError: (error) =>
      console.error("[ERROR] Fetch event contribution:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Belum ada kontribusi",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  // Render item event
  const renderEventItem = ({ item }: { item: any }) => (
    <BoxWithHeaderSection
      key={item?.id}
      href={`/event/${item?.Event?.id}/contribution`}
    >
      <StackCustom>
        <AvatarUsernameAndOtherComponent
          avatar={item?.Event?.Author?.Profile?.imageId}
          avatarHref={`/profile/${item?.Event?.Author?.Profile?.id}`}
          name={item?.Event?.Author?.username}
          rightComponent={
            <TextCustom truncate>
              {dateTimeView({
                date: item?.Event?.tanggal,
                withoutTime: true,
              })}
            </TextCustom>
          }
        />

        <TextCustom bold align="center" size="xlarge" truncate={2}>
          {item?.Event?.title}
        </TextCustom>
        <Spacing height={0} />
      </StackCustom>
    </BoxWithHeaderSection>
  );

  //   useEffect(() => {
  //     pagination.onRefresh();
  //   }, []);

  return (
    <OS_Wrapper
      contentPadding={PADDING_INLINE}
      listData={pagination.listData}
      renderItem={renderEventItem}
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
      hideFooter
    />
  );
}
