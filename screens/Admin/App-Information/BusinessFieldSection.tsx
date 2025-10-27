import {
  ActionIcon,
  BadgeCustom,
  CenterCustom,
  Grid,
  LoaderCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import { AccentColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminMasterBusinessField } from "@/service/api-admin/api-master-admin";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminAppInformation_BusinessFieldSection() {
  const [listData, setListData] = useState<any[] | null>(null);
  const [loadData, setLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [])
  );

  const onLoadList = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminMasterBusinessField();


      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR LIST BUSINESS FIELD]", error);
      setListData([]);
    } finally {
      setLoadData(false);
    }
  };

  return (
    <>
      <StackCustom>
        <Grid>
          <Grid.Col span={2} style={{ alignItems: "center" }}>
            <TextCustom bold>Aksi</TextCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "center" }}>
            <TextCustom bold>Status</TextCustom>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextCustom bold>Nama Bidang Bisnis</TextCustom>
          </Grid.Col>
        </Grid>

        <Divider />

        {loadData ? (
          <LoaderCustom />
        ) : _.isEmpty(listData) ? (
          <TextCustom align="center">Tidak ada data</TextCustom>
        ) : (
          <StackCustom>
            {listData?.map((item: any, index: number) => (
              <View key={index}>
                <Grid>
                  <Grid.Col span={2} style={{ alignItems: "center" }}>
                    <ActionIcon
                      icon={
                        <FontAwesome5
                          name="edit"
                          size={ICON_SIZE_BUTTON}
                          color="black"
                        />
                      }
                      onPress={() => {
                        router.push(
                          `/admin/app-information/business-field/${item.id}`
                        );
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <CenterCustom>
                      <BadgeCustom
                        color={
                          item.active ? AccentColor.blue : AccentColor.blackgray
                        }
                      >
                        {item.active ? "Aktif" : "Tidak Aktif"}
                      </BadgeCustom>
                    </CenterCustom>
                  </Grid.Col>
                  <Grid.Col span={6} style={{ justifyContent: "center" }}>
                    <TextCustom>{item.name}</TextCustom>
                  </Grid.Col>
                </Grid>
              </View>
            ))}
          </StackCustom>
        )}
      </StackCustom>
    </>
  );
}
