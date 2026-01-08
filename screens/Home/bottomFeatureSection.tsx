import { ClickableCustom, TextCustom } from "@/components";
import Spacing from "@/components/_ShareComponent/Spacing";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { stylesHome } from "./homeViewStyle";
import { router, useFocusEffect } from "expo-router";
import { apiJobGetAll } from "@/service/api-client/api-job";

export default function Home_BottomFeatureSection() {
  const [listData, setListData] = useState<any>([]);

  const onLoadData = async () => {
    try {
      const response = await apiJobGetAll({
        category: "beranda",
      });

      // console.log("[DATA JOB]", JSON.stringify(response.data, null, 2));
      const result = response.data
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 2);
      setListData(result);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [])
  );

  return (
    <>
      <ClickableCustom onPress={() => router.push("/job")}>
        <View style={stylesHome.jobVacancyContainer}>
          <View style={stylesHome.jobVacancyHeader}>
            <Icon name="briefcase" size={24} color="white" />
            <Spacing width={10} />
            <TextCustom bold size="large">
              Job Vacancy
            </TextCustom>
          </View>

          <View style={stylesHome.vacancyList}>
            {/* Vacancy Item 1 */}
            {listData.map((item: any, index: number) => (
              <View style={stylesHome.vacancyItem} key={index}>
                <View style={stylesHome.vacancyDetails}>
                  <TextCustom bold color="yellow" truncate size="large">
                    {item.title}
                  </TextCustom>
                  <Spacing height={5} />
                  <TextCustom truncate={2}>{item.deskripsi}</TextCustom>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ClickableCustom>
    </>
  );
}
