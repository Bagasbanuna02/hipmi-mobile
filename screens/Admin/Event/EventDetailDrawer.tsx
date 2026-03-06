import { DrawerCustom, MenuDrawerDynamicGrid } from "@/components";
import { IconList } from "@/components/_Icon/IconComponent";
import { router } from "expo-router";

interface EventDetailDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  eventId: string;
}

export function EventDetailDrawer({
  isVisible,
  onClose,
  eventId,
}: EventDetailDrawerProps) {
  return (
    <DrawerCustom
      isVisible={isVisible}
      closeDrawer={onClose}
      height={"auto"}
    >
      <MenuDrawerDynamicGrid
        data={[
          {
            label: "Daftar Peserta",
            icon: <IconList />,
            path: `/admin/event/${eventId}/list-of-participants`,
          },
        ]}
        onPressItem={(item) => {
          onClose();
          router.push(item.path as any);
        }}
      />
    </DrawerCustom>
  );
}
