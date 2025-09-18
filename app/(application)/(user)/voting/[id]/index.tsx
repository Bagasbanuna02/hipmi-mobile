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
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconArchive, IconContribution } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import Voting_BoxDetailHasilVotingSection from "@/screens/Voting/BoxDetailHasilVotingSection";
import { Voting_BoxDetailPublishSection } from "@/screens/Voting/BoxDetailPublishSection";
import {
  apiVotingCheckContribution,
  apiVotingGetOne,
} from "@/service/api-client/api-voting";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import React, { useCallback, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function VotingDetail() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  console.log("[ID]", id);
  const dateNow = new Date();
  console.log("[DATE NOW]", dateNow);

  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [isContribution, setIsContribution] = useState(false);
  const [nameChoice, setNameChoice] = useState("");

  console.log("[DATA AWAL]", data?.awalVote);

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
      // console.log("[DATA]", JSON.stringify(response.data, null, 2));
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const onLoadCheckContribution = async () => {
    try {
      const response = await apiVotingCheckContribution({
        id: id as string,
        authorId: user?.id as string,
      });
      console.log("[DATA CONTRIBUION]", response.data);
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
        onPressRight: () => {
          console.log("Hapus");
          router.back();
        },
      });
    }
    router.navigate(item.path as any);
    setOpenDrawerPublish(false);
  };

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
            {dateNow < new Date(data?.awalVote) && (
              <InformationBox text="Untuk sementara voting ini belum di buka. Voting akan dimulai sesuai dengan tanggal awal pemilihan, dan akan ditutup sesuai dengan tanggal akhir pemilihan." />
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
          data={[
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
          ]}
          onPressItem={handlePressPublish as any}
        />
      </DrawerCustom>
    </>
  );
}
