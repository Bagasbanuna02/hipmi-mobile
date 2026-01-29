import { BackButton } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { Stack } from "expo-router";

export default function AppRoot() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: MainColor.darkblue },
          headerTitleStyle: { color: MainColor.yellow, fontWeight: "bold" },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "", headerBackVisible: false }}
        />
        <Stack.Screen
          name="eula"
          options={{ title: "Terms & Conditions", headerBackVisible: false }}
        />
        {/* CEK PADA FILE */}
        {/* <Stack.Screen
          options={{
            headerShown: true,
            title: "",
            headerLeft: () => <BackButton />,
          }}
        /> */}
        <Stack.Screen
          name="verification"
          options={{ title: "", headerBackVisible: false }}
        />
        <Stack.Screen
          name="register"
          options={{ title: "", headerBackVisible: false }}
        />
        <Stack.Screen name="(application)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
