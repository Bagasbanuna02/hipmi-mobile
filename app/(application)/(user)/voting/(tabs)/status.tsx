/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  BaseBox,
  LoaderCustom,
  ScrollableCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import { apiVotingGetByStatus } from "@/service/api-client/api-voting";
import { dateTimeView } from "@/utils/dateTimeView";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function VotingStatus() {
  const { user } = useAuth();
  const { status } = useLocalSearchParams<{ status?: string }>();

  const id = user?.id || "";
  const [activeCategory, setActiveCategory] = useState<string | null>(
    status || "publish"
  );

  const [listData, setListData] = useState([]);
  const [loadingGetData, setLoadingGetData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [activeCategory, id])
  );

  async function onLoadData() {
    try {
      setLoadingGetData(true);
      const response = await apiVotingGetByStatus({
        id: id as string,
        status: activeCategory!,
      });
      setListData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingGetData(false);
    }
  }

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // tambahkan logika lain seperti filter dsb.
  };

  const scrollComponent = (
    <ScrollableCustom
      data={dummyMasterStatus.map((e, i) => ({
        id: i,
        label: e.label,
        value: e.value,
      }))}
      onButtonPress={handlePress}
      activeId={activeCategory as any}
    />
  );

  return (
    <ViewWrapper headerComponent={scrollComponent} hideFooter>
      {loadingGetData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada data {activeCategory}</TextCustom>
      ) : (
        listData.map((item: any, i: number) => (
          <BaseBox
            key={i}
            paddingTop={20}
            paddingBottom={20}
            href={`/voting/${item.id}/${activeCategory}/detail`}
          >
            <StackCustom>
              <TextCustom align="center" bold truncate={2} size="large">
                {item?.title || ""}
              </TextCustom>
              <BadgeCustom
                style={{ width: "70%", alignSelf: "center" }}
                variant="light"
              >
                {item?.awalVote &&
                  dateTimeView({
                    date: item?.awalVote,
                    withoutTime: true,
                  })}{" "}
                -{" "}
                {item?.akhirVote &&
                  dateTimeView({ date: item?.akhirVote, withoutTime: true })}
              </BadgeCustom>
            </StackCustom>
          </BaseBox>
        ))
      )}
    </ViewWrapper>
  );
}
