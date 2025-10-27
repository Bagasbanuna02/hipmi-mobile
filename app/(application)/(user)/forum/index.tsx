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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const [dataUser, setDataUser] = useState<any>();
  const [listData, setListData] = useState<any[]>();
  const [loadingGetList, setLoadingGetList] = useState(false);
  const [search, setSearch] = useState("");
  const [dataId, setDataId] = useState("");
  const [authorId, setAuthorId] = useState("");

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
              onSetData={() => {
                setDataId(e.id);
                setOpenDrawer(true);
                setStatus(e.ForumMaster_StatusPosting?.status);
                setAuthorId(e.Author?.id);
              }}
              isTruncate={true}
              href={`/forum/${e.id}`}
              isRightComponent={false}
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
          id={dataId}
          authorId={authorId}
          status={status}
          setIsDrawerOpen={() => {
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
