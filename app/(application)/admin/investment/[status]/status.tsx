/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  LoaderCustom,
  SearchInput,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminInvestment } from "@/service/api-admin/api-admin-investment";
import { Octicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React, { useCallback } from "react";
import { Divider } from "react-native-paper";

export default function AdminInvestmentStatus() {
  const { status } = useLocalSearchParams();
  console.log("[STATUS]", status);

  const [listData, setListData] = React.useState<any[] | null>(null);
  const [loadData, setLoadingData] = React.useState(false);
  const [search, setSearch] = React.useState("");

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [status, search])
  );

  const onLoadData = async () => {
    try {
      setLoadingData(true);
      const response = await apiAdminInvestment({
        category: status as "publish" | "review" | "reject",
        search,
      });
      console.log("[LIST DATA]", JSON.stringify(response, null, 2));
      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log(error);
      setListData([]);
    } finally {
      setLoadingData(false);
    }
  };

  const rightComponent = (
    <SearchInput
      containerStyle={{ width: "100%", marginBottom: 0 }}
      placeholder="Cari"
      value={search}
      onChangeText={setSearch}
    />
  );
  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Investasi" />}>
        <StackCustom gap={"sm"}>
          <AdminComp_BoxTitle
            title={`${_.startCase(status as string)}`}
            rightComponent={rightComponent}
          />
          <AdminTitleTable
            title1="Aksi"
            title2="Username"
            title3="Judul Investasi"
          />

          <Divider />

          {loadData ? (
            <LoaderCustom />
          ) : _.isEmpty(listData) ? (
            <NoDataText />
          ) : (
            listData?.map((item: any, index: number) => (
              <AdminTableValue
                key={index}
                value1={
                  <ActionIcon
                    icon={
                      <Octicons
                        name="eye"
                        size={ICON_SIZE_BUTTON}
                        color="black"
                      />
                    }
                    onPress={() => {
                      router.push(`/admin/investment/${item.id}/${status}`);
                    }}
                  />
                }
                value2={<TextCustom truncate={1}>{item?.author?.username}</TextCustom>}
                value3={
                  <TextCustom truncate={2}>
                   {item?.title}
                  </TextCustom>
                }
              />
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
