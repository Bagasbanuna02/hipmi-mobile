import { LoaderCustom, TextCustom } from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import FloatingButton from "@/components/Button/FloatingButton";
import Event_BoxPublishSection from "@/screens/Event/BoxPublishSection";
import { apiEventGetAll } from "@/service/api-client/api-event";
import { dateTimeView } from "@/utils/dateTimeView";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function EventBeranda() {
  const [listData, setListData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [])
  );

  const onLoadData = async () => {
    try {
      setIsLoadData(true);
      const response = await apiEventGetAll({category: "beranda"});
      // console.log("Response", JSON.stringify(response.data, null, 2));
      setListData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  };

  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/event/create")} />
      }
    >
      {isLoadData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Belum ada event</TextCustom>
      ) : (
        listData.map((item: any, index) => (
          <Event_BoxPublishSection
            key={index}
            href={`/event/${item.id}/publish`}
            data={item}
            rightComponentAvatar={
              <TextCustom>
                {dateTimeView({ date: item?.tanggal, withoutTime: true })}
              </TextCustom>
            }
          />
        ))
      )}
    </ViewWrapper>
  );
}
