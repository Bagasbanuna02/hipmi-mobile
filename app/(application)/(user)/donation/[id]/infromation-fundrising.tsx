/* eslint-disable react-hooks/exhaustive-deps */
import {
  AvatarComp,
  BaseBox,
  ButtonCustom,
  Grid,
  LoaderCustom,
  Spacing,
  TextCustom,
  ViewWrapper
} from "@/components";
import Donation_BoxPublish from "@/screens/Donation/BoxPublish";
import { apiDonationFundrising } from "@/service/api-client/api-donation";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

export default function DonationInformationFunrising() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>();
  const [list, setList] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadList(true);
      const response = await apiDonationFundrising({ id: id as string });

      setData(response?.data?.user);
      setList(response?.data?.donasi);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <>
      <ViewWrapper>
        <BaseBox>
          <Grid>
            <Grid.Col span={6} style={{ justifyContent: "center" }}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <AvatarComp size="lg" fileId={data?.Profile?.imageId} />
                <TextCustom bold size="large" truncate>
                  @{data?.username}
                </TextCustom>
              </View>
            </Grid.Col>
            <Grid.Col span={6} style={{ justifyContent: "center" }}>
              <ButtonCustom href={`/profile/${data?.Profile?.id}`}>
                Kunjungi Profile
              </ButtonCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>

        <Spacing />

        {loadList ? (
          <LoaderCustom />
        ) : _.isEmpty(list) ? (
          <TextCustom align="center" color="gray" size="small">Belum ada data</TextCustom>
        ) : (
          list?.map((item: any, index: number) => (
            <Donation_BoxPublish key={index} id={item?.id} data={item} />
          ))
        )}
      </ViewWrapper>
    </>
  );
}
