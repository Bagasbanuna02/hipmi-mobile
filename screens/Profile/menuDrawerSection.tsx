import { IMenuDrawerItem } from "@/components/_Interface/types";
import MenuDrawerDynamicGrid from "@/components/Drawer/MenuDrawerDynamicGird";
import { router } from "expo-router";

export default function Profile_MenuDrawerSection({
  drawerItems,
  setShowLogoutAlert,
}: {
  drawerItems: IMenuDrawerItem[];
  setShowLogoutAlert: (value: boolean) => void;
}) {
  const handlePress = (item: IMenuDrawerItem) => {
    if (item.label === "Keluar") {
    //   console.log("Logout clicked");
      setShowLogoutAlert(true);
    } else {
      console.log("PATH >> ",item.path);
      router.push(item.path as any);
    }
  };

  return (
    <>
      {/* Menu Items */}
      <MenuDrawerDynamicGrid
        data={drawerItems}
        columns={4} // Ubah ke 2 jika ingin 2 kolom per baris
        onPressItem={handlePress}
      />
    </>
  );
}
