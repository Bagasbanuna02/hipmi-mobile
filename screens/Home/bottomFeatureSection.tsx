import Spacing from "@/components/_ShareComponent/Spacing";
import DynamicTruncatedText from "@/components/_ShareComponent/TruncatedText";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { stylesHome } from "./homeViewStyle";

export default function Home_BottomFeatureSection() {
  return (
    <>
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
    </>
  );
}
