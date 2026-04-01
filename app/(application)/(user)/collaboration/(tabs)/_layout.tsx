import { IconHome } from "@/components/_Icon";
import { TabsStyles } from "@/styles/tabs-styles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { MainColor } from "@/constants/color-palet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

function CollaborationTabsWrapper() {
  const insets = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;

  return (
    <View style={{ flex: 1, backgroundColor: MainColor.darkblue }}>
      <Tabs
        screenOptions={{
          ...TabsStyles,
          tabBarStyle: Platform.select({
            ios: {
              borderTopWidth: 0,
              paddingTop: 12,
              height: 80,
            },
            android: {
              borderTopWidth: 0,
              paddingTop: 5,
              height: 70 + paddingBottom,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Beranda",
            tabBarIcon: ({ color }) => <IconHome color={color} />,
          }}
        />
        <Tabs.Screen
          name="participant"
          options={{
            title: "Partisipan",
            tabBarIcon: ({ color }) => (
              <Ionicons size={20} name="people" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="group"
          options={{
            title: "Grup",
            tabBarIcon: ({ color }) => (
              <Ionicons size={20} name="chatbox-ellipses" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

export default function CollaborationTabsLayout() {
  return <CollaborationTabsWrapper />;
}
