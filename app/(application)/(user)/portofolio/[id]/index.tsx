import { AlertCustom, DrawerCustom, Spacing, StackCustom } from "@/components";
import LeftButtonCustom from "@/components/Button/BackButton";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import Portofolio_BusinessLocation from "@/screens/Portofolio/BusinessLocationSection";
import Portofolio_ButtonDelete from "@/screens/Portofolio/ButtonDelete";
import Portofolio_Data from "@/screens/Portofolio/DataPortofolio";
import { drawerItemsPortofolio } from "@/screens/Portofolio/ListPage";
import Portofolio_MenuDrawerSection from "@/screens/Portofolio/MenuDrawer";
import Portofolio_SocialMediaSection from "@/screens/Portofolio/SocialMediaSection";
import { apiGetOnePortofolio } from "@/service/api-client/api-portofolio";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Portofolio() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [data, setData] = useState<any>();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useFocusEffect(
    useCallback(() => {
      onLoadData(id as string);
    }, [id])
  );

  async function onLoadData(id: string) {
    const response = await apiGetOnePortofolio({ id: id });

    setData(response.data);
  }

  const userId = user?.id;
  const userLoginId = data?.Profile?.User?.id;

  console.log("User ID >>", userId);
  console.log("User Login ID >>", userLoginId);

  return (
    <>
      {/* Header */}
      <Stack.Screen
        options={{
          title: "Portofolio",
          headerLeft: () => <LeftButtonCustom />,
          headerRight: () => (
            <TouchableOpacity onPress={openDrawer}>
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={MainColor.yellow}
              />
            </TouchableOpacity>
          ),
          headerStyle: GStyles.headerStyle,
          headerTitleStyle: GStyles.headerTitleStyle,
        }}
      />
      <ViewWrapper>
        {/* <PorfofolioSection setShowDeleteAlert={setDeleteAlert} data={data} /> */}
        <StackCustom>
          <Portofolio_Data data={data} />
          <Portofolio_BusinessLocation />
          <Portofolio_SocialMediaSection data={data?.Portofolio_MediaSosial} />
          <Portofolio_ButtonDelete setShowDeleteAlert={setDeleteAlert} />
          <Spacing />
        </StackCustom>
      </ViewWrapper>

      {/* Drawer Komponen Eksternal */}
      <DrawerCustom
        isVisible={isDrawerOpen}
        closeDrawer={closeDrawer}
        height={350}
      >
        <Portofolio_MenuDrawerSection
          drawerItems={drawerItemsPortofolio({ id: id as string })}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </DrawerCustom>

      {/* Alert Delete */}
      <AlertCustom
        isVisible={deleteAlert}
        onLeftPress={() => setDeleteAlert(false)}
        onRightPress={() => {
          setDeleteAlert(false);
          console.log("Hapus portofolio");
          router.back();
        }}
        title="Hapus Portofolio"
        message="Apakah Anda yakin ingin menghapus portofolio ini?"
        textLeft="Batal"
        textRight="Hapus"
        colorRight={MainColor.red}
      />
    </>
  );
}
