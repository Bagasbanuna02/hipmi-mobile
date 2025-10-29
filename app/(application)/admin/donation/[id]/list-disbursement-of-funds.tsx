/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  CenterCustom,
  Divider,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconView } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridViewCustomSpan } from "@/components/_ShareComponent/GridViewCustomSpan";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminDonationDisbursementOfFundsListById } from "@/service/api-admin/api-admin-donation";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import dayjs from "dayjs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React, { useCallback } from "react";
import { View } from "react-native";

export default function AdminDonasiListOfDisbursementOfFunds() {
  const { id } = useLocalSearchParams();
  const [listData, setListData] = React.useState<any[] | null>(null);
  const [loadData, setLoadData] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminDonationDisbursementOfFundsListById({
        id: id as string,
        category: "get-all",
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
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle title="Daftar Pencairan Dana" />
        }
      >
        <GridViewCustomSpan
          span1={3}
          span2={5}
          span3={4}
          component1={
            <TextCustom bold align="center">
              Aksi
            </TextCustom>
          }
          component2={
            <TextCustom bold align="center">
              Tanggal
            </TextCustom>
          }
          component3={
            <TextCustom bold align="center">
              Nominal
            </TextCustom>
          }
        />
        <Divider />
        <StackCustom>
          {loadData ? (
            <LoaderCustom />
          ) : _.isEmpty(listData) ? (
            <TextCustom align="center" color="gray">
              Belum ada data
            </TextCustom>
          ) : (
            listData?.map((item, index) => (
              <View key={index}>
                <GridViewCustomSpan
                  span1={3}
                  span2={5}
                  span3={4}
                  component1={
                    <CenterCustom>
                      <ActionIcon
                        icon={
                          <IconView size={ICON_SIZE_BUTTON} color="black" />
                        }
                        onPress={() => {
                          router.push(
                            `/admin/donation/${item?.id}/detail-disbursement-of-funds`
                          );
                        }}
                      />
                    </CenterCustom>
                  }
                  component2={
                    <TextCustom align="center" truncate>
                      {dayjs(item?.createdAt).format("DD-MM-YYYY")}
                    </TextCustom>
                  }
                  component3={
                    <TextCustom align="center" truncate>
                      Rp. {formatCurrencyDisplay(item?.nominalCair)}
                    </TextCustom>
                  }
                />
              </View>
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
