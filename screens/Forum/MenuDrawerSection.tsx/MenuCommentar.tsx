import { MenuDrawerDynamicGrid } from "@/components";
import { drawerItemsForumComentar } from "../ListPage";
import { router } from "expo-router";

export default function Forum_MenuDrawerCommentar({
  id,
  setShowDeleteAlert,
  setIsDrawerOpen,
}: {
  id: string;
  setShowDeleteAlert: (value: boolean) => void;
  setIsDrawerOpen: (value: boolean) => void;
}) {
  const handlePress = (item: any) => {
    if (item.label === "Hapus") {
      setShowDeleteAlert(true);
    } else {
      router.push(item.path as any);
    }

    setIsDrawerOpen(false);
  };

  return (
    <>
      <MenuDrawerDynamicGrid
        data={drawerItemsForumComentar({ id })}
        columns={4}
        onPressItem={handlePress}
      />
    </>
  );
}
