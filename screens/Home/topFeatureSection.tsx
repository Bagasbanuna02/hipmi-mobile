import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { stylesHome } from "./homeViewStyle";

export default function Home_FeatureSection() {
  const listFeature = [
    {
      name: "Event",
      icon: <Ionicons name="analytics" size={48} color="white" />,
      onPress: () => router.push("/(application)/(user)/event/(tabs)"),
      status: "active",
    },
    {
      name: "Collaboration",
      icon: <Ionicons name="share" size={48} color="gray" />,
      onPress: () => router.push("/(application)/(user)/collaboration/(tabs)"),
      status: "inactive",
    },
    {
      name: "Voting",
      icon: <Ionicons name="cube" size={48} color="white" />,
      onPress: () => router.push("/(application)/(user)/voting/(tabs)"),
      status: "active",
    },
    {
      name: "Crowdfunding",
      icon: <Ionicons name="heart" size={48} color="white" />,
      onPress: () => router.push("/(application)/(user)/crowdfunding"),
      status: "active",
    },
  ];

  return (
    <>
      <View style={stylesHome.gridContainer}>
        {listFeature.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={item.status === "inactive" ? stylesHome.gridItemInactive : stylesHome.gridItem}
            onPress={item.onPress}
            disabled={item.status === "inactive"}
          >
            {item.icon}
            <Text style={item.status === "inactive" ? stylesHome.gridLabelInactive : stylesHome.gridLabel}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
