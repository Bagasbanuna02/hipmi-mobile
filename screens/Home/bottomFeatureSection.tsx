import { TextCustom } from "@/components";
import Spacing from "@/components/_ShareComponent/Spacing";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { stylesHome } from "./homeViewStyle";

export default function Home_BottomFeatureSection() {
  return (
    <>
      <View style={stylesHome.jobVacancyContainer}>
        <View style={stylesHome.jobVacancyHeader}>
          <Icon name="briefcase" size={24} color="white" />
          <Spacing width={10}/>
          <TextCustom bold size="large">
            Job Vacancy
          </TextCustom>
        </View>

        <View style={stylesHome.vacancyList}>
          {/* Vacancy Item 1 */}
          <View style={stylesHome.vacancyItem}>
            {/* <Icon name="user" size={20} color="#FFD700" /> */}
            <View style={stylesHome.vacancyDetails}>
              <TextCustom bold color="yellow" truncate size="large">
                Bagas_banuna
              </TextCustom>
              <Spacing height={5} />
              <TextCustom truncate={2}>
                Dicari perawat kucing dan perawat anjing
              </TextCustom>
            </View>
          </View>

          {/* Vacancy Item 2 */}
          <View style={stylesHome.vacancyItem}>
            {/* <Icon name="user" size={20} color="#FFD700" /> */}
            <View style={stylesHome.vacancyDetails}>
              <TextCustom bold color="yellow" truncate size="large">
                fibramarcell
              </TextCustom>
              <Spacing height={5} />
              <TextCustom truncate={2}>
                Di Butuhkan Seorang Programer dan Designer
              </TextCustom>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
