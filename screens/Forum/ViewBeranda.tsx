import {
  BackButton,
  AvatarComp,
  ViewWrapper,
  SearchInput,
  FloatingButton,
  LoaderCustom,
  TextCustom,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiForumGetAll } from "@/service/api-client/api-forum";
import { apiUser } from "@/service/api-client/api-user";
import { Stack, router } from "expo-router";
import _ from "lodash";
import { useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import Forum_BoxDetailSection from "./DiscussionBoxSection";

export default function Forum_ViewBeranda() {
  const { user } = useAuth();
  const [dataUser, setDataUser] = useState<any>();
  const [listData, setListData] = useState<any[]>();
  const [loadingGetList, setLoadingGetList] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onLoadData();
    onLoadDataProfile(user?.id as string);
  }, [user?.id, search]);

  const onLoadDataProfile = async (id: string) => {
    const response = await apiUser(id);
    setDataUser(response.data);
  };

  const onLoadData = async () => {
    try {
      setLoadingGetList(true);
      const response = await apiForumGetAll({
        category: "beranda",
        search: search,
        userLoginId: user?.id,
      });

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
        refreshControl={
          <RefreshControl refreshing={loadingGetList} onRefresh={onLoadData} />
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
              onSetData={() => {}}
              isTruncate={true}
              href={`/forum/${e.id}`}
              isRightComponent={false}
            />
          ))
        )}
      </ViewWrapper>
    </>
  );
}
