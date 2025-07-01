import { MainColor } from "@/constants/color-palet";
import { Stack } from "expo-router";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: MainColor.darkblue },
            headerTitleStyle: { color: MainColor.yellow, fontWeight: "bold" },
            headerTitleAlign: "center",
            // contentStyle: {
            //   borderBottomColor: AccentColor.blue,
            //   borderBottomWidth: 2,
            // },
            // headerLargeStyle: {
            //   backgroundColor: MainColor.darkblue,
            // },
            // headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="verification" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="(application)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </>
    // <SafeAreaProvider
    //   style={{
    //     backgroundColor: AccentColor.darkblue,
    //   }}
    // >
    //   <SafeAreaView
    //     edges={[
    //       "bottom",
    //       // "top",
    //     ]}
    //     style={{
    //       flex: 1,
    //       // paddingTop: StatusBar.currentHeight,
    //       // backgroundColor: MainColor.darkblue,
    //     }}
    //   >
    //     <Stack
    //       screenOptions={{
    //         headerStyle: { backgroundColor: MainColor.darkblue },
    //         headerTitleStyle: { color: MainColor.yellow, fontWeight: "bold" },
    //         headerTitleAlign: "center",
    //         // contentStyle: {
    //         //   borderBottomColor: AccentColor.blue,
    //         //   borderBottomWidth: 2,
    //         // },
    //         // headerLargeStyle: {
    //         //   backgroundColor: MainColor.darkblue,
    //         // },
    //         // headerShadowVisible: false,
    //       }}
    //     >
    //       <Stack.Screen name="index" options={{ headerShown: false }} />
    //       <Stack.Screen name="verification" options={{ headerShown: false }} />
    //       <Stack.Screen name="register" options={{ headerShown: false }} />
    //       <Stack.Screen name="(application)" options={{ headerShown: false }} />
    //     </Stack>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}
