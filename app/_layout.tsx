/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccentColor, MainColor } from "@/constants/color-palet";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

export default function RootLayout() {
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: MainColor.darkblue,
      }}
    >
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: MainColor.darkblue },
          headerTitleStyle: { color: MainColor.yellow, fontWeight: "bold" },
          headerTitleAlign: "center",
          contentStyle: {
            borderBottomColor: AccentColor.blue,
            borderBottomWidth: 2,
          },
          // headerLargeStyle: {
          //   backgroundColor: MainColor.darkblue,
          // },
          // headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          // options={{
          //   title: "Login",
          //   headerStyle: { backgroundColor: MainColor.darkblue },
          //   headerTitleStyle: { color: MainColor.yellow, fontWeight: "bold" },
          //   headerTitleAlign: "center",
          //   headerRight: () => (
          //     <MaterialIcons name="rocket" size={20} color={MainColor.yellow} />
          //   ),
          //   headerLeft: () => (
          //     <Icon name="rocket" size={20} color={MainColor.yellow} />
          //   ),
          // }}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="verification" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(application)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
