/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  LoaderCustom,
  ScrollableCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import { apiJobGetByStatus } from "@/service/api-client/api-job";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function JobStatus() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "publish"
  );
  const [listData, setListData] = useState<any[]>([]);
  const [isLoadList, setIsLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [user?.id, activeCategory])
  );

  const onLoadData = async () => {
    try {
      setIsLoadList(true);
      const response = await apiJobGetByStatus({
        authorId: user?.id as string,
        status: activeCategory as string,
      });
      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadList(false);
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
      {isLoadList ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada data {activeCategory}</TextCustom>
      ) : (
        listData.map((e, i) => (
          <BaseBox
            key={i}
            paddingTop={20}
            paddingBottom={20}
            href={`/job/${e?.id}/${activeCategory}/detail`}
          >
            <TextCustom align="center" bold truncate size="large">
              {e?.title}
            </TextCustom>
          </BaseBox>
        ))
      )}
    </ViewWrapper>
  );
}
