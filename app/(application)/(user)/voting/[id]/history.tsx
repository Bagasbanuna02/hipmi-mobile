/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BackButton,
  DotButton,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  OS_Wrapper,
  Spacing,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IconContribution } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { useAuth } from "@/hooks/use-auth";
import Voting_BoxDetailHasilVotingSection from "@/screens/Voting/BoxDetailHasilVotingSection";
import { Voting_BoxDetailHistorySection } from "@/screens/Voting/BoxDetailHistorySection";
import {
  apiVotingContribution,
  apiVotingGetOne,
} from "@/service/api-client/api-voting";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function VotingDetailHistory() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);

  const [data, setData] = useState<any>(null);
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [nameChoice, setNameChoice] = useState("");

  useEffect(() => {
    handlerLoadData();
  }, [id, user?.id]);

  async function handlerLoadData() {
    try {
      setLoadingGetData(true);
      await onLoadData();
      await onLoadCheckContribution();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  }

  const onLoadData = async () => {
    try {
      const response = await apiVotingGetOne({ id: id as string });
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const onLoadCheckContribution = async () => {
    try {
      const response = await apiVotingContribution({
        id: id as string,
        authorId: user?.id as string,
        category: "checked",
      });

      if (response.success) {
        setNameChoice(response.data.nameChoice);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlePressPublish = (item: IMenuDrawerItem) => {
    router.navigate(item.path as any);
    setOpenDrawerPublish(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Riwayat Voting"
              left={<BackButton />}
              right={
                <DotButton onPress={() => setOpenDrawerPublish(true)} />
              }
            />
          ),
        }}
      />
      <OS_Wrapper>
        {loadingGetData ? (
          <LoaderCustom />
        ) : (
          <>
            <Voting_BoxDetailHistorySection
              data={data}
              nameChoice={nameChoice}
              headerAvatar={
                <AvatarUsernameAndOtherComponent
                  avatar={data?.Author?.Profile?.imageId || ""}
                  name={data?.Author?.username || "Username"}
                  avatarHref={`/profile/${data?.Author?.Profile?.id}`}
                />
              }
            />
            <Voting_BoxDetailHasilVotingSection
              listData={data?.Voting_DaftarNamaVote}
            />
            <Spacing />
          </>
        )}
      </OS_Wrapper>

      {/* ========= Publish Drawer ========= */}
      <DrawerCustom
        isVisible={openDrawerPublish}
        closeDrawer={() => setOpenDrawerPublish(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconContribution />,
              label: "Daftar Kontributor",
              path: `/voting/${id}/list-of-contributor`,
            },
          ]}
          onPressItem={handlePressPublish as any}
        />
      </DrawerCustom>
    </>
  );
}
