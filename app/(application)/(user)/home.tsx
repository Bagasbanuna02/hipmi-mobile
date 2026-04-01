/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { BasicWrapper, Spacing, StackCustom, ViewWrapper } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { useNotificationStore } from "@/hooks/use-notification-store";
import Home_BottomFeatureSection from "@/screens/Home/bottomFeatureSection";
import HeaderBell from "@/screens/Home/HeaderBell";
import HomeTabs from "@/screens/Home/HomeTabs";
import { stylesHome } from "@/screens/Home/homeViewStyle";
import Home_ImageSection from "@/screens/Home/imageSection";
import { tabsHome } from "@/screens/Home/tabsList";
import Home_FeatureSection from "@/screens/Home/topFeatureSection";
import { apiJobGetAll } from "@/service/api-client/api-job";
import { apiUser } from "@/service/api-client/api-user";
import { apiVersion } from "@/service/api-config";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export default function Application() {
  const { token, user, userData } = useAuth();
  const [data, setData] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);
  const { syncUnreadCount } = useNotificationStore();
  const [listData, setListData] = useState<any[] | null>(null);
  const insets = useSafeAreaInsets();
  const paddingBottom = Platform.OS === "android" ? insets.bottom : 0;

  useFocusEffect(
    useCallback(() => {
      onLoadData();
      onLoadDataJob();
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

  const onLoadDataJob = async () => {
    try {
      const response = await apiJobGetAll({
        category: "beranda",
      });
      const result = response.data
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 2);
      setListData(result);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };
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
    onLoadDataJob();
    checkVersion();
    setRefreshing(false);
  }, []);

  if (data && data?.active === false) {
    console.warn("User is not active");
    return (
      <BasicWrapper>
        <Redirect href={`/waiting-room`} />
      </BasicWrapper>
    );
  }

  if (data && data?.Profile === null) {
    console.warn("Profile is null");
    return (
      <BasicWrapper>
        <Redirect href={`/profile/create`} />
      </BasicWrapper>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="HIPMI"
              showBack={false}
              left={
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
                )
              }
              right={
                data ? (
                  <HeaderBell />
                ) : (
                  <CustomSkeleton height={30} width={30} radius={100} />
                )
              }
            />
          ),
        }}
      />

      <View style={{ flex: 1, backgroundColor: MainColor.darkblue }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingInline: 10,
            paddingBottom: paddingBottom + 80, // Space for tabs + safe area
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={MainColor.yellow}
              colors={[MainColor.yellow]}
            />
          }
          keyboardShouldPersistTaps="handled"
        >
          <StackCustom>
            <Home_ImageSection />

            {data && data ? (
              <Home_FeatureSection />
            ) : (
              <View style={stylesHome.gridContainer}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <CustomSkeleton
                    key={index}
                    style={stylesHome.gridItem}
                    radius={50}
                  />
                ))}
              </View>
            )}

            {data ? (
              <Home_BottomFeatureSection listData={listData} />
            ) : (
              <CustomSkeleton height={150} />
            )}
          </StackCustom>
        </ScrollView>

        {/* Home Tabs di bawah */}
        {data && data ? (
          <HomeTabs
            tabs={tabsHome({
              acceptedForumTermsAt: data?.acceptedForumTermsAt,
              profileId: data?.Profile?.id,
            })}
          />
        ) : (
          <View style={{ height: 80 + paddingBottom, backgroundColor: MainColor.darkblue }} />
        )}
      </View>
    </>
  );
}
