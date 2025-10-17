/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  BaseBox,
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
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminForum } from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import React, { useCallback, useState } from "react";
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

      // console.log("[RES LIST POSTING]", JSON.stringify(response, null, 2));
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
      placeholder="Cari"
      value={search}
      onChangeText={setSearch}
    />
  );

  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Forum" />}>
        <AdminComp_BoxTitle title={"Posting"} rightComponent={rightComponent} />
        <StackCustom>
          <AdminTitleTable title1="Aksi" title2="Username" title3="Postingan" />
          <Divider />
          {loadList ? (
            <LoaderCustom />
          ) : _.isEmpty(list) ? (
            <TextCustom align="center" color="gray">
              Belum ada data
            </TextCustom>
          ) : (
            list?.map((item: any, index: number) => (
              <AdminTableValue
                key={index}
                value1={
                  <ActionIcon
                    icon={<IconView size={ICON_SIZE_BUTTON} color="black" />}
                    onPress={() => {
                      router.push(`/admin/forum/${item?.id}`);
                    }}
                  />
                }
                value2={
                  <TextCustom truncate={1}>
                    {item?.Author?.username || "-"}
                  </TextCustom>
                }
                value3={
                  <TextCustom truncate={2}>{item?.diskusi || "-"}</TextCustom>
                }
              />
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
