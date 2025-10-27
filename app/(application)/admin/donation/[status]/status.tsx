/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  LoaderCustom,
  SearchInput,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { apiAdminDonation } from "@/service/api-admin/api-admin-donation";
import { Octicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useState, useCallback } from "react";
import { Divider } from "react-native-paper";

export default function AdminDonationStatus() {
  const { status } = useLocalSearchParams();
  console.log("[STATUS]", status);

  const [data, setData] = useState<any | null>(null);
  const [search, setSearch] = useState<string>("");
  const [loadData, setLoadData] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [status, search])
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminDonation({
        category: status as "publish" | "review" | "reject",
        search,
      });

      console.log("[RES]", JSON.stringify(response, null, 2));

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setData([]);
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
      <ViewWrapper headerComponent={<AdminTitlePage title="Donasi" />}>
        <StackCustom gap={"sm"}>
          <AdminComp_BoxTitle
            title={`${_.startCase(status as string)}`}
            rightComponent={rightComponent}
          />
          <AdminTitleTable
            title1="Aksi"
            title2="Username"
            title3="Judul Donasi"
          />
          <Divider />

          {loadData ? (
            <LoaderCustom />
          ) : _.isEmpty(data) ? (
            <TextCustom align="center" size="small" color="gray">
              Belum ada data
            </TextCustom>
          ) : (
            data?.map((item: any, index: number) => (
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
                      router.push(`/admin/donation/${item.id}/${status}`);
                    }}
                  />
                }
                value2={<TextCustom truncate={1}>{item?.Author?.username || "-"}</TextCustom>}
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
