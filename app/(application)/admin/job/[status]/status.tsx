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
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminJob } from "@/service/api-admin/api-admin-job";
import { Octicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Divider } from "react-native-paper";

export default function AdminJobStatus() {
  const { status } = useLocalSearchParams();
  console.log("[STATUS]", status);

  const [list, setList] = useState<any | null>(null);
  const [loadList, setLoadList] = useState(false);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      handlerLoadList();
    }, [status, search])
  );

  const handlerLoadList = async () => {
    try {
      setLoadList(true);
      const response = await apiAdminJob({
        category: status as "publish" | "review" | "reject",
        search,
      });

      console.log("[RESPONSE >>]", JSON.stringify(response, null, 2));

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
      placeholder="Cari"
      onChangeText={setSearch}
      value={search}
    />
  );
  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Job Vacancy" />}>
        <AdminComp_BoxTitle
          title={`${_.startCase(status as string)}`}
          rightComponent={rightComponent}
        />

        <StackCustom>
          <AdminTitleTable
            title1="Aksi"
            title2="Username"
            title3="Judul Pekerjaan"
          />
          {/* <Spacing /> */}
          <Divider />

          {loadList ? (
            <LoaderCustom />
          ) : _.isEmpty(list) ? (
            <TextCustom align="center" color="gray">
              Tidak ada data
            </TextCustom>
          ) : (
            list?.map((item: any, index: number) => (
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
                      router.push(`/admin/job/${item.id}/${status}`);
                    }}
                  />
                }
                value2={
                  <TextCustom align="center" truncate={1}>
                    {item?.Author?.username || "-"}
                  </TextCustom>
                }
                value3={
                  <TextCustom truncate={2} align="center">
                    {item?.title || "-"}
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
