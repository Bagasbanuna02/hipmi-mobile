import AppHeader from "@/components/_ShareComponent/AppHeader";
import LeftButtonCustom from "@/components/Button/BackButton";
import { Stack } from "expo-router";

export default function PortofolioLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          header: () => (
            <AppHeader title="Portofolio" left={<LeftButtonCustom />} />
          ),
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
        <Stack.Screen name="[id]/edit" options={{ title: "Edit Portofolio" }} />
        <Stack.Screen name="[id]/edit-logo" options={{ title: "Edit Logo " }} />
        <Stack.Screen
          name="[id]/edit-social-media"
          options={{ title: "Edit Social Media" }}
        />
      </Stack>
    </>
  );
}
