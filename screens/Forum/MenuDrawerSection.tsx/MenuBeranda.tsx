import { IMenuDrawerItem } from "@/components/_Interface/types";
import MenuDrawerDynamicGrid from "@/components/Drawer/MenuDrawerDynamicGird";
import { router } from "expo-router";
import { drawerItemsForumBeranda } from "../ListPage";
import { AlertDefaultSystem } from "@/components";

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
  setShowDeleteAlert?: (value: boolean) => void;
  setShowAlertStatus?: (value: boolean) => void;
}) {
  const handlePress = (item: IMenuDrawerItem) => {
    if (item.label === "Hapus") {
      AlertDefaultSystem({
        title: "Hapus",
        message: "Apakah Anda yakin ingin menghapus forum ini?",
        textLeft: "Batal",
        textRight: "Hapus",
        onPressRight: () => {},
      });
    } else if (item.label === "Buka forum" || item.label === "Tutup forum") {
      AlertDefaultSystem({
        title: "Ubah Status",
        message: "Apakah Anda yakin ingin mengubah status forum ini?",
        textLeft: "Batal",
        textRight: "Ubah",
        onPressRight: () => {},
      });
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
        onPressItem={handlePress as any}
      />
    </>
  );
}
