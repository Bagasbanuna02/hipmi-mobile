/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  AlertDefaultSystem,
  BadgeCustom,
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
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import {
  apiAdminForumDeactivatePosting,
  apiAdminForumListReportPostingById,
  apiAdminForumPostingById,
} from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Divider } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminForumReportPosting() {
  const { id } = useLocalSearchParams();
  const [openDrawerPage, setOpenDrawerPage] = useState(false);
  const [openDrawerAction, setOpenDrawerAction] = useState(false);

  const [data, setData] = useState<any | null>(null);
  const [listReport, setListReport] = useState<any[] | null>(null);
  const [loadListReport, setLoadListReport] = useState(false);
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
      setLoadListReport(true);
      const response = await apiAdminForumPostingById({
        id: id as string,
      });

      const responseReport = await apiAdminForumListReportPostingById({
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
    } finally {
      setLoadListReport(false);
    }
  };

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title="Report Posting"
            rightComponent={
              <ActionIcon
                icon={<IconDot size={16} color={MainColor.darkblue} />}
                onPress={() => setOpenDrawerPage(true)}
              />
            }
          />
        }
      >
        <BaseBox>
          <StackCustom gap={"sm"}>
            <GridSpan_4_8
              label={<TextCustom bold>Username</TextCustom>}
              value={<TextCustom>{data?.Author?.username || "-"}</TextCustom>}
            />

            <GridSpan_4_8
              label={<TextCustom bold>Status</TextCustom>}
              value={
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

            <GridSpan_4_8
              label={<TextCustom bold>Postingan</TextCustom>}
              value={<TextCustom>{data?.diskusi || "-"}</TextCustom>}
            />
          </StackCustom>
        </BaseBox>

        <AdminComp_BoxTitle title="Daftar Report Posting" />
        <StackCustom gap={"sm"}>
          <AdminTitleTable
            title1="Aksi"
            title2="Pelapor"
            title3="Kategori Report"
          />
          <Divider />
          {loadListReport ? (
            <LoaderCustom />
          ) : _.isEmpty(listReport) ? (
            <TextCustom align="center" color={"gray"}>
              Belum ada report
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
                        id: item?.id,
                        username: item?.User?.username,
                        kategori: item?.ForumMaster_KategoriReport?.title,
                        keterangan: item?.ForumMaster_KategoriReport?.deskripsi,
                        deskripsi: item?.deskripsi,
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
