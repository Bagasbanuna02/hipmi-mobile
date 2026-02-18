import {
  AlertDefaultSystem,
  BoxButtonOnFooter,
  ButtonCustom,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import {
  apiAdminMasterDonationCategoryById,
  apiAdminMasterDonationCategoryUpdate,
} from "@/service/api-admin/api-master-admin";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "react-native-paper";

export default function AdminDonationCategoryUpdate() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [value, setValue] = useState(id);

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiAdminMasterDonationCategoryById({
        id: id as any,
      });

      setData(response.data);
    };
    fetchData();
  }, [id]);

  const handlerSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await apiAdminMasterDonationCategoryUpdate({
        id: id as any,
        data: data,
      });
      router.back();
    } catch (error) {
      console.log("Error update category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        disabled={isLoading || data?.name === ""}
        isLoading={isLoading}
        onPress={() => {
          AlertDefaultSystem({
            title: "Update Data",
            message: "Apakah anda yakin ingin mengupdate data ini?",
            textLeft: "Batal",
            textRight: "Ya",
            onPressLeft: () => {},
            onPressRight: () => handlerSubmit(),
          });
        }}
      >
        Update
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title="Ubah Kategori" />}
        footerComponent={buttonSubmit}
      >
        <TextInputCustom
          label="Nama Kategori"
          placeholder="Masukkan Kategori"
          value={data?.name}
          onChangeText={(value) => setData({ ...data, name: value })}
        />
        <StackCustom
          gap={"sm"}
          style={{
            alignContent: "flex-start",
          }}
        >
          <TextCustom>Status</TextCustom>

          <Switch
            style={{
              alignSelf: "flex-start",
            }}
            color={MainColor.yellow}
            value={data?.active}
            onValueChange={(value) => setData({ ...data, active: value })}
          />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
