import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { stylesHome } from "./homeViewStyle";

export default function Home_FeatureSection() {
  return (
    <>
      <View style={stylesHome.gridContainer}>
        <TouchableOpacity
          style={stylesHome.gridItem}
          onPress={() => router.push("/(application)/(user)/event/(tabs)")}
        >
          <Ionicons name="analytics" size={48} color="white" />
          <Text style={stylesHome.gridLabel}>Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesHome.gridItem}
          onPress={() =>
            router.push("/(application)/(user)/collaboration/(tabs)")
          }
        >
          <Ionicons name="share" size={48} color="white" />
          <Text style={stylesHome.gridLabel}>Collaboration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesHome.gridItem}
          onPress={() => router.push("/(application)/(user)/voting/(tabs)")}
        >
          <Ionicons name="cube" size={48} color="white" />
          <Text style={stylesHome.gridLabel}>Voting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesHome.gridItem}>
          <Ionicons name="heart" size={48} color="white" />
          <Text style={stylesHome.gridLabel}>Crowdfunding</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={stylesHome.gridContainer}>
        <TouchableOpacity
          style={stylesHome.gridItem}
          onPress={() => router.push("/(application)/event")}
        >
          <Ionicons name="analytics" size={48} color="white" />
          <Text style={stylesHome.gridLabel}>Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesHome.gridItem}>
          <Ionicons name="share" size={48} color="white" />
          <Text style={stylesHome.gridLabel}>Collaboration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesHome.gridItem}>
          <Ionicons name="cube" size={48} color="white" />
          <Text style={stylesHome.gridLabel}>Voting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesHome.gridItem}>
          <Ionicons name="heart" size={48} color="white" />
          <Text style={stylesHome.gridLabel}>Crowdfunding</Text>
        </TouchableOpacity>
      </View> */}
    </>
  );
}
