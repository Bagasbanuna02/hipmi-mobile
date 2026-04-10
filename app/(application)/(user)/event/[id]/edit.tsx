/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCustom,
  LoaderCustom,
  OS_Wrapper,
  SelectCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
} from "@/components";
import ListSkeletonComponent from "@/components/_ShareComponent/ListSkeletonComponent";
import DateTimePickerCustom from "@/components/DateInput/DateTimePickerCustom";
import {
  apiEventGetOne,
  apiEventUpdateData,
} from "@/service/api-client/api-event";
import { apiMasterEventType } from "@/service/api-client/api-master";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function EventEdit() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>();
  //   {
  //   title: "",
  //   lokasi: "",
  //   deskripsi: "",
  //   eventMaster_TipeAcaraId: "",
  //   tanggal: "",
  //   tanggalSelesai: "",
  //   authorId: "",
  // }
  const [listTypeEvent, setListTypeEvent] = useState([]);
  const [selectedDate, setSelectedDate] = useState<
    Date | DateTimePickerEvent | null
  >();

  const [selectedEndDate, setSelectedEndDate] = useState<
    Date | DateTimePickerEvent | null
  >();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id]),
  );

  async function onLoadData() {
    try {
      setIsLoadData(true);
      const response = await apiEventGetOne({ id: id as string });

      if (response.success) {
        setData(response.data);
        setSelectedDate(new Date(response.data.tanggal));
        setSelectedEndDate(new Date(response.data.tanggalSelesai));
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadData(false);
    }
  }

  useEffect(() => {
    onLoadMasterEventType();
  }, []);

  const onLoadMasterEventType = async () => {
    try {
      const response = await apiMasterEventType();
      setListTypeEvent(response.data);
    } catch (error) {
      console.log("Error onLoadMasterEventType", error);
    }
  };

  const validateDate = async () => {
    if (
      data?.title === "" ||
      data?.lokasi === "" ||
      data?.deskripsi === "" ||
      data?.eventMaster_TipeAcaraId === ""
    ) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Lengkapi semua data",
      });

      return false;
    }

    const startDate = new Date(selectedDate as any);
    const endDate = new Date(selectedEndDate as any);

    if (!startDate) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Tanggal mulai tidak valid",
      });
      return false;
    }

    if (startDate >= endDate) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Ubah tanggal berakhirnya event",
      });

      return false;
    }

    return true;
  };

  const handlerSubmit = async () => {
    const isValid = await validateDate();
    if (!isValid) return;

    try {
      setIsLoading(true);
      const newData = {
        ...data,
        tanggal: new Date(selectedDate as any).toISOString(),
        tanggalSelesai: new Date(selectedEndDate as any).toISOString(),
      };

      const response = await apiEventUpdateData({
        id: id as string,
        data: newData,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: response.message,
        });
        return router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateDateRange = (
    selectedDate: string | Date,
    selectedEndDate: string | Date,
  ): { isValid: boolean; error?: string } => {
    const startDate = new Date(selectedDate);
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

  return (
    <>
      <OS_Wrapper
        enableKeyboardHandling
        contentPaddingBottom={250}
        footerComponent={
          <BoxButtonOnFooter>
            <ButtonCustom
              isLoading={isLoading}
              title="Update"
              onPress={handlerSubmit}
            />
          </BoxButtonOnFooter>
        }
      >
        {isLoadData ? (
          <ListSkeletonComponent />
        ) : (
          <StackCustom gap={"xs"}>
            <TextInputCustom
              placeholder="Masukkan nama event"
              label="Nama Event"
              required
              value={data?.title}
              onChangeText={(value) => setData({ ...data, title: value })}
            />
            <TextAreaCustom
              label="Deskripsi"
              placeholder="Masukkan deskripsi event"
              required
              showCount
              value={data?.deskripsi}
              onChangeText={(value) => setData({ ...data, deskripsi: value })}
            />

            <DateTimePickerCustom
              minimumDate={new Date(Date.now())}
              label="Tanggal & Waktu Mulai"
              required
              value={selectedDate}
              onChange={(date: any) => {
                setSelectedDate(date as any);
              }}
            />
            <StackCustom gap={0}>
              <DateTimePickerCustom
                minimumDate={selectedDate as any}
                label="Tanggal & Waktu Berakhir"
                required
                value={selectedEndDate as any}
                onChange={(date: any) => {
                  setSelectedEndDate(date as any);
                }}
              />

              {/* Muncul */}
              {validateDateRange(selectedDate as any, selectedEndDate as any)
                .isValid ? (
                <TextCustom style={{ color: "green" }}>
                  {
                    validateDateRange(
                      selectedDate as any,
                      selectedEndDate as any,
                    ).error
                  }
                </TextCustom>
              ) : (
                <TextCustom style={{ color: "red" }}>
                  {
                    validateDateRange(
                      selectedDate as any,
                      selectedEndDate as any,
                    ).error
                  }
                </TextCustom>
              )}
              {/* <Spacing /> */}
            </StackCustom>

            <SelectCustom
              label="Tipe Event"
              placeholder="Pilih tipe event"
              data={listTypeEvent.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))}
              value={data?.eventMaster_TipeAcaraId || ""}
              onChange={(value) => {
                console.log(value);
                setData({ ...data, eventMaster_TipeAcaraId: value });
              }}
            />
            <TextInputCustom
              label="Lokasi"
              placeholder="Masukkan lokasi event"
              required
              value={data?.lokasi}
              onChangeText={(value) => setData({ ...data, lokasi: value })}
            />
          </StackCustom>
        )}
      </OS_Wrapper>
    </>
  );
}
