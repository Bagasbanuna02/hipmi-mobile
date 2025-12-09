/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
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
import { apiAdminVoting } from "@/service/api-admin/api-admin-voting";
import { Octicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { Divider } from "react-native-paper";

export default function AdminVotingStatus() {
  const { status } = useLocalSearchParams();
  const [list, setList] = useState<any | null>(null);
  const [loadList, setLoadList] = useState(false);
  const [search, setSearch] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [status, search])
  );

  const onLoadData = async () => {
    try {
      setLoadList(true);
      const response = await apiAdminVoting({
        category: status as "publish" | "review" | "reject" as any,
        search,
      });

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
      <ViewWrapper headerComponent={<AdminTitlePage title="Voting" />}>
        <AdminComp_BoxTitle
          title={`${_.startCase(status as string)}`}
          rightComponent={rightComponent}
        />

        <StackCustom gap={"sm"}>
          <AdminTitleTable
            title1="Aksi"
            title2="Username"
            title3="Judul Voting"
          />
          <Divider />

          {loadList ? (
            <LoaderCustom />
          ) : _.isEmpty(list) ? (
            <TextCustom align="center" bold color="gray">
              Belum ada data
            </TextCustom>
          ) : (
            list.map((item: any, i: number) => (
              <AdminTableValue
                key={i}
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
                      router.push(`/admin/voting/${item.id}/${status}`);
                    }}
                  />
                }
                value2={
                  <TextCustom truncate={1}>
                    {item?.Author?.username || "-"}
                  </TextCustom>
                }
                value3={
                  <TextCustom truncate={2}>
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
