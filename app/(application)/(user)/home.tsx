/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonCustom, StackCustom, ViewWrapper } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { useNotificationStore } from "@/hooks/use-notification-store";
import Home_BottomFeatureSection from "@/screens/Home/bottomFeatureSection";
import HeaderBell from "@/screens/Home/HeaderBell";
import Home_ImageSection from "@/screens/Home/imageSection";
import TabSection from "@/screens/Home/tabSection";
import { tabsHome } from "@/screens/Home/tabsList";
import Home_FeatureSection from "@/screens/Home/topFeatureSection";
import { apiUser } from "@/service/api-client/api-user";
import { apiVersion } from "@/service/api-config";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";

export default function Application() {
  const { token, user, userData } = useAuth();
  const [data, setData] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);
  // console.log("[User] >>", JSON.stringify(user?.id, null, 2));

  // const { notifications } = useNotificationStore();
  // const unreadCount = notifications.filter((n) => !n.read).length;
  // console.log("UNREAD", notifications)
  // ‼️ Untuk cek apakah: 1. user ada, 2. user punya profile, 3. accept temrs of forum nya ada atau tidak

  useFocusEffect(
    useCallback(() => {
      onLoadData();
      checkVersion();
      userData(token as string);
    }, [user?.id, token])
  );

  async function onLoadData() {
    const response = await apiUser(user?.id as string);
    console.log(
      "[Profile ID]>>",
      JSON.stringify(response?.data?.Profile?.id, null, 2)
    );

    setData(response.data);
  }

  const checkVersion = async () => {
    const response = await apiVersion();
    console.log("[Version] >>", JSON.stringify(response.data, null, 2));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    onLoadData();
    checkVersion();
    setRefreshing(false);
  }, []);

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
          headerRight: () => <HeaderBell />,
          // headerRight: () => {
          //   return (
          //     <View style={{ position: "relative" }}>
          //       <Ionicons
          //         name="notifications"
          //         size={20}
          //         color={MainColor.yellow}
          //         onPress={() => {
          //           router.push("/notifications");
          //         }}
          //       />
          //       {unreadCount > 0 && (
          //         <View
          //           style={{
          //             position: "absolute",
          //             top: -4,
          //             right: -4,
          //             backgroundColor: "red",
          //             borderRadius: 8,
          //             minWidth: 16,
          //             height: 16,
          //             justifyContent: "center",
          //             alignItems: "center",
          //             paddingHorizontal: 2,
          //           }}
          //         >
          //           <Text
          //             style={{
          //               color: "white",
          //               fontSize: 10,
          //               fontWeight: "bold",
          //             }}
          //           >
          //             {unreadCount > 9 ? "9+" : unreadCount}
          //           </Text>
          //         </View>
          //       )}
          //     </View>
          //   );
          // },
        }}
      />
      <ViewWrapper
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        footerComponent={
          <TabSection
            tabs={tabsHome({
              acceptedForumTermsAt: data?.acceptedForumTermsAt,
              profileId: data?.Profile?.id,
            })}
          />
        }
      >
        <StackCustom>
          <ButtonCustom onPress={() => router.push("./test-notifications")}>Test Notif</ButtonCustom>

          <Home_ImageSection />

          <Home_FeatureSection />

          <Home_BottomFeatureSection />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
