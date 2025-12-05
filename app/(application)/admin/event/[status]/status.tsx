/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  ClickableCustom,
  LoaderCustom,
  SearchInput,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminEvent } from "@/service/api-admin/api-admin-event";
import { dateTimeView } from "@/utils/dateTimeView";
import { Octicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Divider } from "react-native-paper";

export default function AdminEventStatus() {
  const { status } = useLocalSearchParams();
  console.log("[STATUS EVENT]", status);

  const [listData, setListData] = useState<any[] | null>(null);
  const [loadData, setLoadData] = useState(false);
  const [search, setSearch] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [status, search])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminEvent({
        category: status as "publish" | "review" | "reject" | "history" as any,
        search,
      });

      console.log(
        `[RES LIST BY STATUS: ${status}]`,
        JSON.stringify(response, null, 2)
      );

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadData(false);
    }
  };

  const rightComponent = (
    <SearchInput
      containerStyle={{ width: "100%", marginBottom: 0 }}
      placeholder="Cari"
      value={search}
      onChangeText={(value) => setSearch(value)}
    />
  );
  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Event" />}>
        <AdminComp_BoxTitle
          title={`${_.startCase(status as string)}`}
          rightComponent={rightComponent}
        />

        <StackCustom gap={"sm"}>
          <AdminTitleTable
            title1="Username"
            title2="Tanggal"
            title3="Judul Event"
          />
          <Divider />

          {loadData ? (
            <LoaderCustom />
          ) : _.isEmpty(listData) ? (
            <TextCustom align="center" size="small" color="gray">
              Belum ada data
            </TextCustom>
          ) : (
            listData?.map((item, index) => (
              <ClickableCustom
                key={index}
                onPress={() => {
                  router.push(`/admin/event/${item.id}/${status}`);
                }}
              >
                <AdminTableValue
                  key={index}
                  value1={
                    <TextCustom truncate={1}>
                      {item?.Author?.username || "-"}
                    </TextCustom>
                    // <ActionIcon
                    //   icon={
                    //     <Octicons
                    //       name="eye"
                    //       size={ICON_SIZE_BUTTON}
                    //       color="black"
                    //     />
                    //   }
                    //   onPress={() => {
                    //     router.push(`/admin/event/${item.id}/${status}`);
                    //   }}
                    // />
                  }
                  value2={
                    <TextCustom truncate={1}>
                      {dateTimeView({ date: item?.tanggal })}
                    </TextCustom>
                  }
                  value3={
                    <TextCustom truncate={2}>{item?.title || "-"}</TextCustom>
                  }
                />
                <Divider/>
              </ClickableCustom>
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
