/* eslint-disable react-hooks/exhaustive-deps */
import {
  LoaderCustom,
  ScrollableCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import Investment_StatusBox from "@/screens/Invesment/StatusBox";
import { apiInvestmentGetByStatus } from "@/service/api-client/api-investment";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function InvestmentPortofolio() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "publish"
  );

  const [listData, setListData] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [user?.id, activeCategory])
  );

  const onLoadData = async () => {
    try {
      setLoadingList(true);
      const response = await apiInvestmentGetByStatus({
        authorId: user?.id as string,
        status: activeCategory as string,
      });
      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingList(false);
    }
  };

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
      {loadingList ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada data {activeCategory}</TextCustom>
      ) : (
        listData.map((item: any, index: number) => (
          <Investment_StatusBox
            key={index}
            data={item}
            status={activeCategory as string}
            href={`/investment/${item.id}/${activeCategory}/detail`}
          />
        ))
      )}
    </ViewWrapper>
  );
}
