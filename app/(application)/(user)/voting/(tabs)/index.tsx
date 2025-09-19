/* eslint-disable react-hooks/exhaustive-deps */
import {
  FloatingButton,
  LoaderCustom,
  SearchInput,
  TextCustom,
  ViewWrapper,
} from "@/components";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { apiVotingGetAll } from "@/service/api-client/api-voting";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function VotingBeranda() {
  const [listData, setListData] = useState<any>([]);
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [search])
  );

  const onLoadData = async () => {
    try {
      setLoadingGetData(true);
      const response = await apiVotingGetAll({
        search,
        category: "beranda",
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
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/voting/create")} />
      }
      headerComponent={
        <SearchInput placeholder="Cari voting" onChangeText={setSearch} />
      }
    >
      {loadingGetData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada data</TextCustom>
      ) : (
        listData.map((item: any, index: number) => (
          <Voting_BoxPublishSection
            data={item}
            key={index}
            href={`/voting/${item.id}`}
          />
        ))
      )}
    </ViewWrapper>
  );
}
