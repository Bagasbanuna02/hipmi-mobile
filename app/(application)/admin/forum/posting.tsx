/* eslint-disable react-hooks/exhaustive-deps */
import {
  ClickableCustom,
  LoaderCustom,
  SearchInput,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { GridSpan_NewComponent } from "@/components/_ShareComponent/GridSpan_NewComponent";
import { apiAdminForum } from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminForumPosting() {
  const [list, setList] = useState<any | null>(null);
  const [loadList, setLoadList] = useState(false);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      handlerLoadList();
    }, [search])
  );

  const handlerLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiAdminForum({
        category: "posting",
        search: search,
      });

      console.log("DATA", JSON.stringify(response, null, 2));

      if (response.success) {
        setList(response.data);
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
      placeholder="Cari postingan"
      value={search}
      onChangeText={setSearch}
    />
  );

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Forum" />}>
        <AdminComp_BoxTitle title={"Posting"} rightComponent={rightComponent} />
        <GridSpan_NewComponent
          text1={<TextCustom bold truncate>Username</TextCustom>}
          text2={<TextCustom bold truncate> Postingan</TextCustom>}
          text3={<TextCustom bold align="center" truncate> Report Posting</TextCustom>}
          text4={<TextCustom bold align="center" truncate> Komentar</TextCustom>}
        />
        <Divider />
        <Spacing />
        <StackCustom>
          {loadList ? (
            <LoaderCustom />
          ) : _.isEmpty(list) ? (
            <TextCustom align="center" color="gray">
              Belum ada data
            </TextCustom>
          ) : (
            list?.map((item: any, index: number) => (
              <View key={index}>
                <ClickableCustom
                  onPress={() => {
                    router.push(`/admin/forum/${item.id}`);
                  }}
                >
                  <GridSpan_NewComponent
                    text1={
                      <TextCustom truncate={1}>
                        {item?.Author?.username || "-"}
                      </TextCustom>
                    }
                    text2={
                      <TextCustom truncate>
                        {item?.diskusi || "-"}
                      </TextCustom>
                    }
                    text3={
                      <TextCustom align="center" truncate={2}>
                        {item?.reportPosting || "-"}
                      </TextCustom>
                    } 
                    text4={
                      <TextCustom align="center" truncate={2}>
                        {item?.komentar || "-"}
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
