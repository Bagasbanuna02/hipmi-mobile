/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  ButtonCenteredOnly,
  Grid,
  InformationBox,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import {
  apiDonationDisbursementOfFundsListById,
  apiDonationGetOne,
} from "@/service/api-client/api-donation";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import dayjs from "dayjs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React, { useState } from "react";

export default function DonationFundDisbursement() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState({
    totalPencairan: 0,
    akumulasiPencairan: 0,
  });

  const [listData, setListData] = React.useState<any[] | null>(null);
  const [loadData, setLoadData] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);

      const responseData = await apiDonationGetOne({
        id: id as string,
        category: "permanent",
      });

      if (responseData.success) {
        setData({
          totalPencairan: responseData.data.totalPencairan,
          akumulasiPencairan: responseData.data.akumulasiPencairan,
        });
      }

      const responseList = await apiDonationDisbursementOfFundsListById({
        id: id as string,
      });

      if (responseList.success) {
        setListData(responseList.data);
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
        <InformationBox text="Pencairan dana akan dilakukan oleh Admin HIPMI tanpa campur tangan pihak manapun, jika berita pencairan dana dibawah tidak sesuai dengan kabar yang diberikan oleh PENGGALANG DANA. Maka pegguna lain dapat melaporkannya pada Admin HIPMI !" />
        <BaseBox>
          <Grid>
            <Grid.Col span={6}>
              <TextCustom bold color="yellow">
                Rp. {formatCurrencyDisplay(data?.totalPencairan)}
              </TextCustom>
              <TextCustom size="small">Total Pencairan Dana</TextCustom>
            </Grid.Col>
            <Grid.Col span={6}>
              <TextCustom bold color="yellow">
                {data?.akumulasiPencairan} kali
              </TextCustom>
              <TextCustom size="small">Akumulasi Pencairan</TextCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>

        {loadData ? (
          <LoaderCustom />
        ) : _.isEmpty(listData) ? (
          <TextCustom align="center" color="gray">
            Belum ada data
          </TextCustom>
        ) : (
          listData?.map((item, index) => (
            <BaseBox key={index}>
              <StackCustom>
                <Grid>
                  <Grid.Col span={8}>
                    <TextCustom bold>{item?.title}</TextCustom>
                  </Grid.Col>
                  <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
                    <TextCustom>{dayjs(item?.createdAt).format("DD MMM YYYY")}</TextCustom>
                  </Grid.Col>
                </Grid>
                <TextCustom>{item?.deskripsi}</TextCustom>
                <ButtonCenteredOnly
                  onPress={() => {
                    router.navigate(`/(application)/(image)/preview-image/${item?.imageId}`);
                  }}
                  icon="file-text"
                >
                  Bukti Transaksi
                </ButtonCenteredOnly>
              </StackCustom>
            </BaseBox>
          ))
        )}
      </ViewWrapper>
    </>
  );
}
