import Grid from "@/components/Grid/GridCustom";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminTableValue({
  value1,
  value2,
  value3,
  style1,
  style2,
  style3,
  bottomLine = false,
}: {
  value1: React.ReactNode;
  value2: React.ReactNode;
  value3: React.ReactNode;
  style1?: ViewStyle;
  style2?: ViewStyle;
  style3?: ViewStyle;
  bottomLine?: boolean;
}) {
  return (
    <>
      <View style={{ paddingVertical: 5 }}>
        <Grid>
          <Grid.Col
            span={3}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 10,
              paddingRight: 10,
              ...style1,
            }}
          >
            {value1}
          </Grid.Col>
          <Grid.Col
            span={3}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 10,
              paddingRight: 10,
              ...style2,
            }}
          >
            {value2}
          </Grid.Col>
          <Grid.Col
            span={6}
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: 10,
              paddingRight: 10,
              ...style3,
            }}
          >
            {value3}
          </Grid.Col>
        </Grid>
        {bottomLine && <Divider />}
      </View>
    </>
  );
}
