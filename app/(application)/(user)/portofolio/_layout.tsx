import LeftButtonCustom from "@/components/Button/BackButton";
import { HeaderStyles } from "@/styles/header-styles";
import { Stack } from "expo-router";

export default function PortofolioLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          ...HeaderStyles,
          headerLeft: () => <LeftButtonCustom />,
        }}
      >
        {/* <Stack.Screen name="[id]/index" options={{ title: "Portofolio" }} /> */}
        <Stack.Screen
          name="[id]/create"
          options={{ title: "Tambah Portofolio" }}
        />
        <Stack.Screen
          name="[id]/list"
          options={{ title: "Daftar Portofolio" }}
        />
      </Stack>
    </>
  );
}
