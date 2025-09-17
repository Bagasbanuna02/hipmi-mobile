/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  ViewWrapper,
} from "@/components";
import { IconArchive, IconContribution, IconEdit } from "@/components/_Icon";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import { Voting_BoxDetailSection } from "@/screens/Voting/BoxDetailSection";
import Voting_ButtonStatusSection from "@/screens/Voting/ButtonStatusSection";
import { apiVotingGetOne } from "@/service/api-client/api-voting";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function VotingDetailStatus() {
  const {user} = useAuth()
  const { id, status } = useLocalSearchParams();
  console.log("ID >> ", id);
  console.log("STATUS >> ", status);
  const [openDrawerDraft, setOpenDrawerDraft] = useState(false);
  const [openDrawerPublish, setOpenDrawerPublish] = useState(false);

  const [data, setData] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiVotingGetOne({ id: id as string });
      console.log("Response", JSON.stringify(response.data, null, 2));
      setData(response.data);
    } catch (error) {
      console.log(error);
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
          title: `Detail ${status}`,
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
        <Voting_BoxDetailSection data={data as any}/>
        <Voting_ButtonStatusSection id={id as string} status={status as string} />
        <Spacing />
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
