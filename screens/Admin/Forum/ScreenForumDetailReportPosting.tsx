/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  CenterCustom,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
} from "@/components";
import { IconDot, IconView } from "@/components/_Icon/IconComponent";
import { IconTrash } from "@/components/_Icon/IconTrash";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { GridSpan_NewComponent } from "@/components/_ShareComponent/GridSpan_NewComponent";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import {
  ICON_SIZE_BUTTON,
  PAGINATION_DEFAULT_TAKE,
} from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import { useAuth } from "@/hooks/use-auth";
import {
  apiAdminForumDeactivatePosting,
  apiAdminForumListReportPostingById,
  apiAdminForumPostingById,
} from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";
import { Divider } from "react-native-paper";
import Toast from "react-native-toast-message";

export function Admin_ScreenForumDetailReportPosting() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [openDrawerPage, setOpenDrawerPage] = useState(false);
  const [openDrawerAction, setOpenDrawerAction] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [selectedReport, setSelectedReport] = useState({
    id: "",
    username: "",
    kategori: "",
    keterangan: "",
    deskripsi: "",
  });

  // Load data postingan saat screen fokus
  useFocusEffect(
    useCallback(() => {
      onLoadDataPosting();
    }, [id])
  );

  // Pagination untuk list report
  const pagination = usePagination({
    fetchFunction: async (page, searchQuery) => {
      const response = await apiAdminForumListReportPostingById({
        id: id as string,
        page: String(page),
      });

      if (response.success) {
        return { data: response.data };
      }
      return { data: [] };
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
  });

  const onLoadDataPosting = async () => {
    try {
      const response = await apiAdminForumPostingById({
        id: id as string,
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  // Render item untuk daftar report
  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View>
        <GridSpan_NewComponent
          text1={
            <CenterCustom>
              <ActionIcon
                icon={<IconView size={ICON_SIZE_BUTTON} color="black" />}
                onPress={() => {
                  setOpenDrawerAction(true);
                  setSelectedReport({
                    id: item?.id,
                    username: item?.User?.username,
                    kategori: item?.ForumMaster_KategoriReport?.title,
                    keterangan: item?.ForumMaster_KategoriReport?.deskripsi,
                    deskripsi: item?.deskripsi,
                  });
                }}
              />
            </CenterCustom>
          }
          text2={
            <TextCustom truncate>
              {item?.User?.username || "-"}
            </TextCustom>
          }
          text3={
            <TextCustom truncate={2}>
              {item?.ForumMaster_KategoriReport?.title || "-"}
            </TextCustom>
          }
        />
        <Divider />
      </View>
    ),
    []
  );

  // Header component dengan detail postingan
  const headerComponent = useMemo(
    () => (
      <AdminBackButtonAntTitle
        title="Detail Report Posting"
        rightComponent={
          <ActionIcon
            icon={<IconDot size={16} color={MainColor.darkblue} />}
            onPress={() => setOpenDrawerPage(true)}
          />
        }
      />
    ),
    []
  );

  // Detail postingan component
  const postingDetailComponent = useMemo(
    () => (
      <BaseBox>
        <StackCustom gap={"sm"}>
          <GridSpan_NewComponent
            text1={<TextCustom bold>Username</TextCustom>}
            text2={<TextCustom>{data?.Author?.username || "-"}</TextCustom>}
          />

          <GridSpan_NewComponent
            text1={<TextCustom bold>Status</TextCustom>}
            text2={
              data && data?.ForumMaster_StatusPosting?.status ? (
                <BadgeCustom
                  color={
                    data?.ForumMaster_StatusPosting?.status === "Open"
                      ? MainColor.green
                      : MainColor.red
                  }
                >
                  {data?.ForumMaster_StatusPosting?.status === "Open"
                    ? "Open"
                    : "Close"}
                </BadgeCustom>
              ) : (
                <TextCustom>{"-"}</TextCustom>
              )
            }
          />

          <GridSpan_NewComponent
            text1={<TextCustom bold>Postingan</TextCustom>}
            text2={<TextCustom>{data?.diskusi || "-"}</TextCustom>}
          />
        </StackCustom>
      </BaseBox>
    ),
    [data]
  );

  // Box title untuk daftar report
  const reportListTitleComponent = useMemo(
    () => <AdminComp_BoxTitle title="Daftar Report Posting" />,
    []
  );

  // Header untuk kolom daftar report
  const reportListHeaderComponent = useMemo(
    () => (
      <StackCustom gap={"sm"}>
        {postingDetailComponent}
        {reportListTitleComponent}
        <GridSpan_NewComponent
          text1={
            <TextCustom bold align="center">
              Aksi
            </TextCustom>
          }
          text2={<TextCustom bold>Pelapor</TextCustom>}
          text3={<TextCustom bold>Kategori Report</TextCustom>}
        />
        <Divider />
      </StackCustom>
    ),
    [postingDetailComponent, reportListTitleComponent]
  );

  // Buat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Belum ada report",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  return (
    <>
      <NewWrapper
        listData={pagination.listData}
        renderItem={renderItem}
        headerComponent={headerComponent}
        ListHeaderComponent={reportListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        onEndReached={pagination.loadMore}
        refreshControl={
          <RefreshControl
            refreshing={pagination.refreshing}
            onRefresh={pagination.onRefresh}
            tintColor={MainColor.yellow}
            colors={[MainColor.yellow]}
          />
        }
      />

      {/* Drawer untuk menu halaman (hapus posting) */}
      <DrawerCustom
        isVisible={openDrawerPage}
        closeDrawer={() => setOpenDrawerPage(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconTrash />,
              label: "Hapus Posting",
              value: "delete",
              path: "",
              color: MainColor.red,
            },
          ]}
          onPressItem={(item) => {
            AlertDefaultSystem({
              title: "Hapus Posting",
              message: "Apakah Anda yakin ingin menghapus posting ini?",
              textLeft: "Batal",
              textRight: "Hapus",
              onPressRight: async () => {
                const response = await apiAdminForumDeactivatePosting({
                  id: id as string,
                  data: {
                    senderId: user?.id as string,
                  },
                });

                if (!response.success) {
                  Toast.show({
                    type: "error",
                    text1: "Posting gagal dihapus",
                  });
                  return;
                }

                setOpenDrawerPage(false);
                Toast.show({
                  type: "success",
                  text1: "Posting berhasil dihapus",
                });
                router.back();
              },
            });
          }}
        />
      </DrawerCustom>

      {/* Drawer untuk detail report */}
      <DrawerCustom
        isVisible={openDrawerAction}
        closeDrawer={() => setOpenDrawerAction(false)}
        height={"auto"}
      >
        <StackCustom>
          <GridSpan_4_8
            label={<TextCustom bold>Pelapor</TextCustom>}
            value={<TextCustom>{selectedReport?.username || "-"}</TextCustom>}
          />

          {selectedReport?.kategori && (
            <>
              <GridSpan_4_8
                label={<TextCustom bold>Kategori Report</TextCustom>}
                value={
                  <TextCustom>{selectedReport?.kategori || "-"}</TextCustom>
                }
              />
              <GridSpan_4_8
                label={<TextCustom bold>Keterangan</TextCustom>}
                value={
                  <TextCustom>{selectedReport?.keterangan || "-"}</TextCustom>
                }
              />
            </>
          )}

          {selectedReport?.deskripsi && (
            <GridSpan_4_8
              label={<TextCustom bold>Deskripsi</TextCustom>}
              value={
                <TextCustom>{selectedReport?.deskripsi || "-"}</TextCustom>
              }
            />
          )}
        </StackCustom>
      </DrawerCustom>
    </>
  );
}
