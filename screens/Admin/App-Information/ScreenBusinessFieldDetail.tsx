/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  BaseBox,
  CenterCustom,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridSpan_NewComponent } from "@/components/_ShareComponent/GridSpan_NewComponent";
import { MainColor } from "@/constants/color-palet";
import {
  ICON_SIZE_SMALL,
  PADDING_INLINE,
  PAGINATION_DEFAULT_TAKE,
} from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { apiAdminMasterBusinessFieldById } from "@/service/api-admin/api-master-admin";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, View } from "react-native";

export function Admin_ScreenBusinessFieldDetail() {
  const { id } = useLocalSearchParams();
  const [bidang, setBidang] = useState<any | null>(null);

  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiAdminMasterBusinessFieldById({
        category: "only-sub-bidang",
        id: id as any,
        page: String(page),
      });
      // Pastikan mengembalikan struktur data yang sesuai dengan yang diharapkan oleh usePagination
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
    onError: (error) => {
      console.log("Error fetching data sub bidang", error);
    },
  });

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      searchQuery: "",
      emptyMessage: "Tidak ada data pengguna",
      emptySearchMessage: "Tidak ada hasil pencarian",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
      isInitialLoad: pagination.isInitialLoad,
    });

  useFocusEffect(
    useCallback(() => {
      onLoadBidang();
      pagination.onRefresh();
    }, [id]),
  );

  const onLoadBidang = async () => {
    try {
      const response = await apiAdminMasterBusinessFieldById({
        id: id as string,
        category: "all",
      });
      setBidang(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
      setBidang(null);
    }
  };
  const renderHeader = () => (
    <View>
      <BaseBox
        onPress={() =>
          router.push(
            `/admin/app-information/business-field/${id}/bidang-update`,
          )
        }
      >
        <StackCustom gap={"xs"}>
          <GridSpan_NewComponent
            span1={10}
            span2={2}
            text1={
              <StackCustom>
                <TextCustom bold size={"large"}>
                  {bidang?.bidang?.name}
                </TextCustom>
                {bidang?.bidang.active ? (
                  <BadgeCustom color="green">Aktif</BadgeCustom>
                ) : (
                  <BadgeCustom color="red">Tidak Aktif</BadgeCustom>
                )}
              </StackCustom>
            }
            text2={
              <CenterCustom>
                <Ionicons
                  name="caret-forward"
                  size={ICON_SIZE_SMALL}
                  color="white"
                />
              </CenterCustom>
            }
          />
        </StackCustom>
      </BaseBox>

      <CenterCustom>
        <TextCustom bold>Sub Bidang</TextCustom>
      </CenterCustom>
      <Spacing height={5} />
    </View>
  );

  const renderItem = ({ item }: { item: any }) => (
    <BaseBox
      onPress={() =>
        router.push(
          `/admin/app-information/business-field/${item?.id}/sub-bidang-update`,
        )
      }
    >
      <StackCustom gap={"xs"}>
        <GridSpan_NewComponent
          span1={10}
          span2={2}
          text1={
            <StackCustom>
              <TextCustom bold size={"large"}>
                {item.name}
              </TextCustom>
              {item?.isActive ? (
                <BadgeCustom color="green">Aktif</BadgeCustom>
              ) : (
                <BadgeCustom color="red">Tidak Aktif</BadgeCustom>
              )}
            </StackCustom>
          }
          text2={
            <CenterCustom>
              <Ionicons
                name="caret-forward"
                size={ICON_SIZE_SMALL}
                color="white"
              />
            </CenterCustom>
          }
        />
      </StackCustom>
    </BaseBox>
  );

  return (
    <>
      <OS_Wrapper
        contentPadding={PADDING_INLINE}
        listData={pagination.listData}
        onEndReached={pagination.loadMore}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        hideFooter
        refreshControl={
          <RefreshControl
            refreshing={pagination.refreshing}
            onRefresh={pagination.onRefresh}
            tintColor={MainColor.yellow}
            colors={[MainColor.yellow]}
          />
        }
        headerComponent={
          <AdminBackButtonAntTitle title="Detail Bidang & Sub Bidang" />
        }
        ListHeaderComponent={renderHeader()}
        renderItem={renderItem}
      />
    </>
  );
}
