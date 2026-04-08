/* eslint-disable react-hooks/exhaustive-deps */
import { OS_Wrapper, StackCustom } from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import LeftButtonCustom from "@/components/Button/BackButton";
import DrawerCustom from "@/components/Drawer/DrawerCustom";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { drawerItemsProfile } from "@/screens/Profile/ListPage";
import Profile_MenuDrawerSection from "@/screens/Profile/menuDrawerSection";
import Profile_PortofolioSection from "@/screens/Profile/PortofolioSection";
import ProfileSection from "@/screens/Profile/ProfileSection";
import { apiGetPortofolio } from "@/service/api-client/api-portofolio";
import { apiProfile } from "@/service/api-client/api-profile";
import { apiUser } from "@/service/api-client/api-user";
import { GStyles } from "@/styles/global-styles";
import { IProfile } from "@/types/Type-Profile";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, TouchableOpacity } from "react-native";

export default function Profile() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState<IProfile>();
  const [dataToken, setDataToken] = useState<IProfile>();
  const [listPortofolio, setListPortofolio] = useState<any[]>();
  const [refreshing, setRefreshing] = useState(false);

  const { token, logout, isAdmin, user, userData } = useAuth();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
      onLoadPortofolio(id as string);
      onLoadUserByToken();
      isUserCheck();
      userData(token as string);
    }, [id, token]),
  );

  const isUserCheck = () => {
    const userId = id;
    const userLoginId = dataToken?.id;

    return userId === userLoginId;
  };

  const onLoadData = async (id: string) => {
    try {
      const response = await apiProfile({ id: id });
      setData(response.data);
    } catch (error) {
      console.log("[ERROR onLoadData]", error);
    }
  };

  const onLoadUserByToken = async () => {
    try {
      const response = await apiUser(user?.id as string);
      setDataToken(response?.data?.Profile);
    } catch (error) {
      console.log("[ERROR onLoadUserByToken]", error);
    }
  };

  const onLoadPortofolio = async (id: string) => {
    try {
      const response = await apiGetPortofolio({ id: id });
      const lastTwoByDate = response.data
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ) // urut desc
        .slice(0, 2);
      setListPortofolio(lastTwoByDate);
    } catch (error) {
      console.log("[ERROR onLoadPortofolio]", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    onLoadData(id as string);
    onLoadPortofolio(id as string);
    onLoadUserByToken();
    isUserCheck();
    userData(token as string);
    setRefreshing(false);
  }, [id, token]);

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Profile"
              left={<LeftButtonCustom />}
              right={
                <ButtonnDot
                  id={id as string}
                  openDrawer={openDrawer}
                  isUserCheck={isUserCheck()}
                  logout={logout}
                />
              }
            />
          ),
        }}
      />
      {/* Main View */}
      <OS_Wrapper
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={MainColor.yellow}
            colors={[MainColor.yellow]}
          />
        }
      >
        {!data || !dataToken ? (
          <StackCustom>
            <CustomSkeleton height={400} />
            <CustomSkeleton height={200} />
          </StackCustom>
        ) : (
          <>
            <ProfileSection data={data as any} />

            <Profile_PortofolioSection
              data={listPortofolio as any}
              profileId={id as string}
            />
          </>
        )}
      </OS_Wrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        height={"auto"}
        isVisible={isDrawerOpen}
        closeDrawer={closeDrawer}
      >
        <Profile_MenuDrawerSection
          drawerItems={drawerItemsProfile({ id: id as string, isAdmin })}
          setIsDrawerOpen={setIsDrawerOpen}
          logout={logout}
        />
      </DrawerCustom>
    </>
  );
}

const ButtonnDot = ({
  id,
  openDrawer,
  isUserCheck,
  logout,
}: {
  id: string;
  openDrawer: () => void;
  isUserCheck: boolean;
  logout: () => Promise<void>;
}) => {
  console.log("[ID] >>", id);

  const isId = id === undefined || id === "undefined";

  if (isId) {
    return (
      <>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out" size={20} color={MainColor.red} />
        </TouchableOpacity>
      </>
    );
  }

  return (
    <>
      {isUserCheck && (
        <TouchableOpacity onPress={openDrawer}>
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={MainColor.yellow}
          />
        </TouchableOpacity>
      )}
    </>
  );
};
