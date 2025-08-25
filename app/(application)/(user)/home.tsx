/* eslint-disable react-hooks/exhaustive-deps */
import { StackCustom, ViewWrapper } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import Home_BottomFeatureSection from "@/screens/Home/bottomFeatureSection";
import Home_ImageSection from "@/screens/Home/imageSection";
import TabSection from "@/screens/Home/tabSection";
import { tabsHome } from "@/screens/Home/tabsList";
import Home_FeatureSection from "@/screens/Home/topFeatureSection";
import { apiUser } from "@/service/api-client/api-user";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function Application() {
  const { user } = useAuth();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    const response = await apiUser(user?.id as string);
    setData(response.data);
  }

  if (data && data?.active === false) {
    return <Redirect href={`/waiting-room`} />;
  }

  if (data && data?.Profile === null) {
    return <Redirect href={`/profile/create`} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "HIPMI",
          headerLeft: () => (
            <Ionicons
              name="search"
              size={20}
              color={MainColor.yellow}
              onPress={() => {
                router.push("/user-search");
              }}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="notifications"
              size={20}
              color={MainColor.yellow}
              onPress={() => {
                router.push("/notifications");
              }}
            />
          ),
        }}
      />
      <ViewWrapper
        footerComponent={
          <TabSection tabs={tabsHome(data?.Profile?.id as string)} />
        }
      >
        <StackCustom>
          <Home_ImageSection />

          <Home_FeatureSection />

          <Home_BottomFeatureSection />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
