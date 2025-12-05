import {
  BadgeCustom,
  CenterCustom,
  ClickableCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import AdminActionIconPlus from "@/components/_ShareComponent/Admin/ActionIconPlus";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { apiAdminMasterDonationCategory } from "@/service/api-admin/api-master-admin";
import { colorActivationForBadge } from "@/utils/colorActivationForBadge";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, View } from "react-native";
import { Divider } from "react-native-paper";

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
          <GridSpan_4_8
            label={<TextCustom bold>Status</TextCustom>}
            value={<TextCustom bold>Kategori</TextCustom>}
          />
          {/* <Grid>
            <Grid.Col style={{ paddingLeft: 10 }} span={4}>
              <TextCustom bold>Status</TextCustom>
            </Grid.Col>
            <Grid.Col span={8}>
              <TextCustom bold>Kategori</TextCustom>
            </Grid.Col>
          </Grid> */}

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
                <GridSpan_4_8
                  label={
                    <CenterCustom>
                      <BadgeCustom
                        color={colorActivationForBadge({
                          status: item.active,
                        })}
                      >
                        {item.active ? "Aktif" : "Tidak Aktif"}
                      </BadgeCustom>
                    </CenterCustom>
                  }
                  value={<TextCustom>{item.name}</TextCustom>}
                />
                {/* <Grid containerStyle={{ paddingBottom: 10 }}>
                  <Grid.Col span={4} style={{ paddingLeft: 10 }}>
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
                </Grid> */}
                <Divider />
              </ClickableCustom>
            ))}
          </StackCustom>
        </View>
      </ViewWrapper>
    </>
  );
}
