import { IMenuDrawerItem } from "@/components/_Interface/types";
import MenuDrawerDynamicGrid from "@/components/Drawer/MenuDrawerDynamicGird";
import { router } from "expo-router";
import { AlertDefaultSystem } from "@/components";
import {
  drawerItemsForumBerandaForAuthor,
  drawerItemsForumBerandaForNonAuthor,
} from "../ListPage";
import { useAuth } from "@/hooks/use-auth";
import { apiForumDelete } from "@/service/api-client/api-forum";
import Toast from "react-native-toast-message";

export default function Forum_MenuDrawerBerandaSection({
  id,
  status,
  setIsDrawerOpen,
  authorId,
  handlerUpdateStatus,
}: {
  id: string;
  status: string;
  setIsDrawerOpen: (value: boolean) => void;
  authorId: string;
  handlerUpdateStatus?: (value: string) => void;
}) {
  const { user } = useAuth();
  const handlePress = (item: IMenuDrawerItem) => {
    if (item.label === "Hapus") {
      AlertDefaultSystem({
        title: "Hapus diskusi",
        message: "Apakah Anda yakin ingin menghapus diskusi ini?",
        textLeft: "Batal",
        textRight: "Hapus",
        onPressRight: async () => {
          try {
            const response = await apiForumDelete({ id });
           
            if (response.success) {
              Toast.show({
                type: "success",
                text1: "Berhasil dihapus",
              });
              router.back();
            } else {
              Toast.show({
                type: "error",
                text1: response.message,
              });
            }
          } catch (error) {
            console.log("[ERROR]", error);
          }
        },
      });
    } else if (item.label === "Buka forum" || item.label === "Tutup forum") {
      AlertDefaultSystem({
        title: "Ubah Status",
        message: "Apakah Anda yakin ingin mengubah status forum ini?",
        textLeft: "Batal",
        textRight: "Ubah",
        onPressRight: () => {
          handlerUpdateStatus?.(item.label === "Buka forum" ? "Open" : "Closed");
        },
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
        data={
          authorId === user?.id
            ? drawerItemsForumBerandaForAuthor({ id, status })
            : drawerItemsForumBerandaForNonAuthor({ id })
        }
        columns={4} // Ubah ke 2 jika ingin 2 kolom per baris
        onPressItem={handlePress as any}
      />
    </>
  );
}
