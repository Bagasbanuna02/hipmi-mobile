import {
  ActionIcon,
  BadgeCustom,
  CenterCustom,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import AdminActionIconPlus from "@/components/_ShareComponent/Admin/ActionIconPlus";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { GridViewCustomSpan } from "@/components/_ShareComponent/GridViewCustomSpan";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminMasterTypeOfEvent } from "@/service/api-admin/api-master-admin";
import { colorActivationForBadge } from "@/utils/colorActivationForBadge";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminEventTypeOfEvent() {
  const [listData, setListData] = useState<any[] | null>(null);
  const [loadData, setLoadData] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminMasterTypeOfEvent();

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]",error);
      setListData([]);
    } finally {
      setLoadData(false);
    }
  };

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Event" />}>
        <AdminComp_BoxTitle
          title="Tipe Acara"
          rightComponent={
            <AdminActionIconPlus
              onPress={() => {
                router.push(`/admin/event/type-create`);
              }}
            />
          }
        />

        <>
          <GridViewCustomSpan
            span1={2}
            span2={5}
            span3={5}
            component1={
              <TextCustom bold align="center">
                Aksi
              </TextCustom>
            }
            component2={<TextCustom bold align="center">Status</TextCustom>}
            component3={<TextCustom bold>Tipe Acara</TextCustom>}
          />
          <Divider />
          <Spacing />

          <StackCustom>
            {loadData ? (
              <LoaderCustom />
            ) : _.isEmpty(listData) ? (
              <TextCustom align="center" color="gray">
                Belum ada data
              </TextCustom>
            ) : (
              listData?.map((item, index) => (
                <View key={index}>
                  <GridViewCustomSpan
                    span1={2}
                    span2={5}
                    span3={5}
                    component1={
                      <CenterCustom>
                        <ActionIcon
                          icon={
                            <IconEdit size={ICON_SIZE_BUTTON} color="black" />
                          }
                          onPress={() => {
                            router.push(`/admin/event/type-update?id=${item.id}`);
                          }}
                        />
                      </CenterCustom>
                    }
                    style2={{ alignItems: "center" }}
                    component2={
                      <CenterCustom>
                        <BadgeCustom
                          color={colorActivationForBadge({
                            status: item?.active,
                          })}
                        >
                          {item?.active ? "Aktif" : "Tidak Aktif"}
                        </BadgeCustom>
                      </CenterCustom>
                    }
                    component3={<TextCustom >{item.name}</TextCustom>}
                  />
                </View>
              ))
            )}
          </StackCustom>
        </>
      </ViewWrapper>
    </>
  );
}
