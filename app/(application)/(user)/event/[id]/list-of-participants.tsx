/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BadgeCustom,
  BaseBox,
  LoaderCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import { apiEventListOfParticipants } from "@/service/api-client/api-event";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function EventListOfParticipants() {
  const { id } = useLocalSearchParams();
  const [listData, setListData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      setIsLoadData(true);
      const response = await apiEventListOfParticipants({ id: id as string });
      if (response.success) {
        console.log("Response", JSON.stringify(response.data, null, 2));
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
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
              rightComponent={<BadgeCustom color={item?.isPresent ? "green" : "red"}>{item?.isPresent ? "Hadir" : "Tidak Hadir"}</BadgeCustom>}
            />
          </BaseBox>
        ))
      )}
    </ViewWrapper>
  );
}
