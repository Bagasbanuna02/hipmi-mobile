import { AlertCustom, DrawerCustom } from "@/components";
import LeftButtonCustom from "@/components/Button/BackButton";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { drawerItemsPortofolio } from "@/screens/Portofolio/ListPage";
import Portofolio_MenuDrawerSection from "@/screens/Portofolio/MenuDrawer";
import PorfofolioSection from "@/screens/Portofolio/PorfofolioSection";
import { GStyles } from "@/styles/global-styles";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Portofolio() {
  const { id } = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <ViewWrapper>
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
        <PorfofolioSection setShowDeleteAlert={setDeleteAlert} />
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
