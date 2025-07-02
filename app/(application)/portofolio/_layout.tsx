
import BackButton from "@/components/_ShareComponent/BackButton";
import { Styles } from "@/styles/global-styles";
import { Stack } from "expo-router";

export default function PortofolioLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: Styles.headerStyle,
          headerTitleStyle: Styles.headerTitleStyle,
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => <BackButton />,
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
