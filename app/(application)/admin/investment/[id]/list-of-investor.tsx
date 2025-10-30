/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  BadgeCustom,
  CenterCustom,
  LoaderCustom,
  SelectCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconView } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridViewCustomSpan } from "@/components/_ShareComponent/GridViewCustomSpan";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { dummyMasterStatusTransaction } from "@/lib/dummy-data/_master/status-transaction";
import { apiAdminInvestmentListOfInvestor } from "@/service/api-admin/api-admin-investment";
import { apiMasterTransaction } from "@/service/api-client/api-master";
import { colorBadgeTransaction } from "@/utils/colorBadge";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminInvestmentListOfInvestor() {
  const { id } = useLocalSearchParams();
  console.log("[ID]", id);

  const [listData, setListData] = React.useState<any[] | null>(null);
  const [loadData, setLoadData] = React.useState(false);
  const [master, setMaster] = React.useState<any[]>([]);

  const [selectValue, setSelectValue] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null
  );

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

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [id, selectValue])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminInvestmentListOfInvestor({
        id: id as string,
        status: selectedStatus as any,
      });
      console.log("[LIST OF INVESTOR]", JSON.stringify(response, null, 2));

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setListData([]);
    } finally {
      setLoadData(false);
    }
  };

  useEffect(() => {
    onLoadMaster();
  }, []);

  const searchComponent = (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <SelectCustom
        placeholder="Pilih status transaksi"
        data={
          _.isEmpty(master)
            ? []
            : master?.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))
        }
        value={selectValue}
        onChange={(value: any) => {
          setSelectValue(value);
          const nameSelected = master.find((item: any) => item.id === value);
          const statusChooses = _.lowerCase(nameSelected?.name);
          setSelectedStatus(statusChooses);
        }}
        styleContainer={{ width: "100%", marginBottom: 0 }}
        allowClear
      />
    </View>
  );

  const headerComponent = (
    <StackCustom gap={"xs"}>
      <AdminBackButtonAntTitle title="Daftar Investor" />
      {searchComponent}
    </StackCustom>
  );

  return (
    <>
      <ViewWrapper headerComponent={headerComponent}>
        <StackCustom>
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
                Investor
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
            {loadData ? (
              <LoaderCustom />
            ) : _.isEmpty(listData) ? (
              <NoDataText />
            ) : (
              listData?.map((item: any, index: number) => (
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
                              `/admin/investment/${item?.id}/${_.lowerCase(
                                item?.StatusInvoice?.name
                              )}/transaction-detail`
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
                        color={colorBadgeTransaction({
                          status: item?.StatusInvoice?.name,
                        })}
                      >
                        {item?.StatusInvoice?.name}
                      </BadgeCustom>
                    }
                  />
                </View>
              ))
            )}
          </StackCustom>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
