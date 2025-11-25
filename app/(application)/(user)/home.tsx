/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { apiVersion } from "@/service/api-config";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function Application() {
  const { token, user } = useAuth();
  const [data, setData] = useState<any>();

  console.log("[User] >>", JSON.stringify(user?.id, null, 2));
  
  useEffect(() => {
    onLoadData();
    checkVersion();
  }, []);
  
  async function onLoadData() {
    const response = await apiUser(user?.id as string);
    console.log(
      "[Profile ID]>>",
      JSON.stringify(response?.data?.Profile.id, null, 2)
    );
    
    setData(response.data);
  }
  
  const checkVersion = async () => {
    const response = await apiVersion();
    console.log("[Version] >>", JSON.stringify(response.data, null, 2));
  };
  
  if (user && user?.termsOfServiceAccepted === false) {
    console.log("User is not accept term service");
    return <Redirect href={`/terms-agreement`} />;
  }

  if (data && data?.active === false) {
    console.log("User is not active");
    return <Redirect href={`/waiting-room`} />;
  }

  if (data && data?.Profile === null) {
    console.log("Profile is null");
    return <Redirect href={`/profile/create`} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `HIPMI`,
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
