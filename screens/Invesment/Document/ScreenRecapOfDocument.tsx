/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL, PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { usePagination } from "@/hooks/use-pagination";
import Investment_BoxDetailDocument from "@/screens/Invesment/Document/RecapBoxDetail";
import {
  apiInvestmentDeleteDocument,
  apiInvestmentGetDocument,
} from "@/service/api-client/api-investment";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import Toast from "react-native-toast-message";

export default function Investment_ScreenRecapOfDocument() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerBox, setOpenDrawerBox] = useState(false);
  const [selectId, setSelectId] = useState<string | null>(null);

  // Setup pagination
  const pagination = usePagination({
    fetchFunction: async (page) => {
      if (!id) return { data: [] };

      return await apiInvestmentGetDocument({
        id: id as string,
        category: "all-document",
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE,
    dependencies: [id],
    onError: (error) => console.error("[ERROR] Fetch document:", error),
  });

  // Generate komponen
  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      emptyMessage: "Tidak ada dokumen",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 100,
    });

  const handlerDeleteDocument = async () => {
    try {
      const response = await apiInvestmentDeleteDocument({
        id: selectId as string,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Data berhasil dihapus",
        });
        // Hapus item dari list
        pagination.setListData((prev: any) => {
          if (!prev) return null;
          return prev.filter((item: any) => item.id !== selectId);
        });

        pagination.onRefresh();
        setOpenDrawerBox(false);
        setSelectId(null);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      Toast.show({
        type: "error",
        text1: "Gagal menghapus data",
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      pagination.onRefresh();
    }, []),
  );

  // Render item dokumen
  const renderDocumentItem = ({ item }: { item: any }) => (
    <Investment_BoxDetailDocument
      key={item.id}
      title={item.title}
      leftIcon={
        <Ionicons
          name="ellipsis-horizontal-outline"
          size={ICON_SIZE_SMALL}
          color={MainColor.white}
          style={{
            zIndex: 10,
            alignSelf: "flex-end",
          }}
          onPress={() => {
            setSelectId(item.id);
            setOpenDrawerBox(true);
          }}
        />
      }
      href={`/(file)/${item.fileId}`}
    />
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Rekap Dokumen",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <DotButton
              onPress={() => {
                setOpenDrawer(true);
                setOpenDrawerBox(false);
              }}
            />
          ),
        }}
      />

      <NewWrapper
        hideFooter
        listData={pagination.listData}
        renderItem={renderDocumentItem}
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

      {/* Drawer On Header */}
      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: (
                <AntDesign
                  name="plus-circle"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              label: "Tambah Dokumen",
              path: `/investment/${id}/(document)/add-document`,
            },
          ]}
          onPressItem={(item) => {
            router.push(item.path as any);
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>

      {/* Drawer On Box */}
      <DrawerCustom
        isVisible={openDrawerBox}
        closeDrawer={() => setOpenDrawerBox(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconEdit />,
              label: "Edit Dokumen",
              path: `/investment/${selectId}/(document)/edit-document`,
            },
            {
              icon: (
                <Ionicons
                  name="trash-outline"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              label: "Hapus Dokumen",
              path: "" as any,
              color: MainColor.red,
            },
          ]}
          onPressItem={(item) => {
            if (item.path === ("" as any)) {
              AlertDefaultSystem({
                title: "Hapus Dokumen",
                message: "Apakah anda yakin ingin menghapus dokumen ini?",
                textLeft: "Batal",
                textRight: "Hapus",
                onPressRight: () => {
                  handlerDeleteDocument();
                },
              });
            } else {
              router.push(item.path as any);
            }

            setOpenDrawerBox(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
