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
import Toast from "react-native-toast-message";

export default function AdminUserAccessDetail() {
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
      console.log("[DATA]", JSON.stringify(response.data, null, 2));

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
        active: !data?.active,
        category: "access",
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Update aktifasi gagal",
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: "Update aktifasi berhasil ",
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
                backgroundColor={data?.active ? "red" : "green"}
                textColor={"white"}
                onPress={handlerSubmit}
              >
                {data?.active ? "Hapus Akses" : "Berikan Akses"}
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
    label: "Aktivasi",
    value: data && data?.active ? "Aktif" : "Tidak Aktif",
  },
  {
    label: "Nomor",
    value: (data && `+${data?.nomor}`) || "-",
  },
];
