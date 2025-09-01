import { MapCustom, ViewWrapper } from "@/components";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function Maps() {
  return (
    <ViewWrapper style={{ paddingInline: 0, paddingBlock: 0 }}>
      {/* <MapCustom height={"100%"} /> */}
      <View style={{ flex: 1 }}>
        <MapView
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </ViewWrapper>
  );
}
