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
import { apiAdminMasterBank } from "@/service/api-admin/api-master-admin";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminAppInformation_Bank() {
  const [listData, setListData] = useState<any | null>(null);
  const [loadData, setLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadMasterBank();
    }, [])
  );

  const loadMasterBank = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminMasterBank();

      setListData(response.data);
    } catch (error) {
      console.log("[ERROR LIST BANK]", error);
      setListData([]);
    } finally {
      setLoadData(false);
    }
  };

  return (
    <>
      <StackCustom>
        <Grid>
          <Grid.Col span={3}>
            <TextCustom bold align="center">
              Aksi
            </TextCustom>
          </Grid.Col>
          <Grid.Col span={3}>
            <TextCustom bold align="center">
              Status
            </TextCustom>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextCustom bold align="center">
              Nama Bank
            </TextCustom>
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
                  <Grid.Col span={3} style={{ alignItems: "center" }}>
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
                          `/admin/app-information/information-bank/${item.id}`
                        );
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col
                    span={3}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <CenterCustom>
                      <BadgeCustom
                        color={
                          item.isActive
                            ? AccentColor.blue
                            : AccentColor.blackgray
                        }
                      >
                        {item.isActive ? "Aktif" : "Tidak Aktif"}
                      </BadgeCustom>
                    </CenterCustom>
                  </Grid.Col>
                  <Grid.Col span={6} style={{ justifyContent: "center" }}>
                    <TextCustom align="center">{item.namaBank}</TextCustom>
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
