import {
  ButtonCustom,
  LoaderCustom,
  SelectCustom,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { useAuth } from "@/hooks/use-auth";
import { apiCollaborationCreate } from "@/service/api-client/api-collaboration";
import { apiMasterCollaborationType } from "@/service/api-client/api-master";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

interface CollaborationCreateProps {
  title?: string;
  lokasi?: string;
  purpose?: string;
  benefit?: string;
  projectCollaborationMaster_IndustriId?: string;
  userId?: string;
}

export default function CollaborationCreate() {
  const { user } = useAuth();
  const [listMaster, setListMaster] = useState<any>([]);
  const [loadingMaster, setLoadingMaster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = React.useState<CollaborationCreateProps>({
    title: "",
    lokasi: "",
    purpose: "",
    benefit: "",
    projectCollaborationMaster_IndustriId: "",
    userId: "",
  });

  useEffect(() => {
    onLoadMaster();
  }, []);

  async function onLoadMaster() {
    try {
      setLoadingMaster(true);
      const response = await apiMasterCollaborationType();
      setListMaster(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingMaster(false);
    }
  }

  const handlerSubmit = async () => {
    if (
      !data?.title ||
      !data?.lokasi ||
      !data?.purpose ||
      !data?.benefit ||
      !data?.projectCollaborationMaster_IndustriId
    ) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Harap isi semua data",
      });
      return;
    }

    const newData: CollaborationCreateProps = {
      title: data?.title,
      lokasi: data?.lokasi,
      purpose: data?.purpose,
      benefit: data?.benefit,
      projectCollaborationMaster_IndustriId:
        data?.projectCollaborationMaster_IndustriId,
      userId: user?.id,
    };

    try {
      setIsLoading(true);

      const response = await apiCollaborationCreate({ data: newData });
      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: response.message,
        });
        router.back();
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: response.message,
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewWrapper>
      {loadingMaster ? (
        <LoaderCustom />
      ) : (
        <StackCustom gap={"xs"}>
          <TextInputCustom
            label="Judul"
            placeholder="Masukan judul"
            required
            value={data?.title}
            onChangeText={(value: any) => setData({ ...data, title: value })}
          />

          <TextInputCustom
            label="Lokasi"
            placeholder="Masukan lokasi"
            required
            value={data?.lokasi}
            onChangeText={(value: any) => setData({ ...data, lokasi: value })}
          />

          <SelectCustom
            label="Pilih Industri"
            data={listMaster?.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))}
            value={data?.projectCollaborationMaster_IndustriId}
            onChange={(value: any) => {
              console.log(value);
              setData({
                ...data,
                projectCollaborationMaster_IndustriId: value,
              });
            }}
          />

          <TextAreaCustom
            required
            label="Tujuan Proyek"
            placeholder="Masukan tujuan proyek"
            showCount
            maxLength={1000}
            value={data?.purpose}
            onChangeText={(value: any) => setData({ ...data, purpose: value })}
          />

          <TextAreaCustom
            required
            label="Keuntungan Proyek"
            placeholder="Masukan keuntungan proyek"
            showCount
            maxLength={1000}
            value={data?.benefit}
            onChangeText={(value: any) => setData({ ...data, benefit: value })}
          />

          <ButtonCustom
            isLoading={isLoading}
            title="Simpan"
            onPress={() => handlerSubmit()}
          />
        </StackCustom>
      )}
    </ViewWrapper>
  );
}
