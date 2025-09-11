/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxWithHeaderSection,
  Grid,
  LoaderCustom,
  ScrollableCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { useAuth } from "@/hooks/use-auth";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import { apiEventGetByStatus } from "@/service/api-client/api-event";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function EventStatus() {
  const { user } = useAuth();
  const id = user?.id || "";
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "publish"
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
      const response = await apiEventGetByStatus({
        id: id!,
        status: activeCategory!,
      });
      // console.log("Response", JSON.stringify(response.data, null, 2));
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

  const tabsComponent = (
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
    <ViewWrapper headerComponent={tabsComponent}>
      {loadingGetData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Tidak ada data {activeCategory}</TextCustom>
      ) : (
        listData.map((item: any, i) => (
          <BoxWithHeaderSection
            key={i}
            href={`/event/${item.id }/${activeCategory}/detail-event`}
          >
            <StackCustom gap={"xs"}>
              <Grid>
                <Grid.Col span={8}>
                  <TextCustom truncate bold>
                    {item?.title}
                  </TextCustom>
                </Grid.Col>
                <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
                  <TextCustom>
                    {new Date(item?.tanggal).toLocaleDateString()}
                  </TextCustom>
                </Grid.Col>
              </Grid>

              <TextCustom truncate={2}>{item?.deskripsi}</TextCustom>
            </StackCustom>
          </BoxWithHeaderSection>
        ))
      )}
    </ViewWrapper>
  );
}
