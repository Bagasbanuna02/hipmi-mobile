/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  AlertDefaultSystem,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
} from "@/components";
import { IconDot } from "@/components/_Icon/IconComponent";
import { IconTrash } from "@/components/_Icon/IconTrash";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import {
  apiAdminForumCommentById,
  apiAdminForumDeactivateComment,
  apiAdminForumListReportCommentById,
} from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
import Toast from "react-native-toast-message";

export function Admin_ScreenForumDetailReportComment() {
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

  // Load data komentar saat screen fokus
  useFocusEffect(
    useCallback(() => {
      onLoadDataKomentar();
    }, [id]),
  );

  // Pagination untuk list report comment
  const pagination = usePagination({
    fetchFunction: async (page) => {
      const response = await apiAdminForumListReportCommentById({
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

  const onLoadDataKomentar = async () => {
    try {
      const response = await apiAdminForumCommentById({
        id: id as string,
        category: "get-one",
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  // Render item untuk daftar report comment
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <AdminBasicBox
        key={index}
        style={{ marginHorizontal: 5, marginVertical: 5 }}
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
      >
        <StackCustom gap={0}>
          <GridTwoView
            spanLeft={5}
            spanRight={7}
            leftItem={<TextCustom>Pelapor</TextCustom>}
            rightItem={
              <TextCustom truncate={1}>
                {item?.User?.username || "-"}
              </TextCustom>
            }
          />
          <GridTwoView
            spanLeft={5}
            spanRight={7}
            leftItem={<TextCustom>Jenis Laporan</TextCustom>}
            rightItem={
              <TextCustom truncate={2}>
                {item
                  ? item?.ForumMaster_KategoriReport?.title
                    ? item?.ForumMaster_KategoriReport?.title
                    : "Lainnya"
                  : "-"}
              </TextCustom>
            }
          />
        </StackCustom>
      </AdminBasicBox>
    ),
    [],
  );

  // Header component dengan back button dan menu
  const headerComponent = useMemo(
    () => (
      <AdminBackButtonAntTitle
        title="Report Komentar"
        rightComponent={
          <ActionIcon
            icon={<IconDot size={16} color={MainColor.darkblue} />}
            onPress={() => setOpenDrawerPage(true)}
          />
        }
      />
    ),
    [],
  );

  // Detail komentar component
  const ListHeader = useMemo(
    () => (
      <AdminBasicBox>
        <StackCustom gap={"sm"}>
          <GridSpan_4_8
            label={<TextCustom bold>Username</TextCustom>}
            value={<TextCustom>{data?.Author?.username || "-"}</TextCustom>}
          />
          <GridSpan_4_8
            label={<TextCustom bold>Komentar</TextCustom>}
            value={<TextCustom>{data?.komentar || "-"}</TextCustom>}
          />
        </StackCustom>
      </AdminBasicBox>
    ),
    [data],
  );

  // Buat komponen-komponen pagination
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Belum ada report komentar",
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
        ListHeaderComponent={ListHeader}
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

      {/* Drawer untuk menu halaman (hapus komentar) */}
      <DrawerCustom
        isVisible={openDrawerPage}
        closeDrawer={() => setOpenDrawerPage(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconTrash />,
              label: "Hapus Komentar",
              value: "delete",
              path: "",
              color: MainColor.red,
            },
          ]}
          onPressItem={(item) => {
            AlertDefaultSystem({
              title: "Hapus Komentar",
              message: "Apakah Anda yakin ingin menghapus komentar ini?",
              textLeft: "Batal",
              textRight: "Hapus",
              onPressRight: async () => {
                const response = await apiAdminForumDeactivateComment({
                  id: id as string,
                  data: {
                    senderId: user?.id as string,
                  },
                });

                if (!response.success) {
                  Toast.show({
                    type: "error",
                    text1: "Komentar gagal dihapus",
                  });
                  return;
                }

                setOpenDrawerPage(false);
                Toast.show({
                  type: "success",
                  text1: "Komentar berhasil dihapus",
                });
                router.back();
              },
            });
          }}
        />
      </DrawerCustom>

      {/* Drawer untuk detail report comment */}
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
