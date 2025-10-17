/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  AlertDefaultSystem,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconView } from "@/components/_Icon/IconComponent";
import { IconOpenTo } from "@/components/_Icon/IconOpenTo";
import { IconTrash } from "@/components/_Icon/IconTrash";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import { MainColor } from "@/constants/color-palet";
import {
  ICON_SIZE_BUTTON,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_XLARGE,
} from "@/constants/constans-value";
import { apiAdminForumCommentById } from "@/service/api-admin/api-admin-forum";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Divider } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminForumListComment() {
  const { id } = useLocalSearchParams();
  const [openDrawerAction, setOpenDrawerAction] = useState(false);

  console.log("[ID]", id);

  const [listComment, setListComment] = useState<any[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadComment();
    }, [id])
  );

  const onLoadComment = async () => {
    try {
      const response = await apiAdminForumCommentById({
        id: id as string,
        category: "get-all",
      });

      console.log("[RES COMMENT]", JSON.stringify(response, null, 2));
      if (response.success) {
        setListComment(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setListComment([]);
    }
  };

  const handlerAction = (item: { value: string; path: string }) => {
    if (item.value === "delete") {
      AlertDefaultSystem({
        title: "Hapus Posting",
        message: "Apakah Anda yakin ingin menghapus posting ini?",
        textLeft: "Batal",
        textRight: "Hapus",
        onPressRight: () => {
          Toast.show({
            type: "success",
            text1: "Posting berhasil dihapus",
          });
        },
      });
    } else {
      router.navigate(item.path as any);
    }
    setOpenDrawerAction(false);
  };
  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Daftar Komentar" />}
      >
        <StackCustom>
          <AdminTitleTable title1="Aksi" title2="Username" title3="Komentar" />
          <Divider />
          {!listComment ? (
            <LoaderCustom />
          ) : _.isEmpty(listComment) ? (
            <TextCustom align="center" color="gray">
              Tidak ada komentar
            </TextCustom>
          ) : (
            listComment?.map((item: any, index: number) => (
              <AdminTableValue
                key={index}
                value1={
                  <IconOpenTo
                    onPress={() => {
                      router.push(
                        `/admin/forum/${item.id}/list-report-comment`
                      );
                    }}
                  />
                }
                value2={
                  <TextCustom truncate={1}>
                    {item?.Author?.username || "-"}
                  </TextCustom>
                }
                value3={
                  <TextCustom truncate={2}>{item?.komentar || "-"}</TextCustom>
                }
              />
            ))
          )}
        </StackCustom>
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawerAction}
        closeDrawer={() => setOpenDrawerAction(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconView />,
              label: "Detail Komentar",
              value: "detail",
              path: `admin/forum/${id}/list-report-comment`,
            },
            {
              icon: (
                <IconTrash size={ICON_SIZE_MEDIUM} color={MainColor.white} />
              ),
              label: "Hapus Komentar",
              value: "delete",
              path: "",
              color: MainColor.red,
            },
          ]}
          onPressItem={(item) => {
            handlerAction(item as any);
          }}
        />
      </DrawerCustom>
    </>
  );
}
