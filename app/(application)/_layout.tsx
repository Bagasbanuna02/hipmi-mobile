/* eslint-disable @typescript-eslint/no-unused-vars */
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { Entypo } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ApplicationLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          }}
        />
        <Tabs.Screen
          name="katalog/index"
          options={{
            title: "Katalog",
            tabBarIcon: () => <Entypo name="book" size={24} color="black" />,
          }}
        />
      </Tabs>
    </>
  );
}
