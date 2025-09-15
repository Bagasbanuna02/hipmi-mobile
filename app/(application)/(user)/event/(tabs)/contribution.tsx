/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import {
  apiEventGetAll
} from "@/service/api-client/api-event";
import { dateTimeView } from "@/utils/dateTimeView";
import { useFocusEffect } from "expo-router";
import _ from "lodash";
import React, { useCallback, useState } from "react";

export default function EventContribution() {
  const { user } = useAuth();
  const [listData, setListData] = useState<any>([]);
  const [isLoadList, setIsLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [user?.id])
  );

  async function onLoadData() {
    try {
      setIsLoadList(true);
      const response = await apiEventGetAll({
        category: "contribution",
        userId: user?.id,
      });
      if (response.success) {
        setListData(response.data);

        // const responseListParticipants = await apiEventListOfParticipants({
        //   id: response?.data?.Event?.id,
        // });
        // console.log(
        //   "[LIST PARTICIPANTS]",
        //   JSON.stringify(responseListParticipants.data, null, 2)
        // );
        // if (responseListParticipants.success) {
        //   setListParticipants(responseListParticipants.data);
        // }
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadList(false);
    }
  }

  return (
    <ViewWrapper hideFooter>
      {isLoadList ? (
        <LoaderCustom />
      ) : _.isEmpty(listData) ? (
        <TextCustom align="center">Belum ada kontribusi</TextCustom>
      ) : (
        listData.map((item: any, index: number) => (
          <BoxWithHeaderSection
            key={index}
            href={`/event/${item?.Event?.id}/contribution`}
          >
            <StackCustom>
              <AvatarUsernameAndOtherComponent
                avatar={item?.User?.Profile?.imageId}
                avatarHref={`/profile/${item?.User?.Profile?.id}`}
                name={item?.User?.username}
                rightComponent={
                  <TextCustom truncate>
                    {dateTimeView({
                      date: item?.Event?.tanggal,
                      withoutTime: true,
                    })}
                  </TextCustom>
                }
              />

              <TextCustom bold align="center" size="xlarge">
                {item?.Event?.title}
              </TextCustom>
              <Spacing height={10} />

              {/* <Grid>
                {item?.Event?.Event_Peserta?.map(
                  (item2: any, index2: number) => (
                    <Grid.Col
                      style={{ alignItems: "center" }}
                      span={12 / item?.Event?.Event_Peserta?.length}
                      key={index2}
                    >
                      <AvatarComp
                        size="base"
                        href={`/profile/${item2?.User?.Profile?.id}`}
                        fileId={item2?.User?.Profile?.imageId}
                      />
                    </Grid.Col>
                  )
                )}
              </Grid> */}
            </StackCustom>
          </BoxWithHeaderSection>
        ))
      )}
    </ViewWrapper>
  );
}
