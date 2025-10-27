/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCustom,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import {
  apiAdminUserAccessGetById,
  apiAdminUserAccessUpdateStatus,
} from "@/service/api-admin/api-admin-user-access";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function SuperAdminDetail() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [loadData, setLoadData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
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
    try {
      setLoading(true);
      const response = await apiAdminUserAccessUpdateStatus({
        id: id as string,
        role: data?.masterUserRoleId === "2" ? "user" : "admin",
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
        text1: "Update role berhasil ",
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
      <ViewWrapper
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
                leftIcon={<TextCustom bold>{item?.label}</TextCustom>}
                rightIcon={<TextCustom>{item?.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        )}
      </ViewWrapper>
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
