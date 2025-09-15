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
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function EventListOfParticipants() {
  const { id } = useLocalSearchParams();
  const [startDate, setStartDate] = useState();
  const [listData, setListData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);

  useEffect(() => {
    handlerLoadData();
  }, [id]);

  const handlerLoadData = () => {
    try {
      setIsLoadData(true);
      onLoadData();
      onLoadList();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  };

  const onLoadData = async () => {
    try {
      const response = await apiEventGetOne({ id: id as string });
      if (response.success) {
        setStartDate(response.data.tanggal);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const onLoadList = async () => {
    try {
      const response = await apiEventListOfParticipants({ id: id as string });
      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  return (
    <ViewWrapper>
      {isLoadData ? (
        <LoaderCustom />
      ) : listData.length === 0 ? (
        <TextCustom align="center">Belum ada peserta</TextCustom>
      ) : (
        listData.map((item: any, index: number) => (
          <BaseBox key={index}>
            <AvatarUsernameAndOtherComponent
              avatar={item?.User?.Profile?.imageId}
              name={item?.User?.username}
              avatarHref={`/profile/${item?.User?.Profile?.id}`}
              rightComponent={
                new Date().getTime() > new Date(startDate as any).getTime() ? (
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
