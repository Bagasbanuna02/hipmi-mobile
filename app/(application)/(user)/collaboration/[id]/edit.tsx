/* eslint-disable react-hooks/exhaustive-deps */
import {
  ButtonCustom,
  LoaderCustom,
  SelectCustom,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import {
  apiCollaborationEditData,
  apiCollaborationGetOne,
} from "@/service/api-client/api-collaboration";
import { apiMasterCollaborationType } from "@/service/api-client/api-master";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export default function CollaborationEdit() {
  const { id } = useLocalSearchParams();
  console.log("id :", id);
  const [data, setData] = useState<any>();
  const [listMaster, setListMaster] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoadingData(true);
          await onLoadData();
          await onLoadMaster();
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setLoadingData(false);
        }
      };
      fetchData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiCollaborationGetOne({ id: id as string });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  async function onLoadMaster() {
    try {
      const response = await apiMasterCollaborationType();
      setListMaster(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  }

  const handlerSubmitUpdate = async () => {
    if (
      !data?.title ||
      !data?.lokasi ||
      !data?.projectCollaborationMaster_IndustriId ||
      !data?.purpose ||
      !data?.benefit
    ) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Harap isi semua data",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await apiCollaborationEditData({
        id: id as string,
        data: data,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        router.back();
      } else {
        Toast.show({
          type: "error",
          text1: response.message,
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
      {loadingData ? (
        <LoaderCustom />
      ) : (
        <StackCustom gap={"xs"}>
          <TextInputCustom
            label="Judul"
            placeholder="Masukan judul"
            required
            value={data?.title}
            onChangeText={(value) => setData({ ...data, title: value })}
          />
          <TextInputCustom
            label="Lokasi"
            placeholder="Masukan lokasi"
            required
            value={data?.lokasi}
            onChangeText={(value) => setData({ ...data, lokasi: value })}
          />
          <SelectCustom
            label="Pilih Industri"
            data={listMaster?.map((item: any) => ({
              label: item.name,
              value: item.id,
            }))}
            value={data?.projectCollaborationMaster_IndustriId}
            onChange={(value) =>
              setData({ ...data, projectCollaborationMaster_IndustriId: value })
            }
          />

          <TextAreaCustom
            required
            label="Tujuan Proyek"
            placeholder="Masukan tujuan proyek"
            showCount
            maxLength={1000}
            value={data?.purpose}
            onChangeText={(value) => setData({ ...data, purpose: value })}
          />

          <TextAreaCustom
            required
            label="Keuntungan Proyek"
            placeholder="Masukan keuntungan proyek"
            showCount
            maxLength={1000}
            value={data?.benefit}
            onChangeText={(value) => setData({ ...data, benefit: value })}
          />

          <ButtonCustom
            isLoading={isLoading}
            title="Update"
            onPress={() => {
              handlerSubmitUpdate();
            }}
          />
        </StackCustom>
      )}
    </ViewWrapper>
  );
}
