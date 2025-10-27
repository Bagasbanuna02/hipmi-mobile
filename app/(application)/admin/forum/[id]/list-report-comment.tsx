/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  AlertDefaultSystem,
  BaseBox,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconDot, IconView } from "@/components/_Icon/IconComponent";
import { IconTrash } from "@/components/_Icon/IconTrash";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import {
  apiAdminForumCommentById,
  apiAdminForumDeactivateComment,
  apiAdminForumListReportCommentById,
} from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Divider } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminForumReportComment() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [listReport, setListReport] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerAction, setOpenDrawerAction] = useState(false);
  const [selectedReport, setSelectedReport] = useState({
    id: "",
    username: "",
    kategori: "",
    keterangan: "",
    deskripsi: "",
  });

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadList(true);
      const response = await apiAdminForumCommentById({
        id: id as string,
        category: "get-one",
      });

      const responseReport = await apiAdminForumListReportCommentById({
        id: id as string,
      });

      if (response.success) {
        setData(response.data);
      }
      if (responseReport.success) {
        setListReport(responseReport.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setData(null);
      setListReport([]);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title="Report Komentar"
            rightComponent={
              <ActionIcon
                icon={<IconDot size={16} color={MainColor.darkblue} />}
                onPress={() => setOpenDrawer(true)}
              />
            }
          />
        }
      >
        <BaseBox>
          <StackCustom gap={"sm"}>
            <GridDetail_4_8
              label={<TextCustom bold>Username</TextCustom>}
              value={<TextCustom>{data?.Author?.username || "-"}</TextCustom>}
            />
            <GridDetail_4_8
              label={<TextCustom bold>Komentar</TextCustom>}
              value={<TextCustom>{data?.komentar || "-"}</TextCustom>}
            />
          </StackCustom>
        </BaseBox>

        <AdminComp_BoxTitle title="Daftar Report Komentar" />

        <StackCustom>
          <AdminTitleTable
            title1="Aksi"
            title2="Pelapor"
            title3="Kategori Report"
          />
          <Divider />
          {loadList ? (
            <LoaderCustom />
          ) : _.isEmpty(listReport) ? (
            <TextCustom align="center" color="gray">
              Tidak ada report
            </TextCustom>
          ) : (
            listReport?.map((item: any, index: number) => (
              <AdminTableValue
                key={index}
                value1={
                  <ActionIcon
                    icon={<IconView size={ICON_SIZE_BUTTON} color="black" />}
                    onPress={() => {
                      setOpenDrawerAction(true);
                      setSelectedReport({
                        id: item.id,
                        username: item.User?.username,
                        kategori: item.ForumMaster_KategoriReport?.title,
                        keterangan: item.ForumMaster_KategoriReport?.deskripsi,
                        deskripsi: item.deskripsi,
                      });
                    }}
                  />
                }
                value2={
                  <TextCustom truncate={1}>
                    {item?.User?.username || "-"}
                  </TextCustom>
                }
                value3={
                  <TextCustom truncate={2} align="center">
                    {item?.ForumMaster_KategoriReport?.title || "-"}
                  </TextCustom>
                }
              />
            ))
          )}
        </StackCustom>
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
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
                const deleteComment = await apiAdminForumDeactivateComment({
                  id: id as string,
                });

                if (!deleteComment.success) {
                  Toast.show({
                    type: "error",
                    text1: "Komentar gagal dihapus",
                  });
                  return;
                }

                setOpenDrawer(false);
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

      <DrawerCustom
        isVisible={openDrawerAction}
        closeDrawer={() => setOpenDrawerAction(false)}
        height={"auto"}
      >
        <StackCustom>
          <GridDetail_4_8
            label={<TextCustom bold>Pelapor</TextCustom>}
            value={<TextCustom>{selectedReport?.username || "-"}</TextCustom>}
          />

          {selectedReport?.kategori && (
            <>
              <GridDetail_4_8
                label={<TextCustom bold>Kategori Report</TextCustom>}
                value={
                  <TextCustom>{selectedReport?.kategori || "-"}</TextCustom>
                }
              />
              <GridDetail_4_8
                label={<TextCustom bold>Keterangan</TextCustom>}
                value={
                  <TextCustom>{selectedReport?.keterangan || "-"}</TextCustom>
                }
              />
            </>
          )}

          {selectedReport?.deskripsi && (
            <GridDetail_4_8
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
