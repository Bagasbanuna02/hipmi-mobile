/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  ClickableCustom,
  Divider,
  LoaderCustom,
  SearchInput,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconView } from "@/components/_Icon/IconComponent";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { GridSpan_NewComponent } from "@/components/_ShareComponent/GridSpan_NewComponent";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminForum } from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function AdminForumReportPosting() {
  const [listData, setListData] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [search])
  );

  const onLoadData = async () => {
    try {
      setLoadList(true);

      const response = await apiAdminForum({
        category: "report_posting",
        search: search,
      });

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadList(false);
    }
  };

  const rightComponent = (
    <SearchInput
      containerStyle={{ width: "100%", marginBottom: 0 }}
      placeholder="Cari Postingan"
      value={search}
      onChangeText={setSearch}
    />
  );

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Forum" />}>
        <AdminComp_BoxTitle
          title="Report Posting"
          rightComponent={rightComponent}
        />

        <GridSpan_NewComponent
          text1={
            <TextCustom bold truncate>
              Username
            </TextCustom>
          }
          text2={
            <TextCustom bold truncate>
              Postingan
            </TextCustom>
          }
        />
        <Divider />
        <StackCustom>
          {loadList ? (
            <LoaderCustom />
          ) : _.isEmpty(listData) ? (
            <TextCustom align="center" color="gray">
              Belum ada data
            </TextCustom>
          ) : (
            listData?.map((item: any, index: number) => (
              <View key={index}>
                <ClickableCustom
                  onPress={() => {
                    router.push(
                      `/admin/forum/${item?.Forum_Posting?.id}/list-report-posting`
                    );
                  }}
                >
                  <GridSpan_NewComponent
                    text1={
                      <TextCustom truncate={1}>
                        {item?.User?.username || "-"}
                      </TextCustom>
                    }
                    text2={
                      <TextCustom truncate={1}>
                        {item?.Forum_Posting?.diskusi || "-"}
                      </TextCustom>
                    }
                  />
                </ClickableCustom>
                <Divider />
              </View>
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
