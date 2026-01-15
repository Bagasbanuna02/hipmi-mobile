/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  AvatarUsernameAndOtherComponent,
  BackButton,
  DotButton,
  DrawerCustom,
  InformationBox,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  StackCustom,
  ViewWrapper,
} from "@/components";
import { IconArchive, IconContribution } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import { useAuth } from "@/hooks/use-auth";
import Voting_BoxDetailHasilVotingSection from "@/screens/Voting/BoxDetailHasilVotingSection";
import { Voting_BoxDetailPublishSection } from "@/screens/Voting/BoxDetailPublishSection";
import {
  apiVotingContribution,
  apiVotingGetOne,
  apiVotingUpdateData,
} from "@/service/api-client/api-voting";
import { today } from "@/utils/dateTimeView";
import dayjs from "dayjs";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function VotingDetail() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [isContribution, setIsContribution] = useState(false);
  const [nameChoice, setNameChoice] = useState("");

  useFocusEffect(
    useCallback(() => {
      handlerLoadData();
    }, [id, user?.id])
  );

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
        setIsContribution(response.data.isContribution);
        setNameChoice(response.data.nameChoice);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handlePressPublish = (item: IMenuDrawerItem) => {
    if (item.path === "") {
      AlertDefaultSystem({
        title: "Update Arsip",
        message: "Apakah Anda yakin ingin mengarsipkan voting ini?",
        textLeft: "Batal",
        textRight: "Ya",
        onPressRight: async () => {
          try {
            const response = await apiVotingUpdateData({
              id: id as string,
              data: data.isArsip ? false : true,
              category: "archive",
            });

            if (response.success) {
              Toast.show({
                type: "success",
                text1: response.message,
              });
              router.back();
            }
          } catch (error) {
            console.log("[ERROR]", error);
          }
        },
      });
    }
    router.navigate(item.path as any);
    setOpenDrawerPublish(false);
  };

  const now = new Date().toISOString();
  const isEventFinished = id && data?.akhirVote && dayjs(data.akhirVote).isBefore(now);

  useEffect(() => {
    if (isEventFinished) {
      router.replace(`/(application)/(user)/voting/${id}/history`);
    }
  }, [isEventFinished, id]);

  if (isEventFinished) {
    return (
      <ViewWrapper>
        <CustomSkeleton />
      </ViewWrapper>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail Voting`,
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <DotButton onPress={() => setOpenDrawerPublish(true)} />
          ),
        }}
      />

      <ViewWrapper>
        {loadingGetData ? (
          <LoaderCustom />
        ) : (
          <StackCustom gap={"xs"}>
            {today.getDate() < new Date(data?.awalVote).getDate() && (
              <InformationBox text="Untuk sementara voting tidak dapat dilakukan. Voting dapat dimulai sesuai dengan tanggal awal pemilihan, dan akan ditutup sesuai dengan tanggal akhir pemilihan." />
            )}
            <Voting_BoxDetailPublishSection
              data={data}
              userId={user?.id as string}
              isContribution={isContribution}
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
          </StackCustom>
        )}
      </ViewWrapper>

      {/* ========= Publish Drawer ========= */}
      <DrawerCustom
        isVisible={openDrawerPublish}
        closeDrawer={() => setOpenDrawerPublish(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={
            user?.id === data?.Author?.id
              ? [
                  {
                    icon: <IconContribution />,
                    label: "Daftar Kontributor",
                    path: `/voting/${id}/list-of-contributor`,
                  },
                  {
                    icon: <IconArchive />,
                    label: "Update Arsip",
                    path: "" as any,
                  },
                ]
              : [
                  {
                    icon: <IconContribution />,
                    label: "Daftar Kontributor",
                    path: `/voting/${id}/list-of-contributor`,
                  },
                ]
          }
          onPressItem={handlePressPublish as any}
        />
      </DrawerCustom>
    </>
  );
}
