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
    },
    {
      name: "Collaboration",
      icon: <Ionicons name="share" size={48} color="white" />,
      onPress: () => router.push("/(application)/(user)/collaboration/(tabs)"),
    },
    {
      name: "Voting",
      icon: <Ionicons name="cube" size={48} color="white" />,
      onPress: () => router.push("/(application)/(user)/voting/(tabs)"),
    },
    {
      name: "Crowdfunding",
      icon: <Ionicons name="heart" size={48} color="white" />,
      onPress: () => router.push("/(application)/(user)/crowdfunding"),
    },
  ];

  return (
    <>
      <View style={stylesHome.gridContainer}>
        {listFeature.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={stylesHome.gridItem}
            onPress={item.onPress}
          >
            {item.icon}
            <Text style={stylesHome.gridLabel}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
