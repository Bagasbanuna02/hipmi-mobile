import {
  ActionIcon,
  BadgeCustom,
  BaseBox,
  CenterCustom,
  ClickableCustom,
  DividerCustom,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import AdminActionIconPlus from "@/components/_ShareComponent/Admin/ActionIconPlus";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { GridView_3_3_6 } from "@/components/_ShareComponent/GridView_3_3_6";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { RefreshControl, View } from "react-native";
import { Divider, Switch } from "react-native-paper";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { apiAdminMasterDonationCategory } from "@/service/api-admin/api-master-admin";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";

export default function AdminDonationCategory() {
  const [listData, setListData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchMaster();
    }, [])
  );

  const fetchMaster = async () => {
    try {
      setLoading(true);
      const response = await apiAdminMasterDonationCategory();
      if (response.success) {
        console.log(JSON.stringify(response.data, null, 2));
        setListData(response.data);
      } else {
        setListData([]);
      }
    } catch (error) {
      console.log("[Error]", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMaster();
    setRefreshing(false);
  };

  return (
    <>
      <ViewWrapper
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        headerComponent={<AdminTitlePage title="Donasi" />}
      >
        <AdminComp_BoxTitle
          title="Kategori"
          rightComponent={
            <AdminActionIconPlus
              onPress={() => {
                router.push(`/admin/donation/category-create`);
              }}
            />
          }
        />

        <View>
          <Grid>
            <Grid.Col style={{paddingLeft: 10}} span={4}>
              <TextCustom bold>Status</TextCustom>
            </Grid.Col>
            <Grid.Col span={8}>
              <TextCustom bold>Kategori</TextCustom>
            </Grid.Col>
          </Grid>

          <Divider />
          <Spacing />

          <StackCustom>
            {listData.map((item, index) => (
              <ClickableCustom
                onPress={() => {
                  router.push(`/admin/donation/category-update?id=${item.id}`);
                }}
                key={index}
              >
                <Grid containerStyle={{ paddingBottom: 10 }}>
                  <Grid.Col
                    span={4}
                    style={{paddingLeft: 10}}
                     >
                    <CenterCustom>
                      <BadgeCustom
                        color={item.active ? MainColor.green : MainColor.red}
                      >
                        {item.active ? "Aktif" : "Tidak Aktif"}
                      </BadgeCustom>
                    </CenterCustom>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <TextCustom bold>{item.name}</TextCustom>
                  </Grid.Col>
                </Grid>
                <Divider />
              </ClickableCustom>
            ))}
          </StackCustom>
        </View>
      </ViewWrapper>
    </>
  );
}
