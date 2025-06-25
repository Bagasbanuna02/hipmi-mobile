import Spacing from "@/components/_ShareComponent/Spacing";
import { MainColor } from "@/constants/color-palet";
import { globalStyles } from "@/constants/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DynamicTruncatedText from "../_ShareComponent/TruncatedText";
import { stylesHome } from "./homeViewStyle";

export default function HomeView() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "HIPMI",
      headerLeft: () => (
        <Ionicons name="search" size={20} color={MainColor.white} />
      ),
      headerRight: () => (
        <Ionicons name="notifications" size={20} color={MainColor.white} />
      ),
    });
  }, [navigation]);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.mainContainer}>
          <Spacing height={20} />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("@/assets/images/constants/home-hipmi.png")}
              // placeholder={{ blurhash: "" }}
              contentFit="cover"
              transition={1000}
              style={{
                width: "100%",
                height: 120,
                borderRadius: 10,
              }}
            />
          </View>

          <Spacing height={10} />

          {/* Grid Section */}
          <View style={stylesHome.gridContainer}>
            <TouchableOpacity style={stylesHome.gridItem}>
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
          </View>

          <Spacing height={10} />

          {/* Job Vacancy Section */}
          <View style={stylesHome.jobVacancyContainer}>
            <View style={stylesHome.jobVacancyHeader}>
              <Icon name="briefcase" size={24} color="white" />
              <Text style={stylesHome.jobVacancyTitle}>Job Vacancy</Text>
            </View>

            <View style={stylesHome.vacancyList}>
              {/* Vacancy Item 1 */}
              <View style={stylesHome.vacancyItem}>
                {/* <Icon name="user" size={20} color="#FFD700" /> */}
                <View style={stylesHome.vacancyDetails}>
                  <DynamicTruncatedText
                    text="Bagas_banuna"
                    fontSize={14}
                    fontFamily="System"
                    style={stylesHome.vacancyName}
                  />
                  <Spacing height={5} />
                  <DynamicTruncatedText
                    text="Dicari perawat kucing"
                    fontSize={12}
                    fontFamily="System"
                    style={stylesHome.vacancyDescription}
                  />
                </View>
              </View>

              {/* Vacancy Item 2 */}
              <View style={stylesHome.vacancyItem}>
                {/* <Icon name="user" size={20} color="#FFD700" /> */}
                <View style={stylesHome.vacancyDetails}>
                  <DynamicTruncatedText
                    text="fibramarcell"
                    fontSize={14}
                    fontFamily="System"
                    style={stylesHome.vacancyName}
                  />
                  <Spacing height={5} />
                  <DynamicTruncatedText
                    text="Di Butuhkan Seorang..."
                    fontSize={12}
                    fontFamily="System"
                    style={stylesHome.vacancyDescription}
                  />
                </View>
              </View>
            </View>
          </View>

          <Spacing height={20} />
        </View>
      </ScrollView>
    </>
  );
}
