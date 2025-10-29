/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  Grid,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { apiAdminDonationListOfDonaturById } from "@/service/api-admin/api-admin-donation";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { FontAwesome6 } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function Donation_ListOfDonatur() {
  const { id } = useLocalSearchParams();
  const [listData, setListData] = useState<any[] | null>(null);
  const [loadData, setLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminDonationListOfDonaturById({
        id: id as string,
      });


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
    <>
      <ViewWrapper>
        {loadData ? (
          <LoaderCustom />
        ) : _.isEmpty(listData) ? (
          <TextCustom bold align="center">
            Belum ada donatur
          </TextCustom>
        ) : (
          listData?.map((item: any, index: number) => (
            <BaseBox key={index}>
              <Grid>
                <Grid.Col
                  span={3}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FontAwesome6
                    name="face-smile-wink"
                    size={50}
                    style={{ color: MainColor.yellow }}
                  />
                </Grid.Col>
                <Grid.Col span={9}>
                  <TextCustom bold size="large">
                    {item?.Author?.username || "-"}
                  </TextCustom>
                  <Spacing/>
                  <StackCustom gap={"xs"}>
                    <TextCustom size={"small"}>Berdonas sebesar </TextCustom>
                    <TextCustom bold size="large" color="yellow">
                      Rp. {formatCurrencyDisplay(item?.nominal)}
                    </TextCustom>
                    <TextCustom>
                      {dayjs(item?.createdAt).format("DD MMM YYYY, HH:mm")}
                    </TextCustom>
                  </StackCustom>
                </Grid.Col>
              </Grid>
            </BaseBox>
          ))
        )}
      </ViewWrapper>
    </>
  );
}
