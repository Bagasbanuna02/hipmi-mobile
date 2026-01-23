/* eslint-disable react-hooks/exhaustive-deps */
import {
  LoaderCustom,
  ScrollableCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import Donasi_BoxStatus from "@/screens/Donation/BoxStatus";
import { apiDonationGetByStatus } from "@/service/api-client/api-donation";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function DonationStatus() {
  const { user } = useAuth();
  const { status } = useLocalSearchParams<{ status?: string }>();

  const [activeCategory, setActiveCategory] = useState<string | null>(
    status || "publish",
  );
  const [listData, setListData] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [activeCategory]),
  );

  const onLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiDonationGetByStatus({
        authorId: user?.id as string,
        status: activeCategory as string,
      });

      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
      setListData(null);
    } finally {
      setLoadList(false);
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
    <ViewWrapper hideFooter headerComponent={scrollComponent}>
      {loadList ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada data {activeCategory}</TextCustom>
      ) : (
        listData?.map((item: any, index: number) => (
          <Donasi_BoxStatus
            key={index}
            data={item}
            status={activeCategory as string}
          />
        ))
      )}
    </ViewWrapper>
  );
}
