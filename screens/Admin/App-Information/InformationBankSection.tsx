import {
  BaseBox,
  ButtonCustom,
  Divider,
  Grid,
  TextCustom
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { dummyMasterBank } from "@/lib/dummy-data/_master/bank";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-paper";

export default function AdminAppInformation_Bank() {
  const [value, setValue] = useState(false);
  return (
    <>
      <AdminComp_BoxTitle
        title="Bank"
        rightComponent={
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: MainColor.yellow,
              padding: 5,
              borderRadius: 50,
            }}
            onPress={() => {}}
          >
            <Ionicons name="add" size={16} color="black" />
          </TouchableOpacity>
        }
      />
      <BaseBox>
        <Grid>
          <Grid.Col span={4} style={{ alignItems: "center" }}>
            <TextCustom bold>Aksi</TextCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "center" }}>
            <TextCustom bold>Status</TextCustom>
          </Grid.Col>
          <Grid.Col span={4}>
            <TextCustom bold>Nama Bank</TextCustom>
          </Grid.Col>
        </Grid>

        <Divider />

        {dummyMasterBank.map((e, i) => (
          <View key={i}>
            <Grid>
              <Grid.Col span={4}>
                <ButtonCustom
                  iconLeft={
                    <FontAwesome5
                      name="edit"
                      size={ICON_SIZE_SMALL}
                      color="black"
                    />
                  }
                  onPress={() => {}}
                >
                  Edit
                </ButtonCustom>
              </Grid.Col>
              <Grid.Col
                span={4}
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
              <Grid.Col span={4} style={{ justifyContent: "center" }}>
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
