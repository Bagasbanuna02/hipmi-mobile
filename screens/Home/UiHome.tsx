// import { ITabs } from "@/components/_Interface/types";
import { StackCustom } from "@/components";
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
        <StackCustom>
          <Home_ImageSection />

          <Home_FeatureSection />

          <Home_BottomFeatureSection />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
