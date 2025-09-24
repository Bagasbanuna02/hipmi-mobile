/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarComp,
  BackButton,
  DrawerCustom,
  LoaderCustom,
  SearchInput,
  TextCustom,
  ViewWrapper,
} from "@/components";
import FloatingButton from "@/components/Button/FloatingButton";
import { useAuth } from "@/hooks/use-auth";
import Forum_BoxDetailSection from "@/screens/Forum/DiscussionBoxSection";
import Forum_MenuDrawerBerandaSection from "@/screens/Forum/MenuDrawerSection.tsx/MenuBeranda";
import { apiForumGetAll } from "@/service/api-client/api-forum";
import { apiUser } from "@/service/api-client/api-user";
import { router, Stack, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function Forum() {
  const id = "test-id-forum";
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const [dataUser, setDataUser] = useState<any>();
  const [listData, setListData] = useState<any[]>();
  const [loadingGetList, setLoadingGetList] = useState(false);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      onLoadData();
      onLoadDataProfile(user?.id as string);
    }, [user?.id, search])
  );

  const onLoadDataProfile = async (id: string) => {
    const response = await apiUser(id);
    setDataUser(response.data);
  };

  const onLoadData = async () => {
    try {
      setLoadingGetList(true);
      const response = await apiForumGetAll({ search: search });
      console.log("[DATA PROFILE]", JSON.stringify(response.data, null, 2));

      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetList(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Forum",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <AvatarComp
              fileId={dataUser?.Profile?.imageId}
              size="base"
              href={`/forum/${user?.id}/forumku`}
            />
          ),
        }}
      />

      <ViewWrapper
        headerComponent={
          <SearchInput
            placeholder="Cari topik diskusi"
            onChangeText={(e) => setSearch(e)}
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
        {loadingGetList ? (
          <LoaderCustom />
        ) : _.isEmpty(listData) ? (
          <TextCustom align="center" color="gray">
            Tidak ada diskusi
          </TextCustom>
        ) : (
          listData?.map((e: any, i: number) => (
            <Forum_BoxDetailSection
              key={i}
              data={e}
              setOpenDrawer={setOpenDrawer}
              setStatus={setStatus}
              isTruncate={true}
              href={`/forum/${id}`}
            />
          ))
        )}
      </ViewWrapper>

      <DrawerCustom
        height={"auto"}
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
      >
        <Forum_MenuDrawerBerandaSection
          id={id}
          status={status}
          setIsDrawerOpen={() => {
            setOpenDrawer(false);
          }}
          setShowDeleteAlert={() => {}}
          setShowAlertStatus={() => {}}
        />
      </DrawerCustom>

      {/* Alert Status */}
      {/* <AlertCustom
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
      /> */}

      {/* Alert Delete */}
      {/* <AlertCustom
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
      /> */}
    </>
  );
}
