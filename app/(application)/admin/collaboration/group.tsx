import {
  ClickableCustom,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { GridSpan_NewComponent } from "@/components/_ShareComponent/GridSpan_NewComponent";
import { apiAdminCollaboration } from "@/service/api-admin/api-admin-collaboration";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminCollaborationGroup() {
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handlerLoadList();
    }, [])
  );

  const handlerLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiAdminCollaboration({
        category: "group",
      });

      if (response.success) {
        setList(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Collaboration" />}>
        <StackCustom>
          <AdminComp_BoxTitle title="Group" />
          <>
            <GridSpan_NewComponent
              span1={6}
              span2={6}
              text1={
                <TextCustom bold truncate align="center">
                  Jumlah Anggota
                </TextCustom>
              }
              text2={
                <TextCustom bold truncate>
                  Nama Group
                </TextCustom>
              }
            />
            <Divider />

            {loadList ? (
              <LoaderCustom />
            ) : _.isEmpty(list) ? (
              <TextCustom align="center" color="gray">
                Belum ada data
              </TextCustom>
            ) : (
              list?.map((item: any, index: number) => (
                <View key={index}>
                  <ClickableCustom
                    onPress={() => {
                      router.push(`/admin/collaboration/${item.id}/group`);
                    }}
                  >
                    <GridSpan_NewComponent
                      span1={6}
                      span2={6}
                      text1={
                        <TextCustom truncate={1} align="center">
                          {item?.ProjectCollaboration_AnggotaRoomChat?.length ||
                            "-"}
                        </TextCustom>
                      }
                      text2={
                        <TextCustom truncate={2}>
                          {item?.name || "-"}
                        </TextCustom>
                      }
                    />
                  </ClickableCustom>
                </View>
              ))
            )}
          </>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
