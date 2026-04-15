/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCustom,
  LoaderCustom,
  OS_Wrapper,
  StackCustom,
  TextCustom,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { useAuth } from "@/hooks/use-auth";
import {
  apiAdminUserAccessGetById,
  apiAdminUserAccessUpdateStatus,
} from "@/service/api-admin/api-admin-user-access";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import Toast from "react-native-toast-message";

export function Admin_ScreenSuperAdminDetail() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [loadData, setLoadData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminUserAccessGetById({ id: id as string });

      setData(response.data);
    } catch (error) {
      console.log("[ERROR LOAD DATA]", error);
    } finally {
      setLoadData(false);
    }
  };

  const handlerSubmit = async () => {
    if (!user?.id) {
      Toast.show({
        type: "error",
        text1: "User tidak ditemukan",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await apiAdminUserAccessUpdateStatus({
        id: id as string,
        role: data?.masterUserRoleId === "2" ? "user" : "admin",
        category: "role",
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Update role gagal",
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: "Update role berhasil",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR UPDATE STATUS]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <OS_Wrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail User`} />}
        footerComponent={
          data && (
            <BoxButtonOnFooter>
              <ButtonCustom
                isLoading={isLoading}
                backgroundColor={
                  data?.masterUserRoleId === "2" ? "red" : "green"
                }
                textColor={"white"}
                onPress={handlerSubmit}
              >
                {data?.masterUserRoleId === "2"
                  ? "Hapus akses admin"
                  : "Tambah sebagai admin"}
              </ButtonCustom>
            </BoxButtonOnFooter>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={loadData}
            onRefresh={onLoadData}
            tintColor="#E1B525"
            colors={["#E1B525"]}
          />
        }
      >
        {loadData ? (
          <LoaderCustom />
        ) : (
          <StackCustom>
            {listData(data && data)?.map((item: any, index: number) => (
              <GridTwoView
                key={index}
                spanLeft={4}
                spanRight={8}
                leftItem={<TextCustom bold>{item?.label}</TextCustom>}
                rightItem={<TextCustom>{item?.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        )}
      </OS_Wrapper>
    </>
  );
}

const listData = (data: any) => [
  {
    label: "Username",
    value: (data && data?.username) || "-",
  },
  {
    label: "Role",
    value: data && data?.masterUserRoleId === "2" ? "Admin" : "User",
  },
  {
    label: "Nomor",
    value: (data && `+${data?.nomor}`) || "-",
  },
];
