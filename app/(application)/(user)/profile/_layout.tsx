import { BackButton } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <>
      <Stack>
        {/* <Stack.Screen name="[id]/index" options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="[id]/edit"
          options={{ header: () => <AppHeader title="Edit Profile" /> }}
        />
        <Stack.Screen
          name="[id]/update-photo"
          options={{ header: () => <AppHeader title="Update Foto" /> }}
        />
        <Stack.Screen
          name="[id]/update-background"
          options={{
            header: () => <AppHeader title="Update Latar Belakang" />,
          }}
        />
        <Stack.Screen
          name="create"
          options={{ header: () => <AppHeader title="Buat Profil" showBack={false} /> }}
        />

        <Stack.Screen
          name="[id]/blocked-list"
          options={{ header: () => <AppHeader title="Daftar Blokir" /> }}
        />

        <Stack.Screen
          name="[id]/detail-blocked"
          options={{ header: () => <AppHeader title="Detail Blokir" /> }}
        />
      </Stack>
    </>
  );
}
