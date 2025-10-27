/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  BoxButtonOnFooter,
  ButtonCustom,
  CenterCustom,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import DateTimePickerCustom from "@/components/DateInput/DateTimePickerCustom";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_XLARGE } from "@/constants/constans-value";
import {
  apiVotingGetOne,
  apiVotingUpdateData,
} from "@/service/api-client/api-voting";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

interface IEditData {
  title?: string;
  deskripsi?: string;
  awalVote?: string;
  akhirVote?: string;
  Voting_DaftarNamaVote?: [
    {
      value?: string;
    }
  ];
}

export default function VotingEdit() {
  const { id } = useLocalSearchParams();
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [data, setData] = useState<IEditData>();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      setLoadingGetData(true);
      const response = await apiVotingGetOne({ id: id as string });

      if (response.success) {
        const data = response.data;
        setData({
          title: data.title,
          deskripsi: data.deskripsi,
          awalVote: data.awalVote,
          akhirVote: data.akhirVote,
          Voting_DaftarNamaVote: data.Voting_DaftarNamaVote,
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingGetData(false);
    }
  };

  const validateDateRange = ({
    selectedStratDate,
    selectedEndDate,
  }: {
    selectedStratDate: string | Date;
    selectedEndDate: string | Date;
  }): { isValid: boolean; error?: string } => {
    const startDate = new Date(selectedStratDate);
    const endDate = new Date(selectedEndDate);

    // Cek apakah tanggal valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return {
        isValid: false,
        error: "Invalid date provided",
      };
    }

    if (startDate >= endDate) {
      return {
        isValid: false,
        error: "Ubah tanggal berakhirnya event",
      };
    }

    return {
      isValid: true,
      error: undefined,
    };
  };

  const validateForm = async () => {
    if (!data?.title || !data?.deskripsi) {
      Toast.show({
        type: "info",
        text1: "Lengkapi semua data",
      });
      return false;
    }

    if (data?.Voting_DaftarNamaVote?.some((item: any) => item.value === "")) {
      Toast.show({
        type: "info",
        text1: "Isi semua data pilihan",
      });
      return false;
    }

    const startDate = new Date(data?.awalVote as any);
    const endDate = new Date(data?.akhirVote as any);

    if (startDate >= endDate) {
      Toast.show({
        type: "info",
        text1: "Ubah tanggal berakhirnya event",
      });
      return false;
    }

    return true;
  };

  const handlerUpdateSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      setIsLoading(true);
      const newData = {
        ...data,
        awalVote: new Date(data?.awalVote as any).toISOString(),
        akhirVote: new Date(data?.akhirVote as any).toISOString(),
        listVote: data?.Voting_DaftarNamaVote?.map((item: any) => item.value),
      };

      const response = await apiVotingUpdateData({
        id: id as string,
        data: newData,
        category: "edit",
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        return router.back();
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

  const buttonSubmit = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom
            isLoading={isLoading}
            onPress={() => handlerUpdateSubmit()}
          >
            Update
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  };

  return (
    <ViewWrapper footerComponent={buttonSubmit()}>
      {loadingGetData ? (
        <LoaderCustom />
      ) : (
        <StackCustom gap={"xs"}>
          <TextInputCustom
            label="Judul Voting"
            placeholder="MasukanJudul Voting"
            required
            value={data?.title}
            onChangeText={(text) => setData({ ...data, title: text })}
          />
          <TextAreaCustom
            label="Deskripsi"
            placeholder="Masukan Deskripsi"
            required
            showCount
            maxLength={1000}
            value={data?.deskripsi}
            onChangeText={(text) => setData({ ...data, deskripsi: text })}
          />

          <Spacing />

          <DateTimePickerCustom
            minimumDate={new Date(Date.now())}
            label="Mulai Voting"
            required
            value={new Date(data?.awalVote as any)}
            onChange={(date: any) => {
              setData({ ...data, awalVote: date });
            }}
          />

          <StackCustom gap={0}>
            <DateTimePickerCustom
              minimumDate={new Date(data?.awalVote as any)}
              label="Voting Berakhir"
              required
              value={new Date(data?.akhirVote as any)}
              onChange={(date: any) => {
                setData({ ...data, akhirVote: date });
              }}
            />

            {validateDateRange({
              selectedStratDate: data?.awalVote as any,
              selectedEndDate: data?.akhirVote as any,
            }).isValid ? (
              <TextCustom style={{ color: "green" }}>
                {
                  validateDateRange({
                    selectedStratDate: data?.awalVote as any,
                    selectedEndDate: data?.akhirVote as any,
                  }).error
                }
              </TextCustom>
            ) : (
              <TextCustom style={{ color: "red" }}>
                {
                  validateDateRange({
                    selectedStratDate: data?.awalVote as any,
                    selectedEndDate: data?.akhirVote as any,
                  }).error
                }
              </TextCustom>
            )}
            <Spacing />
          </StackCustom>

          {data?.Voting_DaftarNamaVote?.map((item: any, index: number) => (
            <TextInputCustom
              key={index}
              label="Pilihan"
              placeholder="Masukan Pilihan"
              required
              value={item.value}
              onChangeText={(value: any) =>
                setData({
                  ...(data as any),
                  Voting_DaftarNamaVote: data?.Voting_DaftarNamaVote?.map(
                    (item: any, i: any) =>
                      i === index ? { ...item, value } : item
                  ),
                })
              }
            />
          ))}

          <CenterCustom>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <ActionIcon
                disabled={(data as any)?.Voting_DaftarNamaVote?.length >= 4}
                onPress={() => {
                  setData({
                    ...(data as any),
                    Voting_DaftarNamaVote: [
                      ...(data as any)?.Voting_DaftarNamaVote,
                      { value: "" },
                    ],
                  });
                }}
                icon={
                  <Ionicons
                    name="add-circle-outline"
                    size={ICON_SIZE_XLARGE}
                    color={MainColor.black}
                  />
                }
                size="xl"
              />
              <ActionIcon
                disabled={
                  ((data as any)?.Voting_DaftarNamaVote?.length as any) <= 2
                }
                onPress={() => {
                  const list = _.clone((data as any)?.Voting_DaftarNamaVote);
                  list.pop();
                  setData({
                    ...(data as any),
                    Voting_DaftarNamaVote: list,
                  });
                }}
                icon={
                  <Ionicons
                    name="remove-circle-outline"
                    size={ICON_SIZE_XLARGE}
                    color={MainColor.black}
                  />
                }
                size="xl"
              />
            </View>
          </CenterCustom>
          <Spacing />
        </StackCustom>
      )}
    </ViewWrapper>
  );
}
