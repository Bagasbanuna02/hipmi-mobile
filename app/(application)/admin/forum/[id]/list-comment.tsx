/* eslint-disable react-hooks/exhaustive-deps */
import {
    LoaderCustom,
    StackCustom,
    TextCustom,
    ViewWrapper
} from "@/components";
import { IconOpenTo } from "@/components/_Icon/IconOpenTo";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import { apiAdminForumCommentById } from "@/service/api-admin/api-admin-forum";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Divider } from "react-native-paper";

export default function AdminForumListComment() {
  const { id } = useLocalSearchParams();
  const [listComment, setListComment] = useState<any[] | null>(null);
  const [loadList, setLoadList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadComment();
    }, [id])
  );

  const onLoadComment = async () => {
    try {
      setLoadList(true);
      const response = await apiAdminForumCommentById({
        id: id as string,
        category: "get-all",
      });

      if (response.success) {
        setListComment(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setListComment([]);
    } finally {
      setLoadList(false);
    }
  };

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Daftar Komentar" />}
      >
        <StackCustom>
          <AdminTitleTable title1="Aksi" title2="Report" title3="Komentar" />
          <Divider />
          {loadList ? (
            <LoaderCustom />
          ) : _.isEmpty(listComment) ? (
            <TextCustom align="center" color="gray">
              Tidak ada komentar
            </TextCustom>
          ) : (
            listComment?.map((item: any, index: number) => (
              <AdminTableValue
                key={index}
                value1={
                  <IconOpenTo
                    onPress={() => {
                      router.push(
                        `/admin/forum/${item.id}/list-report-comment`
                      );
                    }}
                  />
                }
                value2={
                  <TextCustom truncate={1}>
                    {item?.countReport || 0}
                  </TextCustom>
                }
                value3={
                  <TextCustom truncate={2}>{item?.komentar || "-"}</TextCustom>
                }
              />
            ))
          )}
        </StackCustom>
      </ViewWrapper>

    </>
  );
}
