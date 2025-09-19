/* eslint-disable react-hooks/exhaustive-deps */
import {
  LoaderCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { apiVotingGetAll } from "@/service/api-client/api-voting";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useState, useCallback } from "react";

export default function VotingContribution() {
    const { user } = useAuth();
    const [listData, setListData] = useState<any>([]);
    const [loadingGetData, setLoadingGetData] = useState(false);

  
    useFocusEffect(
      useCallback(() => {
        onLoadData();
      }, [])
    );
  
    const onLoadData = async () => {
      try {
        setLoadingGetData(true);
        const response = await apiVotingGetAll({
          category: "contribution",
          authorId: user?.id as string,
        });

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
        <TextCustom align="center">Tidak ada kontribusi</TextCustom>
      ) : listData.map((item: any, index: number) => (
        <Voting_BoxPublishSection
          data={item}
          key={index}
          href={`/voting/${item.id}/contribution`}
        />
      ))}
    </ViewWrapper>
  );
}
