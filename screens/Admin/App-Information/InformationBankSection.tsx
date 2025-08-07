import { ActionIcon, BaseBox, Divider, Grid, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import {
  ICON_SIZE_BUTTON
} from "@/constants/constans-value";
import { dummyMasterBank } from "@/lib/dummy-data/_master/bank";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Switch } from "react-native-paper";

export default function AdminAppInformation_Bank() {
  const [value, setValue] = useState(false);
  return (
    <>
      
      <BaseBox>
        <Grid>
          <Grid.Col span={3} style={{ alignItems: "center" }}>
            <TextCustom bold>Aksi</TextCustom>
          </Grid.Col>
          <Grid.Col span={3} style={{ alignItems: "center" }}>
            <TextCustom bold>Status</TextCustom>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextCustom bold>Nama Bank</TextCustom>
          </Grid.Col>
        </Grid>

        <Divider />

        {dummyMasterBank.map((e, i) => (
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
                    router.push(`/admin/app-information/information-bank/${i}`);
                  }}
                />
              </Grid.Col>
              <Grid.Col
                span={3}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Switch
                  value={value}
                  onValueChange={() => {
                    setValue(!value);
                  }}
                  theme={{
                    colors: {
                      primary: MainColor.yellow,
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={6} style={{ justifyContent: "center" }}>
                <TextCustom>{e.code}</TextCustom>
              </Grid.Col>
            </Grid>
            <Divider />
          </View>
        ))}
      </BaseBox>
    </>
  );
}
