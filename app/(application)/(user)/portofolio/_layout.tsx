
import LeftButtonCustom from "@/components/Button/BackButton";
import { GStyles } from "@/styles/global-styles";
import { Stack } from "expo-router";

export default function PortofolioLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: GStyles.headerStyle,
          headerTitleStyle: GStyles.headerTitleStyle,
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => <LeftButtonCustom />,
        }}
      >
        {/* <Stack.Screen name="[id]/index" options={{ title: "Portofolio" }} /> */}
        <Stack.Screen
          name="[id]/create"
          options={{ title: "Tambah Portofolio" }}
        />
        
      </Stack>
    </>
  );
}
