import MapsView2 from "@/screens/Maps/MapsView2";

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
      {/* <Stack.Screen
        options={{
          title: "Maps",
          headerLeft: () => <BackButton />,
        }}
        /> */}
      {/* {Platform.OS === "ios" ? <MapsView /> : <MapsView2 />} */}
      <MapsView2 />
      {/* <View style={{ flex: 1, backgroundColor: "gray" }}><Text style={{ color: "white" }}>Map disabled</Text></View> */}
    </>
  );
}
