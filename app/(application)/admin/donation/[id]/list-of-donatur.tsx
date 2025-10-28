/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  BadgeCustom,
  CenterCustom,
  SelectCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconView } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridViewCustomSpan } from "@/components/_ShareComponent/GridViewCustomSpan";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminDonationListOfDonatur } from "@/service/api-admin/api-admin-donation";
import { apiMasterTransaction } from "@/service/api-client/api-master";
import { colorBadgeTransaction } from "@/utils/colorBadge";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminDonasiListOfDonatur() {
  const { id } = useLocalSearchParams();
  console.log("[ID >>]", id);
  const [listData, setListData] = React.useState<any[] | null>(null);
  const [master, setMaster] = React.useState<any[]>([]);

  const [selectStatus, setSelectStatus] = React.useState<
    "berhasil" | "gagal" | "proses" | "menunggu" | ""
  >("");

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [id, selectStatus])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminDonationListOfDonatur({
        id: id as string,
        status: "" as any,
      });
      console.log(
        "[LIST OF DONATUR]",
        JSON.stringify(response, null, 2)
      );

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setListData([]);
    }
  };

  useEffect(() => {
    onLoadMaster();
  }, []);

  const onLoadMaster = async () => {
    try {
      const response = await apiMasterTransaction();
     
      if (response.success) {
        setMaster(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setMaster([]);
    }
  };

  const searchComponent = (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <SelectCustom
        placeholder="Pilih status transaksi"
        data={
          _.isEmpty(master)
            ? []
            : master?.map((item: any) => ({
                label: item.name,
                value: item.name
              }))
        }
        onChange={(value: any) => {
          console.log("[SELECT STATUS]", value);
          const statusChooses = _.lowerCase(value);
          setSelectStatus(statusChooses as any);
        }}
        styleContainer={{ width: "100%", marginBottom: 0 }}
      />
    </View>
  );
  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle newComponent={searchComponent} />
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
              Donatur
            </TextCustom>
          }
          component3={
            <TextCustom bold align="center">
              Status
            </TextCustom>
          }
        />
        <Divider />
        <StackCustom>
          {listData?.map((item: any, index: number) => (
            <View key={index}>
              <GridViewCustomSpan
                span1={3}
                span2={5}
                span3={4}
                component1={
                  <CenterCustom>
                    <ActionIcon
                      icon={<IconView size={ICON_SIZE_BUTTON} color="black" />}
                      onPress={() => {
                        router.push(
                          `/admin/donation/${id}/berhasil/transaction-detail`
                        );
                      }}
                    />
                  </CenterCustom>
                }
                component2={
                  <TextCustom bold align="center" truncate>
                    {item?.Author?.username || "-"}
                  </TextCustom>
                }
                component3={
                  <BadgeCustom
                    style={{ alignSelf: "center" }}
                    color={colorBadgeTransaction({status: item?.DonasiMaster_StatusInvoice?.name})}
                  >
                    {item?.DonasiMaster_StatusInvoice?.name}
                  </BadgeCustom>
                }
              />
              <Divider />
            </View>
          ))}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
