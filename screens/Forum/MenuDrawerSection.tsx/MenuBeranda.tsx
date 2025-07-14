import { IMenuDrawerItem } from "@/components/_Interface/types";
import MenuDrawerDynamicGrid from "@/components/Drawer/MenuDrawerDynamicGird";
import { router } from "expo-router";
import { drawerItemsForumBeranda } from "../ListPage";

export default function Forum_MenuDrawerBerandaSection({
  id,
  status,
  setIsDrawerOpen,
  setShowDeleteAlert,
  setShowAlertStatus,
}: {
  id: string;
  status: string;
  setIsDrawerOpen: (value: boolean) => void;
  setShowDeleteAlert: (value: boolean) => void;
  setShowAlertStatus: (value: boolean) => void;
}) {
  const handlePress = (item: IMenuDrawerItem) => {
    if (item.label === "Hapus") {
      setShowDeleteAlert(true);
    } else if (item.label === "Buka forum" || item.label === "Tutup forum") {
      setShowAlertStatus(true);
    } else {
      router.push(item.path as any);
    }

    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Menu Items */}
      <MenuDrawerDynamicGrid
        data={drawerItemsForumBeranda({ id, status })}
        columns={4} // Ubah ke 2 jika ingin 2 kolom per baris
        onPressItem={handlePress}
      />
    </>
  );
}
