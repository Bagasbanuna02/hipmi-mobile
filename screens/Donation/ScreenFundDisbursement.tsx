/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  BaseBox,
  Grid,
  InformationBox,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { usePagination } from "@/hooks/use-pagination";
import {
  apiDonationDisbursementOfFundsListById,
  apiDonationGetOne,
} from "@/service/api-client/api-donation";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React, { useState } from "react";
import { RefreshControl, View } from "react-native";
import { createPaginationComponents } from "@/helpers/paginationHelpers";
import { PAGINATION_DEFAULT_TAKE } from "@/constants/constans-value";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import { Divider } from "react-native-paper";

interface Donation_ScreenFundDisbursementProps {
  donationId: string;
}

export default function Donation_ScreenFundDisbursement({
  donationId,
}: Donation_ScreenFundDisbursementProps) {
  const [data, setData] = useState({
    totalPencairan: 0,
    akumulasiPencairan: 0,
  });

  // Ambil data utama (total pencairan, dll) terpisah dari pagination
  React.useEffect(() => {
    const onLoadData = async () => {
      try {
        const responseData = await apiDonationGetOne({
          id: donationId,
          category: "permanent",
        });

        if (responseData.success) {
          setData({
            totalPencairan: responseData.data.totalPencairan,
            akumulasiPencairan: responseData.data.akumulasiPencairan,
          });
        }
      } catch (error) {
        console.log("[ERROR]", error);
      }
    };

    onLoadData();
  }, [donationId]);

  const pagination = usePagination({
    fetchFunction: async (page) => {
      return await apiDonationDisbursementOfFundsListById({
        id: donationId,
        page: String(page),
      });
    },
    pageSize: PAGINATION_DEFAULT_TAKE, // Sesuaikan dengan jumlah item per halaman dari API
    dependencies: [donationId],
  });

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <BaseBox key={index}>
      <StackCustom>
        <Grid>
          <Grid.Col span={8}>
            <TextCustom bold>{item?.title}</TextCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
            <TextCustom size="small">
              {dayjs(item?.createdAt).format("DD MMM YYYY")}
            </TextCustom>
          </Grid.Col>
        </Grid>
        <TextCustom>{item?.deskripsi}</TextCustom>
        {/* <Spacing /> */}
        <Divider />
        <Grid>
          <Grid.Col span={8} style={{ alignSelf: "center" }}>
            <TextCustom bold size={"large"}>
              Rp. {formatCurrencyDisplay(item?.nominalCair)}
            </TextCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
            <ActionIcon
              icon={<Feather name="file-text" color={MainColor.black} />}
              onPress={() => {
                router.navigate(
                  `/(application)/(image)/preview-image/${item?.imageId}`,
                );
              }}
            />
          </Grid.Col>
        </Grid>
        {/*
        <ButtonCenteredOnly
          onPress={() => {
            router.navigate(
              `/(application)/(image)/preview-image/${item?.imageId}`,
            );
          }}
          icon="file-text"
        >
          Bukti Transaksi
        </ButtonCenteredOnly> */}
      </StackCustom>
    </BaseBox>
  );

  const { ListEmptyComponent, ListFooterComponent } =
    createPaginationComponents({
      loading: pagination.loading,
      refreshing: pagination.refreshing,
      listData: pagination.listData,
      isInitialLoad: pagination.isInitialLoad,
      emptyMessage: "Belum ada data",
      skeletonCount: PAGINATION_DEFAULT_TAKE,
      skeletonHeight: 150,
    });

  // Komponen header yang akan ditampilkan di atas daftar
  const ListHeaderComponent = (
    <View>
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
    </View>
  );

  return (
    <NewWrapper
      listData={pagination.listData}
      renderItem={renderItem}
      onEndReached={pagination.loadMore}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      refreshControl={
        <RefreshControl
          refreshing={pagination.refreshing}
          onRefresh={pagination.onRefresh}
        />
      }
      hideFooter
    />
  );
}
