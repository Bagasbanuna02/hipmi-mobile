import MapsView from "@/screens/Maps/MapsView";
import MapsView2 from "@/screens/Maps/MapsView2";
import { Text, View } from "react-native";

export interface LocationItem {
  id: string | number;
  latitude: number;
  longitude: number;
  name: string;
  imageId?: string;
}

export default function Maps() {
  return (
    <>
      <MapsView />
      {/* <MapsView2 />, */}
      {/* <View style={{ flex: 1, backgroundColor: "gray" }}><Text style={{ color: "white" }}>Map disabled</Text></View> */}
    </>
  );
}
