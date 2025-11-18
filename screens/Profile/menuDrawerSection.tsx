import { AlertDefaultSystem } from "@/components";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import MenuDrawerDynamicGrid from "@/components/Drawer/MenuDrawerDynamicGird";
import { useAuth } from "@/hooks/use-auth";
import { openBrowser } from "@/utils/openBrower";
import { router } from "expo-router";

export default function Profile_MenuDrawerSection({
  drawerItems,
  setIsDrawerOpen,
  logout,
}: {
  drawerItems: IMenuDrawerItem[];
  setIsDrawerOpen: (value: boolean) => void;
  logout: () => Promise<void>;
}) {
  const handlePress = (item: IMenuDrawerItem) => {
    // console.log("ITEM >> ", item);
    if (item.value === "logout") {
      //   console.log("Logout clicked");
      // setShowLogoutAlert(true);
      AlertDefaultSystem({
        title: "Apakah anda yakin ingin keluar?",
        message: "Anda akan keluar dari akun ini",
        textLeft: "Batal",
        textRight: "Keluar",
        onPressRight: () => {
          logout();
          setIsDrawerOpen(false);
        },
        onPressLeft: () => setIsDrawerOpen(false),
      });
    } else if (item.value === "delete-account") {
      console.log("PATH >> ", item.path);
      openBrowser(item.path as any);
    } else {
      console.log("PATH >> ", item.path);
      router.push(item.path as any);
    }
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Menu Items */}
      <MenuDrawerDynamicGrid
        data={drawerItems.map((item) => ({
          icon: item.icon,
          label: item.label,
          path: item.path as any,
          color: item.color,
          value: item.value,
        }))}
        columns={4} // Ubah ke 2 jika ingin 2 kolom per baris
        onPressItem={(item) => handlePress(item as any)}
      />
    </>
  );
}
