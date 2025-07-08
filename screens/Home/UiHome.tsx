// import { ITabs } from "@/components/_Interface/types";
import Spacing from "@/components/_ShareComponent/Spacing";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import Home_BottomFeatureSection from "./bottomFeatureSection";
import Home_ImageSection from "./imageSection";
import TabSection from "./tabSection";
import { tabsHome } from "./tabsList";
import Home_FeatureSection from "./topFeatureSection";

export default function UiHome() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);


  return (
    <>
      <ViewWrapper footerComponent={<TabSection tabs={tabsHome} />}>
        {/* Content Image */}
        <Home_ImageSection />
        <Spacing height={10} />

        {/* Grid Section */}
        <Home_FeatureSection />
        <Spacing height={10} />

        {/* Job Vacancy Section */}
        <Home_BottomFeatureSection />
        <Spacing height={20} />
      </ViewWrapper>
    </>
  );
}
