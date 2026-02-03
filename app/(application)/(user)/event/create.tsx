import {
  BoxButtonOnFooter,
  ButtonCustom,
  NewWrapper,
  SelectCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
} from "@/components";
import DateTimePickerCustom from "@/components/DateInput/DateTimePickerCustom";
import { useAuth } from "@/hooks/use-auth";
import { apiEventCreate } from "@/service/api-client/api-event";
import { apiMasterEventType } from "@/service/api-client/api-master";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

interface EventCreateProps {
  title?: string;
  lokasi?: string;
  deskripsi?: string;
  eventMaster_TipeAcaraId?: string;
  tanggal?: string;
  tanggalSelesai?: string;
  authorId?: string;
}

export default function EventCreate() {
  const [data, setData] = useState<EventCreateProps>();
  const [listTypeEvent, setListTypeEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

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

  const [selectedDate, setSelectedDate] = useState<
    Date | DateTimePickerEvent | null
  >(null);

  const [selectedEndDate, setSelectedEndDate] = useState<
    Date | DateTimePickerEvent | null
  >(null);

  const handlerSubmit = async () => {
    if (
      !data?.title ||
      !data?.lokasi ||
      !data?.deskripsi ||
      !data?.eventMaster_TipeAcaraId
    ) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Lengkapi semua data",
      });
      return;
    }

    if (!selectedDate || !selectedEndDate) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Pilih tanggal mulai dan berakhir",
      });
      return;
    }

    try {
      setIsLoading(true);

      const newData = {
        ...data,
        tanggal: new Date(selectedDate as any).toISOString(),
        tanggalSelesai: new Date(selectedEndDate as any).toISOString(),
        authorId: user?.id,
      };

      console.log("Data berhasil disimpan", JSON.stringify(newData, null, 2));

      const response = await apiEventCreate(newData);
      console.log("Response", JSON.stringify(response, null, 2));

      router.replace("/event/status?status=review");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = (
    <ButtonCustom
      isLoading={isLoading}
      title="Simpan"
      onPress={handlerSubmit}
    />
  );

  return (
    <>
      <NewWrapper
        footerComponent={<BoxButtonOnFooter>{buttonSubmit}</BoxButtonOnFooter>}
      >
        <StackCustom gap={"xs"}>
          <TextInputCustom
            placeholder="Masukkan nama event"
            label="Nama Event"
            required
            onChangeText={(value: any) => setData({ ...data, title: value })}
          />

          <TextAreaCustom
            label="Deskripsi"
            placeholder="Masukkan deskripsi event"
            required
            showCount
            value={data?.deskripsi || ""}
            onChangeText={(value: any) =>
              setData({ ...data, deskripsi: value })
            }
          />

          <DateTimePickerCustom
            label="Tanggal & Waktu Mulai"
            required
            onChange={(date: Date) => {
              setSelectedDate(date as any);
            }}
            value={selectedDate as any}
            minimumDate={new Date(Date.now())}
          />

          <StackCustom gap={0}>
            <DateTimePickerCustom
              disabled={!selectedDate}
              label="Tanggal & Waktu Berakhir"
              required
              onChange={(date: Date) => {
                setSelectedEndDate(date as any);
              }}
              value={selectedEndDate as any}
              minimumDate={new Date(selectedDate as any)}
            />
            {!selectedDate && (
              <TextCustom color="gray" size={"small"}>
                Note: Pilih tanggal mulai terlebih dahulu
              </TextCustom>
            )}
            <Spacing />
            <SelectCustom
              label="Tipe Event"
              placeholder="Pilih tipe event"
              data={listTypeEvent.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))}
              value={data?.eventMaster_TipeAcaraId || null}
              onChange={(value: any) =>
                setData({ ...data, eventMaster_TipeAcaraId: value })
              }
            />

            <TextInputCustom
              label="Lokasi"
              placeholder="Masukkan lokasi event"
              required
              onChangeText={(value: any) => setData({ ...data, lokasi: value })}
            />
          </StackCustom>
        </StackCustom>
      </NewWrapper>
    </>
  );
}
