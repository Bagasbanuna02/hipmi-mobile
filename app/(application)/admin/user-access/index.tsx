/* eslint-disable react-hooks/exhaustive-deps */
import {
  BadgeCustom,
  CenterCustom,
  Divider,
  SearchInput,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import { GridViewCustomSpan } from "@/components/_ShareComponent/GridViewCustomSpan";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_XLARGE } from "@/constants/constans-value";
import { apiAdminUserAccessGetAll } from "@/service/api-admin/api-admin-user-access";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";

export default function AdminUserAccess() {
  const [listData, setListData] = useState<any[] | null>(null);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [search])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminUserAccessGetAll({
        search: search,
        category: "only-user",
      });

      if (response.success) {
        setListData(response.data);
      }
    } catch (error) {
      console.log("[ERROR LOAD DATA]", error);
    }
  };

  const rightComponent = () => {
    return (
      <>
        <SearchInput
          containerStyle={{ width: "100%", marginBottom: 0 }}
          placeholder="Cari User"
          onChangeText={(text) => setSearch(text)}
        />
      </>
    );
  };
  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminComp_BoxTitle
            title="User Access"
            rightComponent={rightComponent()}
          />
        }
      >
        <GridViewCustomSpan
          span1={2}
          span2={5}
          span3={5}
          component1={
            <TextCustom align="center" bold>
              Aksi
            </TextCustom>
          }
          component2={<TextCustom bold>Username</TextCustom>}
          component3={
            <TextCustom align="center" bold>
              Status Akses
            </TextCustom>
          }
        />

        <Divider />

        <StackCustom>
          {_.isEmpty(listData) ? (
            <TextCustom align="center" color="gray" size={"small"}>
              Tidak ada data
            </TextCustom>
          ) : (
            listData?.map((item: any, index: number) => (
              <GridViewCustomSpan
                key={index}
                span1={2}
                span2={5}
                span3={5}
                component1={
                  <CenterCustom>
                    <Ionicons
                      onPress={() =>
                        router.push(`/admin/user-access/${item?.id}`)
                      }
                      name="open"
                      size={ICON_SIZE_XLARGE}
                      color={MainColor.yellow}
                    />
                  </CenterCustom>
                  // <ButtonCustom
                  //   onPress={() =>
                  //     router.push(`/admin/user-access/${item?.id}`)
                  //   }
                  // >
                  //   Detail
                  // </ButtonCustom>
                }
                component2={
                  <TextCustom bold truncate>
                    {item?.username || "-"}
                  </TextCustom>
                }
                component3={
                  <CenterCustom>
                    {item?.active ? (
                      <BadgeCustom color="green">Aktif</BadgeCustom>
                    ) : (
                      <BadgeCustom color="red">Tidak Aktif</BadgeCustom>
                    )}
                  </CenterCustom>
                }
                style3={{ alignItems: "center", justifyContent: "center" }}
              />
            ))
          )}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
