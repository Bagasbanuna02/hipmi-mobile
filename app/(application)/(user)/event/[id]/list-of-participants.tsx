/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BadgeCustom,
  BaseBox,
  LoaderCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import {
  apiEventGetOne,
  apiEventListOfParticipants,
} from "@/service/api-client/api-event";
import dayjs, { Dayjs } from "dayjs";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function EventListOfParticipants() {
  const { id } = useLocalSearchParams();
  const [startDate, setStartDate] = useState<Dayjs | undefined>();
  const [listData, setListData] = useState<any[] | null>(null);
  const [loadtData, setLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handlerLoadData();
    }, [id])
  );

  const handlerLoadData = () => {
    try {
      onLoadData();
      onLoadList();
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const onLoadData = async () => {
    try {
      const response = await apiEventGetOne({ id: id as string });
      if (response.success) {
        const date = dayjs(response.data.tanggal);
        setStartDate(date);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const onLoadList = async () => {
    try {
      setLoadData(true);
      const response = await apiEventListOfParticipants({ id: id as string });
     
      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadData(false);
    }
  };

  return (
    <ViewWrapper>
      {loadtData && !listData ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center" color="gray">
          Belum ada peserta
        </TextCustom>
      ) : (
        listData?.map((item: any, index: number) => (
          <BaseBox key={index}>
            <AvatarUsernameAndOtherComponent
              avatar={item?.User?.Profile?.imageId}
              name={item?.User?.username}
              avatarHref={`/profile/${item?.User?.Profile?.id}`}
              rightComponent={
                startDate && startDate.subtract(1, "hour").diff(dayjs()) < 0 ? (
                  <View
                    style={{
                      justifyContent: "flex-end",
                    }}
                  >
                    <BadgeCustom color={item?.isPresent ? "green" : "red"}>
                      {item?.isPresent ? "Hadir" : "Tidak Hadir"}
                    </BadgeCustom>
                  </View>
                ) : (
                  <View
                    style={{
                      justifyContent: "flex-end",
                    }}
                  >
                    <BadgeCustom color="gray">-</BadgeCustom>
                  </View>
                )
              }
            />
          </BaseBox>
        ))
      )}
    </ViewWrapper>
  );
}
