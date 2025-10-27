/* eslint-disable react-hooks/exhaustive-deps */
import { LoaderCustom, TextCustom, ViewWrapper } from "@/components";
import TabsTwoButtonCustom from "@/components/_ShareComponent/TabsTwoHeaderCustom";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { useAuth } from "@/hooks/use-auth";
import { useCallback, useState } from "react";
import { apiVotingGetAll } from "@/service/api-client/api-voting";
import { useFocusEffect } from "expo-router";
import _ from "lodash";

export default function VotingHistory() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>("all");

  const [listData, setListData] = useState<any>([]);
  const [loadingGetData, setLoadingGetData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [activeCategory])
  );

  const onLoadData = async () => {
    try {
      setLoadingGetData(true);
      const response = await apiVotingGetAll({
        category: activeCategory === "all" ? "all-history" : "my-history",
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

  const handlePress = (item: any) => {
    setActiveCategory(item);
    // tambahkan logika lain seperti filter dsb.
  };

  return (
    <ViewWrapper
      hideFooter
      headerComponent={
        <TabsTwoButtonCustom
          leftValue="all"
          rightValue="main"
          leftText="Semua Riwayat"
          rightText="Riwayat Saya"
          activeCategory={activeCategory}
          handlePress={handlePress}
        />
      }
    >
      {loadingGetData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada riwayat</TextCustom>
      ) : (
        listData.map((item: any, index: number) => (
          <Voting_BoxPublishSection
            key={index}
            id={item.id}
            data={item}
            href={`/voting/${item.id}/history`}
          />
        ))
      )}
    </ViewWrapper>
  );
}
