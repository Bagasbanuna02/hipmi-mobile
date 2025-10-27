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
            <AdminTitleTable
              title1="Aksi"
              title2="Jumlah peserta"
              title3="Nama group"
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
                  <AdminTableValue
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
                          router.push(`/admin/collaboration/${item.id}/group`);
                        }}
                      />
                    }
                    value2={
                      <TextCustom truncate={1}>
                        {item?.ProjectCollaboration_AnggotaRoomChat?.length ||
                          "-"}
                      </TextCustom>
                    }
                    value3={
                      <TextCustom truncate={2}>{item?.name || "-"}</TextCustom>
                    }
                  />
                </View>
              ))
            )}
          </>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
