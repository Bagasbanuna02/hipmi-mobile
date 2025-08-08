import {
  AlertDefaultSystem,
  DrawerCustom,
  GridComponentView,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
} from "@/components";
import DrawerAdmin from "@/components/Drawer/DrawerAdmin";
import NavbarMenu from "@/components/Drawer/NavbarMenu";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM, ICON_SIZE_SMALL, ICON_SIZE_XLARGE } from "@/constants/constans-value";
import { adminListMenu } from "@/screens/Admin/listPageAdmin";
import { GStyles } from "@/styles/global-styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";

export default function AdminLayout() {
  const [openDrawerNavbar, setOpenDrawerNavbar] = useState(false);
  const [openDrawerUser, setOpenDrawerUser] = useState(false);
  return (
    <>
      <Stack
        screenOptions={{
          title: "HIPMI DASHBOARD",
          headerStyle: GStyles.headerStyle,
          headerTitleStyle: GStyles.headerTitleStyle,
          headerTitleAlign: "center",
          contentStyle: {
            borderBottomColor: AccentColor.blue,
          },
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={ICON_SIZE_XLARGE}
              color={MainColor.white}
              onPress={() => setOpenDrawerNavbar(true)}
            />
          ),
          headerRight: () => (
            <FontAwesome6
              name="circle-user"
              size={ICON_SIZE_MEDIUM}
              color={MainColor.white}
              onPress={() => setOpenDrawerUser(true)}
            />
          ),
        }}
      >
        <Stack.Screen name="dashboard" />
        {/* ================== Investment Start ================== */}
        <Stack.Screen name="investment/index" />
        <Stack.Screen name="investment/publish" />
        <Stack.Screen name="investment/review" />
        <Stack.Screen name="investment/reject" />
        {/* ================== Investment End ================== */}

        {/* ================== Maps Start ================== */}
        <Stack.Screen name="maps" />
        {/* ================== Maps End ================== */}

        {/* ================== App Information Start ================== */}
        <Stack.Screen name="app-information/index" />
        {/* ================== App Information End ================== */}

        {/* ================== Job Start ================== */}
        <Stack.Screen name="job/index" />
        <Stack.Screen name="job/publish" />
        <Stack.Screen name="job/review" />
        <Stack.Screen name="job/reject" />
        <Stack.Screen name="job/[status]/status" />
        <Stack.Screen name="job/[id]/[status]/index" />

        {/* ================== Collaboration Start ================== */}
        <Stack.Screen name="collaboration/index" />
        <Stack.Screen name="collaboration/publish" />
        <Stack.Screen name="collaboration/group" />
        <Stack.Screen name="collaboration/reject" />
        <Stack.Screen name="collaboration/[id]/[status]"/>
        <Stack.Screen name="collaboration/[id]/group"/>
        {/* ================== Collaboration End ================== */}
      </Stack>

      <DrawerAdmin
        isVisible={openDrawerNavbar}
        onClose={() => setOpenDrawerNavbar(false)}
      >
        <StackCustom gap={"xs"}>
          <Ionicons
            name="close"
            size={ICON_SIZE_SMALL}
            color={MainColor.white}
            onPress={() => setOpenDrawerNavbar(false)}
            style={{ alignSelf: "flex-end" }}
          />

          <NavbarMenu
            items={adminListMenu}
            onClose={() => setOpenDrawerNavbar(false)}
          />
        </StackCustom>
      </DrawerAdmin>

      <DrawerCustom
        isVisible={openDrawerUser}
        closeDrawer={() => setOpenDrawerUser(false)}
        height={"auto"}
      >
        <StackCustom>
          <GridComponentView
            leftIcon={
              <Ionicons
                name="person"
                size={ICON_SIZE_SMALL}
                color={MainColor.white}
              />
            }
          >
            <TextCustom>Username</TextCustom>
          </GridComponentView>
          <GridComponentView
            leftIcon={
              <Ionicons
                name="ribbon-outline"
                size={ICON_SIZE_SMALL}
                color={MainColor.white}
              />
            }
          >
            <TextCustom>User Role</TextCustom>
          </GridComponentView>

          <MenuDrawerDynamicGrid
            columns={3}
            data={[
              {
                label: "Notifikasi",
                value: "notification",
                icon: (
                  <Ionicons
                    name="notifications"
                    size={ICON_SIZE_SMALL}
                    color={MainColor.white}
                  />
                ),
                path: "/admin/notification",
              },
              {
                label: "Kembali ke User",
                value: "back-to-user",
                icon: (
                  <Ionicons
                    name="git-compare"
                    size={ICON_SIZE_SMALL}
                    color={MainColor.white}
                  />
                ),
                path: "" as any,
              },
              {
                label: "Keluar",
                value: "logout",
                icon: (
                  <Ionicons
                    name="log-out"
                    size={ICON_SIZE_SMALL}
                    color={MainColor.white}
                  />
                ),
                path: "" as any,
                color: MainColor.red,
              },
            ]}
            onPressItem={(item) => {
              if (item.value === "notification") {
                router.push("/admin/notification");
                setOpenDrawerUser(false);
              } else if (item.value === "back-to-user") {
                AlertDefaultSystem({
                  title: "Kembali ke User",
                  message: "Apakah Anda yakin ingin kembali ke user?",
                  textLeft: "Batal",
                  textRight: "Ya",
                  onPressRight: () => {
                    router.replace(`/(application)/(user)/profile/${123}`);
                  },
                });
              } else if (item.value === "logout") {
                AlertDefaultSystem({
                  title: "Keluar",
                  message: "Apakah Anda yakin ingin keluar?",
                  textLeft: "Batal",
                  textRight: "Keluar",
                  onPressRight: () => {
                    router.replace("/");
                  },
                });
              }
            }}
          />
        </StackCustom>
      </DrawerCustom>
    </>
  );
}
