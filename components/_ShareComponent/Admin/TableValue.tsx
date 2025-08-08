import Grid from "@/components/Grid/GridCustom";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminTableValue({
  value1,
  value2,
  value3,
}: {
  value1: React.ReactNode;
  value2: React.ReactNode;
  value3: React.ReactNode;
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
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            {value1}
          </Grid.Col>
          <Grid.Col
            span={3}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            {value2}
          </Grid.Col>
          <Grid.Col
            span={6}
            style={{
              justifyContent: "center",
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            {value3}
          </Grid.Col>
        </Grid>
        <Divider />
      </View>
    </>
  );
}
