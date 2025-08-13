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
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { dummyMasterStatusTransaction } from "@/lib/dummy-data/_master/status-transaction";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminInvestmentListOfInvestor() {
  const { id } = useLocalSearchParams();
  const searchComponent = (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <SelectCustom
        placeholder="Pilih status transaksi"
        data={dummyMasterStatusTransaction}
        onChange={(value) => console.log(value)}
        styleContainer={{ width: "100%", marginBottom: 0 }}
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
      <ViewWrapper
        headerComponent={headerComponent}
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
          {Array.from({ length: 10 }).map((_, index) => (
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
                          `/admin/investment/${id}/berhasil/transaction-detail`
                        );
                      }}
                    />
                  </CenterCustom>
                }
                component2={
                  <TextCustom bold align="center" truncate>
                    Bagas Banuna
                  </TextCustom>
                }
                component3={
                  <BadgeCustom
                    style={{ alignSelf: "center" }}
                    color={MainColor.green}
                  >
                    Berhasil
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
