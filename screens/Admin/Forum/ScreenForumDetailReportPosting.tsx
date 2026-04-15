/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  AlertDefaultSystem,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  OS_Wrapper,
  StackCustom,
  TextCustom,
} from "@/components";
import { IconDot } from "@/components/_Icon/IconComponent";
import { IconTrash } from "@/components/_Icon/IconTrash";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { MainColor } from "@/constants/color-palet";
import { PADDING_INLINE } from "@/constants/constans-value";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { useAuth } from "@/hooks/use-auth";
import { usePagination } from "@/hooks/use-pagination";
import {
  apiAdminForumDeactivatePosting,
  apiAdminForumListReportPostingById,
  apiAdminForumPostingById,
} from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { RefreshControl } from "react-native";
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
    }, [id]),
  );

  // Pagination untuk list report
  const pagination = usePagination({
    fetchFunction: async (page) => {
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
    ({ item, index }: { item: any; index: number }) => (
      <AdminBasicBox
        key={index}
        // style={{ marginHorizontal: 5, marginVertical: 5 }}
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
    [],
  );

  // Detail postingan component
  const ListHeader = useMemo(
    () => (
      <AdminBasicBox>
        <StackCustom gap={0}>
          <GridTwoView
            spanLeft={5}
            spanRight={7}
            leftItem={<TextCustom bold>Username</TextCustom>}
            rightItem={
              <TextCustom>{data ? data?.Author?.username : "-"}</TextCustom>
            }
          />

          <GridTwoView
            spanLeft={5}
            spanRight={7}
            leftItem={<TextCustom bold>Postingan</TextCustom>}
            rightItem={<TextCustom>{data ? data?.diskusi : "-"}</TextCustom>}
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
      emptyMessage: "Belum ada report",
      emptySearchMessage: "Tidak ada hasil pencarian",
      isInitialLoad: pagination.isInitialLoad,
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  return (
    <>
      <OS_Wrapper
        contentPadding={PADDING_INLINE}
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
