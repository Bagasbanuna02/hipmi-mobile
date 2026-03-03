/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { BasicWrapper, StackCustom, ViewWrapper } from "@/components";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { useNotificationStore } from "@/hooks/use-notification-store";
import Home_BottomFeatureSection from "@/screens/Home/bottomFeatureSection";
import HeaderBell from "@/screens/Home/HeaderBell";
import { stylesHome } from "@/screens/Home/homeViewStyle";
import Home_ImageSection from "@/screens/Home/imageSection";
import TabSection from "@/screens/Home/tabSection";
import { tabsHome } from "@/screens/Home/tabsList";
import Home_FeatureSection from "@/screens/Home/topFeatureSection";
import { apiUser } from "@/service/api-client/api-user";
import { apiVersion } from "@/service/api-config";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, TouchableOpacity, View } from "react-native";

export default function Application() {
  const { token, user, userData } = useAuth();
  const [data, setData] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);
  const { syncUnreadCount } = useNotificationStore();

  useFocusEffect(
    useCallback(() => {
      onLoadData();
      checkVersion();
      userData(token as string).catch((error) => {
        console.log("[ERROR userData]", error?.message);
        console.log("[ERROR userData Response]", error?.response?.data);
      });
      syncUnreadCount();
    }, [user?.id, token]),
  );

  async function onLoadData() {
    try {
      const response = await apiUser(user?.id as string);
      setData(response.data);
    } catch (error: any) {
      console.log("[ERROR onLoadData]", error?.message);
      console.log("[ERROR Response]", error?.response?.data);
      // Set data tetap agar UI tidak stuck di loading
      setData(null);
    }
  }

  const checkVersion = async () => {
    try {
      const response = await apiVersion();
      console.log("[Version] >>", JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      console.log("[ERROR checkVersion]", error?.message);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    onLoadData();
    checkVersion();
    setRefreshing(false);
  }, []);

  if (data && data?.active === false) {
    console.log("User is not active");
    return (
      <BasicWrapper>
        <Redirect href={`/waiting-room`} />
      </BasicWrapper>
    );
  }

  if (data && data?.Profile === null) {
    console.log("Profile is null");
    return (
      <BasicWrapper>
        <Redirect href={`/profile/create`} />
      </BasicWrapper>
    );
  }

  // if (data && data?.masterUserRoleId !== "1") {
  //   console.log("User is not admin");
  //   return (
  //     <BasicWrapper>
  //       <Redirect href={`/admin/dashboard`} />
  //     </BasicWrapper>
  //   );
  // }

  return (
    <>
      <Stack.Screen
        options={{
          title: `HIPMI`,
          headerLeft: () =>
            data ? (
              <Ionicons
                name="search"
                size={20}
                color={MainColor.yellow}
                onPress={() => {
                  router.push("/user-search");
                }}
              />
            ) : (
              <CustomSkeleton height={30} width={30} radius={100} />
            ),
          headerRight: () =>
            data ? (
              <HeaderBell />
            ) : (
              <CustomSkeleton height={30} width={30} radius={100} />
            ),
        }}
      />
      <ViewWrapper
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={MainColor.yellow}
            colors={[MainColor.yellow]}
          />
        }
        footerComponent={
          data && data ? (
            <TabSection
              tabs={tabsHome({
                acceptedForumTermsAt: data?.acceptedForumTermsAt,
                profileId: data?.Profile?.id,
              })}
            />
          ) : (
            <View style={GStyles.tabBar}>
              <View style={[GStyles.tabContainer, { paddingTop: 10 }]}>
                {Array.from({ length: 4 }).map((e, index) => (
                  <CustomSkeleton
                    key={index}
                    height={40}
                    width={40}
                    radius={100}
                  />
                ))}
              </View>
            </View>
          )
        }
      >
        <StackCustom>
          <Home_ImageSection />

          {data && data ? (
            <Home_FeatureSection />
          ) : (
            <View style={stylesHome.gridContainer}>
              {Array.from({ length: 4 }).map((item, index) => (
                <CustomSkeleton
                  key={index}
                  style={stylesHome.gridItem}
                  radius={50}
                />
              ))}
            </View>
          )}

          {data ? (
            <Home_BottomFeatureSection />
          ) : (
            <CustomSkeleton height={200} />
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
