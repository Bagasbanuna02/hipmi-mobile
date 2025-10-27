import {
  ActionIcon,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminCollaboration } from "@/service/api-admin/api-admin-collaboration";
import { Octicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminCollaborationReject() {
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
        category: "reject",
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
          <AdminComp_BoxTitle title="Reject" />
          <AdminTitleTable
            title1="Aksi"
            title2="Username"
            title3="Judul Proyek"
          />
          <Divider />

          {loadList ? (
            <LoaderCustom />
          ) : _.isEmpty(list) ? (
            <TextCustom>Belum ada data</TextCustom>
          ) : (
            list?.map((item: any) => (
              <View key={item.id}>
                <AdminTableValue
                  key={item?.id}
                  value1={
                    <ActionIcon
                      icon={
                        <Octicons
                          name="eye"
                          size={ICON_SIZE_BUTTON}
                          color="black"
                        />
                      }
                      onPress={() => {
                        router.push(`/admin/collaboration/${item?.id}/reject`);
                      }}
                    />
                  }
                  value2={
                    <TextCustom align="center" truncate={1}>
                      {item?.Author?.username || "-"}
                    </TextCustom>
                  }
                  value3={
                    <TextCustom align="center" truncate={2}>
                      {item?.title || "-"}
                    </TextCustom>
                  }
                />
              </View>
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
