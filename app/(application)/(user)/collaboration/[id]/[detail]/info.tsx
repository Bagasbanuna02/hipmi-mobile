/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AvatarUsernameAndOtherComponent,
  BackButton,
  BaseBox,
  BoxWithHeaderSection,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { apiCollaborationGroup } from "@/service/api-client/api-collaboration";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useState, useCallback } from "react";

export default function CollaborationRoomInfo() {
  const { id, detail } = useLocalSearchParams();
  const [data, setData] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiCollaborationGroup({ id: id as string });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <AppHeader title="Info" left={<BackButton />} />,
        }}
      />

      <ViewWrapper>
        <BoxWithHeaderSection>
          <StackCustom>
            {listData({ data }).map((item, index) => (
              <Grid key={index}>
                <Grid.Col span={4}>
                  <TextCustom bold>{item.title}</TextCustom>
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextCustom>{item.value}</TextCustom>
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
        </BoxWithHeaderSection>

        <BaseBox>
          <StackCustom gap={10}>
            {data?.ProjectCollaboration_AnggotaRoomChat?.map(
              (item: any, index: number) => (
                <AvatarUsernameAndOtherComponent
                  key={index}
                  avatarHref={`/profile/${item?.User?.Profile?.id}`}
                  name={item?.User?.username}
                  avatar={item?.User?.Profile?.imageId}
                />
              )
            )}
          </StackCustom>
        </BaseBox>
      </ViewWrapper>
    </>
  );
}

const listData = ({ data }: { data: any }) => [
  {
    title: "Judul Proyek",
    value: data?.ProjectCollaboration?.title || "-",
  },
  {
    title: "Industri",
    value:
      data?.ProjectCollaboration?.ProjectCollaborationMaster_Industri?.name ||
      "-",
  },
  {
    title: "Tujuan Proyek",
    value: data?.ProjectCollaboration?.purpose || "-",
  },
  {
    title: "Keuntungan Proyek",
    value: data?.ProjectCollaboration?.benefit || "-",
  },
];
