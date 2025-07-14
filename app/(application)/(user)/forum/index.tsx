import {
  AlertCustom,
  AvatarCustom,
  BackButton,
  DrawerCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import FloatingButton from "@/components/Button/FloatingButton";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Forum_BerandaSection from "@/screens/Forum/BerandaSection";
import { listDataDummyForum } from "@/screens/Forum/list-data-dummy";
import Forum_MenuDrawerBerandaSection from "@/screens/Forum/MenuDrawerSection.tsx/MenuBeranda";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";

export default function Forum() {
  const id = "test-id-forum";
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Forum",
          headerLeft: () => <BackButton />,
          headerRight: () => <AvatarCustom href={`/forum/${id}/forumku`} />,
        }}
      />

      <ViewWrapper
        headerComponent={
          <TextInputCustom
            iconLeft={
              <Ionicons
                name="search-outline"
                size={ICON_SIZE_SMALL}
                color={MainColor.placeholder}
              />
            }
            placeholder="Cari topik forum..."
            borderRadius={50}
            containerStyle={{ marginBottom: 0 }}
          />
        }
        floatingButton={
          <FloatingButton
            onPress={() =>
              router.navigate("/(application)/(user)/forum/create")
            }
          />
        }
      >
        {listDataDummyForum.map((e, i) => (
          <Forum_BerandaSection
            key={i}
            data={e}
            setOpenDrawer={setOpenDrawer}
            setStatus={setStatus}
          />
        ))}
      </ViewWrapper>

      <DrawerCustom
        height={350}
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
      >
        <Forum_MenuDrawerBerandaSection
          id={id}
          status={status}
          setIsDrawerOpen={() => {
            setOpenDrawer(false);
          }}
          setShowDeleteAlert={setDeleteAlert}
          setShowAlertStatus={setAlertStatus}
        />
      </DrawerCustom>

      {/* Alert Status */}
      <AlertCustom
        isVisible={alertStatus}
        title="Ubah Status Forum"
        message="Apakah Anda yakin ingin mengubah status forum ini?"
        onLeftPress={() => {
          setOpenDrawer(false);
          setAlertStatus(false);
          console.log("Batal");
        }}
        onRightPress={() => {
          setOpenDrawer(false);
          setAlertStatus(false);
          console.log("Ubah status forum");
        }}
        textLeft="Batal"
        textRight="Ubah"
        colorRight={MainColor.green}
      />

      {/* Alert Delete */}
      <AlertCustom
        isVisible={deleteAlert}
        title="Hapus Forum"
        message="Apakah Anda yakin ingin menghapus forum ini?"
        onLeftPress={() => {
          setOpenDrawer(false);
          setDeleteAlert(false);
          console.log("Batal");
        }}
        onRightPress={() => {
          setOpenDrawer(false);
          setDeleteAlert(false);
          console.log("Hapus forum");
        }}
        textLeft="Batal"
        textRight="Hapus"
        colorRight={MainColor.red}
      />
    </>
  );
}
