import {
  ActionIcon,
  Grid,
  StackCustom,
  TextCustom
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import dummyMasterBidangBisnis from "@/lib/dummy-data/master-bidang-bisnis";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Divider, Switch } from "react-native-paper";

export default function AdminAppInformation_BusinessFieldSection() {
  const [value, setValue] = useState(false);
  const [selectedBusinessField, setSelectedBusinessField] = useState<any>(null);
  return (
    <>
      <>
        <Grid>
          <Grid.Col span={3} style={{ alignItems: "center" }}>
            <TextCustom bold>Aksi</TextCustom>
          </Grid.Col>
          <Grid.Col span={3} style={{ alignItems: "center" }}>
            <TextCustom bold>Status</TextCustom>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextCustom bold>Nama Bidang Bisnis</TextCustom>
          </Grid.Col>
        </Grid>

        <Divider />


        <StackCustom>
          {dummyMasterBidangBisnis.map((e, i) => (
            <View key={i}>
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
                      router.push(`/admin/app-information/business-field/${i}`);
                    }}
                  />
                </Grid.Col>
                <Grid.Col
                  span={3}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Switch
                    value={i === selectedBusinessField}
                    onValueChange={() => {
                      setValue(!value);
                      setSelectedBusinessField(i);
                    }}
                    theme={{
                      colors: {
                        primary: MainColor.yellow,
                      },
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={6} style={{ justifyContent: "center" }}>
                  <TextCustom>{e.name}</TextCustom>
                </Grid.Col>
              </Grid>
              <Divider />
            </View>
          ))}
        </StackCustom>
      </>
    </>
  );
}
