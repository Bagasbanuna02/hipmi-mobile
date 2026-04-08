import {
  AvatarUsernameAndOtherComponent,
  BadgeCustom,
  ClickableCustom,
  Divider,
  OS_Wrapper,
  SelectCustom,
  TextCustom,
} from "@/components";
import ListEmptyComponent from "@/components/_ShareComponent/ListEmptyComponent";
import ListLoaderFooterComponent from "@/components/_ShareComponent/ListLoaderFooterComponent";
import ListSkeletonComponent from "@/components/_ShareComponent/ListSkeletonComponent";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { usePaginatedApi } from "@/hooks/use-paginated-api";
import { apiGetBlocked } from "@/service/api-client/api-blocked";
import { apiMasterAppCategory } from "@/service/api-client/api-master";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshControl, View } from "react-native";

const PAGE_SIZE = 10;
export default function ProfileBlockedList() {
  const { user } = useAuth();
  const [masterApp, setMasterApp] = useState<any[]>([]);
  const isInitialMount = useRef(true);

  const {
    data: listData,
    loading,
    refreshing,
    hasMore,
    search,
    setSearch,
    onRefresh,
    loadMore,
  } = usePaginatedApi({
    fetcher: async (params: { page: number; search?: string }) => {
      const response = await apiGetBlocked({
        id: user?.id as any,
        search: search,
        page: String(params.page) as any,
      });

      return response.data;
    },
    initialSearch: "",
    pageSize: PAGE_SIZE,
    dependencies: [user?.id],
  });

  useEffect(() => {
    fetchMasterApp();
  }, []);

  // 🔁 Refresh otomatis saat kembali ke halaman ini
  useFocusEffect(
    useCallback(() => {
      if (isInitialMount.current) {
        // Skip saat pertama kali mount
        isInitialMount.current = false;
        return;
      }
      // Hanya refresh saat kembali dari screen lain
      onRefresh();
    }, [onRefresh])
  );

  const fetchMasterApp = async () => {
    const response = await apiMasterAppCategory();
    setMasterApp(response.data);
  };

  const renderHeader = () => (
    <SelectCustom
      placeholder="Pilih Kategori Fitur"
      data={masterApp.map((item) => ({
        label: item.name,
        value: item.id,
      }))}
      value={search === "" ? undefined : search}
      onChange={(value) => {
        setSearch(value as any);
      }}
    />
  );

  const renderItem = ({ item }: { item: any }) => (
    <>
      <ClickableCustom
        onPress={() => {
          router.push(`/profile/${item.id}/detail-blocked`);
        }}
      >
        <View
          style={{
            paddingInline: 8,
          }}
        >
          <AvatarUsernameAndOtherComponent
            avatarHref={`/profile/${item?.blocked?.Profile?.id}`}
            avatar={item?.blocked?.Profile?.imageId}
            name={item?.blocked?.username}
            rightComponent={
              <View style={{ flexDirection: "row", gap: 4 }}>
                <BadgeCustom>
                  <TextCustom size={"small"} bold truncate>
                    {item?.menuFeature?.name}
                  </TextCustom>
                </BadgeCustom>
              </View>
            }
          />
          <Divider color="gray" />
        </View>
      </ClickableCustom>
    </>
  );

  return (
    <>
      <OS_Wrapper
        // headerComponent={renderHeader()}
        listData={listData}
        renderItem={renderItem}
        onEndReached={loadMore}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={MainColor.yellow}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={
          hasMore && !refreshing ? <ListLoaderFooterComponent /> : null
        }
        ListEmptyComponent={
          !loading && _.isEmpty(listData) ? (
            <ListSkeletonComponent />
          ) : (
            <ListEmptyComponent />
          )
        }
      />
    </>
  );
}
