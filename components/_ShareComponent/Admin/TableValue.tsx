import Grid from "@/components/Grid/GridCustom";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminTableValue({
  value1,
  value2,
  value3,
  bottomLine = false,
}: {
  value1: React.ReactNode;
  value2: React.ReactNode;
  value3: React.ReactNode;
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
            }}
          >
            {value2}
          </Grid.Col>
          <Grid.Col
            span={6}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
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
