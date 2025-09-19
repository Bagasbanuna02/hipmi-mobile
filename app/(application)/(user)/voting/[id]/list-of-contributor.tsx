/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BadgeCustom,
  BaseBox,
  LoaderCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { apiVotingContribution } from "@/service/api-client/api-voting";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function Voting_ListOfContributor() {
  const { id } = useLocalSearchParams();
  const [listData, setListData] = useState<any>([]);
  const [isLoadData, setIsLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [id])
  );

  const onLoadList = async () => {
    try {
      setIsLoadData(true);
      const response = await apiVotingContribution({
        id: id as string,
        authorId: "",
        category: "list",
      });

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  };

  return (
    <ViewWrapper>
      {isLoadData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada kontributor</TextCustom>
      ) : (
        listData.map((item: any, index: number) => (
          <BaseBox paddingTop={5} paddingBottom={5} key={index.toString()}>
            <AvatarUsernameAndOtherComponent
              avatar={item?.Author?.Profile?.imageId || ""}
              name={item?.Author?.username || "Username"}
              avatarHref={`/profile/${item?.Author?.Profile?.id}`}
              rightComponent={
                <BadgeCustom style={{ alignSelf: "flex-end" }}>
                  {item?.Voting_DaftarNamaVote?.value}
                </BadgeCustom>
              }
            />
          </BaseBox>
        ))
      )}
    </ViewWrapper>
  );
}
