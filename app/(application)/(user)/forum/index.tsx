import {
  AlertCustom,
  AvatarCustom,
  BackButton,
  DrawerCustom,
  SearchInput,
  ViewWrapper,
} from "@/components";
import FloatingButton from "@/components/Button/FloatingButton";
import { MainColor } from "@/constants/color-palet";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import { listDummyDiscussionForum } from "@/screens/Forum/list-data-dummy";
import Forum_MenuDrawerBerandaSection from "@/screens/Forum/MenuDrawerSection.tsx/MenuBeranda";
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
        headerComponent={<SearchInput placeholder="Cari topik diskusi" />}
        floatingButton={
          <FloatingButton
            onPress={() =>
              router.navigate("/(application)/(user)/forum/create")
            }
          />
        }
      >
        {listDummyDiscussionForum.map((e, i) => (
          <Forum_BoxDetailSection
            key={i}
            data={e}
            setOpenDrawer={setOpenDrawer}
            setStatus={setStatus}
            isTruncate={true}
            href={`/forum/${id}`}
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
