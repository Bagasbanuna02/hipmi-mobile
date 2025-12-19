// components/HeaderBell.tsx
import { MainColor } from "@/constants/color-palet";
import { useNotificationStore } from "@/hooks/use-notification-store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HeaderBell() {
  const { notifications , unreadCount} = useNotificationStore();
  // console.log("NOTIF:", JSON.stringify(notifications, null, 2));

  return (
    <View style={{ position: "relative" }}>
      <Ionicons
        name="notifications"
        size={20}
        color={MainColor.yellow}
        onPress={() => {
          router.push("/notifications");
        }}
      />
      {unreadCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            backgroundColor: "red",
            borderRadius: 8,
            minWidth: 16,
            height: 16,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 2,
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </Text>
        </View>
      )}
    </View>
  );
}
