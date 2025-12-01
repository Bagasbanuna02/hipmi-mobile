/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  BaseBox,
  DotButton,
  DrawerCustom,
  LoaderCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconArchive, IconContribution, IconEdit } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import ReportBox from "@/components/Box/ReportBox";
import Voting_BoxDetailHasilVotingSection from "@/screens/Voting/BoxDetailHasilVotingSection";
import { Voting_BoxDetailSection } from "@/screens/Voting/BoxDetailSection";
import Voting_ButtonStatusSection from "@/screens/Voting/ButtonStatusSection";
import {
  apiVotingGetOne,
  apiVotingUpdateData,
} from "@/service/api-client/api-voting";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function VotingDetailStatus() {
  const { id, status } = useLocalSearchParams();
  const [openDrawerDraft, setOpenDrawerDraft] = useState(false);
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingGetData, setLoadingGetData] = useState(false);

  const [data, setData] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadingGetData(true);
      const response = await apiVotingGetOne({ id: id as string });

      console.log("[DATA BY ID]", JSON.stringify(response, null, 2));

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };

  const handlePressDraft = (item: IMenuDrawerItem) => {
    console.log("PATH >> ", item.path);
    router.navigate(item.path as any);
    setOpenDrawerDraft(false);
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

  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail`,
          headerLeft: () => <BackButton />,
          headerRight: () =>
            status === "draft" ? (
              <DotButton onPress={() => setOpenDrawerDraft(true)} />
            ) : status === "publish" ? (
              <DotButton onPress={() => setOpenDrawerPublish(true)} />
            ) : null,
        }}
      />
      <ViewWrapper>
        {loadingGetData ? (
          <LoaderCustom />
        ) : (
          <>
            {status === "publish" && (
              <BaseBox>
                <TextCustom bold>
                  Status:{" "}
                  <TextCustom color={data?.isArsip ? "red" : "green"}>
                    {data?.isArsip ? "Arsip" : "Publish"}
                  </TextCustom>
                </TextCustom>
              </BaseBox>
            )}
            <Spacing height={0} />

            {data &&
              data?.catatan &&
              (status === "draft" || status === "reject") && (
                <ReportBox text={data?.catatan} />
              )}

            <Voting_BoxDetailSection data={data as any} />
            {status === "publish" ? (
              <Voting_BoxDetailHasilVotingSection
                listData={data?.Voting_DaftarNamaVote}
              />
            ) : (
              <Voting_ButtonStatusSection
                isLoading={isLoading}
                onSetLoading={setIsLoading}
                id={id as string}
                status={status as string}
              />
            )}
            <Spacing />
          </>
        )}
      </ViewWrapper>

      {/* ========= Draft Drawer ========= */}
      <DrawerCustom
        isVisible={openDrawerDraft}
        closeDrawer={() => setOpenDrawerDraft(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconEdit />,
              label: "Edit",
              path: `/voting/${id}/edit`,
            },
          ]}
          columns={4}
          onPressItem={handlePressDraft as any}
        />
      </DrawerCustom>

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
