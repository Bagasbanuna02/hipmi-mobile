import {
  ActionIcon,
  ClickableCustom,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { GridSpan_NewComponent } from "@/components/_ShareComponent/GridSpan_NewComponent";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminCollaboration } from "@/service/api-admin/api-admin-collaboration";
import { Octicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminCollaborationPublish() {
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
        category: "publish",
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
          <AdminComp_BoxTitle title="Publish" />

          <GridSpan_NewComponent text1={<TextCustom bold>Username</TextCustom>} text2={<TextCustom bold>Judul Proyek</TextCustom>} />
          {/* <Spacing height={10} /> */}
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
                    router.push(`/admin/collaboration/${item?.id}/publish`);
                  }}
                >
                  <GridSpan_NewComponent
                    text1={
                      <TextCustom truncate={1}>
                        {item?.Author?.username || "-"}{" "}
                      </TextCustom>
                    }
                    text2={
                      <TextCustom truncate={2}>
                        {item?.title || "-"}
                      </TextCustom>
                    }
                  />
                </ClickableCustom>
                <Spacing height={8}/>
                <Divider/>
              </View>
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
