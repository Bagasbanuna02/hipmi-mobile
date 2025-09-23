/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  Grid,
  LoaderCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import { apiCollaborationGetAll } from "@/service/api-client/api-collaboration";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useState, useCallback } from "react";

export default function CollaborationGroup() {
  const { user } = useAuth();
  const [listData, setListData] = useState<any[]>();
  const [loadingGetData, setLoadingGetData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [user?.id])
  );

  const onLoadData = async () => {
    try {
      setLoadingGetData(true);
      const response = await apiCollaborationGetAll({
        category: "group",
        authorId: user?.id,
      });

      console.log("[RES >>]", JSON.stringify(response.data, null, 2));

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };

  return (
    <ViewWrapper hideFooter>
      {loadingGetData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada data</TextCustom>
      ) : (
        <StackCustom>
          {listData?.map((item: any, index: any) => (
            <BaseBox
              key={index}
              paddingBlock={5}
              href={`/collaboration/${item?.ProjectCollaboration_RoomChat?.id}/${item?.ProjectCollaboration_RoomChat?.name}/room-chat`}
            >
              <Grid>
                <Grid.Col span={10}>
                  <TextCustom bold>
                    {item?.ProjectCollaboration_RoomChat?.name}
                  </TextCustom>
                  <TextCustom size="small">
                    {
                      item?.ProjectCollaboration_RoomChat
                        ?.ProjectCollaboration_AnggotaRoomChat?.length
                    }{" "}
                    Anggota
                  </TextCustom>
                </Grid.Col>
                <Grid.Col
                  span={2}
                  style={{ alignItems: "flex-end", justifyContent: "center" }}
                >
                  <Feather
                    name="chevron-right"
                    size={20}
                    color={MainColor.white}
                  />
                </Grid.Col>
              </Grid>
            </BaseBox>
          ))}
        </StackCustom>
      )}
    </ViewWrapper>
  );
}

function generateProjectName() {
  const adjectives = [
    "Blue",
    "Dark",
    "Bright",
    "Quantum",
    "Silent",
    "Cyber",
    "Epic",
    "Golden",
    "Shadow",
    "Rapid",
  ];

  const nouns = [
    "Spark",
    "Core",
    "Orbit",
    "Nest",
    "Drive",
    "Nova",
    "Cloud",
    "Blade",
    "Matrix",
    "Link",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return randomAdjective + randomNoun;
}
