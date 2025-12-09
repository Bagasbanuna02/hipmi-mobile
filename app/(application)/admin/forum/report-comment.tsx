/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  ClickableCustom,
  LoaderCustom,
  SearchInput,
  Spacing,
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
import { Divider } from "react-native-paper";

export default function AdminForumReportComment() {
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
        category: "report_comment",
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
      placeholder="Cari Komentar"
      value={search}
      onChangeText={setSearch}
    />
  );

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Forum" />}>
        <AdminComp_BoxTitle
          title="Report Komentar"
          rightComponent={rightComponent}
        />

        <GridSpan_NewComponent
          text1={
            <TextCustom bold truncate>
              Pelapor
            </TextCustom>
          }
          text2={
            <TextCustom bold truncate>
              Komentar
            </TextCustom>
          }
          text3={
            <TextCustom bold truncate>
              Jenis Laporan
            </TextCustom>
          }
        />
        <Divider />
        <Spacing />
        <StackCustom gap={"lg"}>
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
                      `/admin/forum/${item?.Forum_Komentar?.id}/list-report-comment`
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
                      <TextCustom truncate={2}>
                        {item?.Forum_Komentar?.komentar || "-"}
                      </TextCustom>
                    }
                    text3={
                      <TextCustom truncate={2}>
                        {item?.ForumMaster_KategoriReport?.title || "-"}
                      </TextCustom>
                    }
                  />
                </ClickableCustom>
                <Spacing />
                <Divider />
              </View>
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
