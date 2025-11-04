/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  ButtonCustom,
  CenterCustom,
  LoaderCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { AccentColor, MainColor } from "@/constants/color-palet";
import { useAuth } from "@/hooks/use-auth";
import {
  apiEventConfirmationAction,
  apiEventGetConfirmation,
  apiEventJoin,
} from "@/service/api-client/api-event";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  Redirect,
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

// Extend Day.js dengan plugin isBetween
dayjs.extend(isBetween);

interface DataEvent {
  id: string;
  title: string;
  tanggal: Date;
  tanggalSelesai: Date;
  lokasi: string;
  Author: {
    id: string;
    username: string;
    Profile: {
      id: string;
      name: string;
    };
  };
}

export default function UserEventConfirmation() {
  const { token } = useAuth();
  const { id, userId: authorId } = useLocalSearchParams();
  const { user } = useAuth();
  const [data, setData] = useState<DataEvent | null>(null);
  const [peserta, setPeserta] = useState<boolean | null>(null);
  const [konfirmasi, setKonfirmasi] = useState<boolean | null>(null);

  useFocusEffect(
    useCallback(() => {
      checkTokenAndDataParticipants() || console.log("Token is null");
    }, [token, id, user?.id])
  );

  const checkTokenAndDataParticipants = async () => {
    if (!token) {
      return <Redirect href={`/`} />;
    }

    try {
      const response = await apiEventGetConfirmation({
        id: id as string,
        userId: user?.id as string,
      });

      if (response.success) {
        setData(response.data?.dataEvent);
        setPeserta(response.data?.peserta);
        setKonfirmasi(response.data?.kehadiran);
      }
    } catch (error) {
      console.log("[ERROR CONFIRMATION]", error);
    }
  };

  const handlerReturn = () => {
    const now = dayjs(); // asumsi: UTC, sesuai dengan API

    // --- [1] Loading & Data tidak ditemukan ---
    if (data === undefined || data === null) {
      if (peserta === null && konfirmasi === null) {
        return <LoaderCustom />;
      }
      return (
        <BaseBox>
          <TextCustom bold align="center" size={"large"}>
            Data Tidak Ditemukan
          </TextCustom>
          <BackToOtherPath path="home" />
        </BaseBox>
      );
    }

    // --- [2] Ambil waktu event dari `data` ---
    const eventStart = dayjs(data.tanggal);
    const eventEnd = dayjs(data.tanggalSelesai);

    // --- [3] Definisikan jendela konfirmasi: 1 jam sebelum mulai → 1 jam setelah selesai ---
    const confirmationStart = eventStart.subtract(1, "hour");
    const confirmationEnd = eventEnd.add(1, "hour");
    const isWithinConfirmationWindow = now.isBetween(
      confirmationStart,
      confirmationEnd,
      null,
      "[]"
    );

    // --- [4] Status waktu event (untuk pesan UI) ---
    const isBeforeEvent = now.isBefore(eventStart);
    const isAfterEvent = now.isAfter(eventEnd);
    const isDuringEvent = !isBeforeEvent && !isAfterEvent;

    // --- [5] Handle berdasarkan waktu dan status peserta/konfirmasi ---

    // 🟢 Acara sudah selesai
    if (isAfterEvent) {
      if (peserta === false) {
        return (
          <TamplateBox data={data}>
            <TamplateText text="Event telah selesai, sehingga konfirmasi kehadiran sudah tidak dapat dilakukan. Terima kasih atas perhatian dan minat Anda. Kami berharap dapat bertemu di acara kami berikutnya." />
            <BackToOtherPath
              path="event"
              id={data.id}
              isAfterEvent={isAfterEvent}
            />
          </TamplateBox>
        );
      }
      return (
        <TamplateBox data={data}>
          <TamplateText
            text={`Event telah selesai, anda terdaftar sebagai peserta dan ${
              konfirmasi
                ? "Anda telah mengonfirmasi kehadiran."
                : "Anda tidak mengonfirmasi kehadiran."
            } Terima kasih atas perhatian dan minat Anda. Kami berharap dapat bertemu di acara kami berikutnya.`}
          />
          <BackToOtherPath
            path="event"
            id={data.id}
            isAfterEvent={isAfterEvent}
          />
        </TamplateBox>
      );
    }

    // 🔵 Acara belum mulai & belum terdaftar
    if (isBeforeEvent) {
      if (peserta === false) {
        return (
          <NotStarted_And_UserNotParticipan
            id={data.id}
            userId={user?.id as string}
            data={data}
          />
        );
      }

      // Peserta sudah daftar → cek apakah sudah boleh konfirmasi
      if (isWithinConfirmationWindow && peserta === true) {
        if (konfirmasi === false) {
          return (
            <UserParticipan_And_DuringEvent
              id={data.id}
              userId={user?.id as string}
              data={data}
            />
          );
        }
        return (
          <TamplateBox data={data}>
            <TamplateText text="Terimakasih telah mengonfirmasi kehadiran. Silahkan lihat peserta lain pada halaman event atau kembali ke halaman home. Selamat menikmati acara dan selamat berpartisipasi." />
            <BackToOtherPath
              path="event"
              id={data.id}
              isAfterEvent={isAfterEvent}
            />
          </TamplateBox>
        );
      }

      return (
        <TamplateBox data={data}>
          <TamplateText text="Anda telah terdaftar sebagai peserta pada Event ini. Konfirmasi kehadiran dibuka 1 jam sebelum acara dimulai." />
          <BackToOtherPath
            path="event"
            id={data.id}
            isAfterEvent={isAfterEvent}
          />
        </TamplateBox>
      );
    }

    // 🟡 Acara sedang berlangsung & belum terdaftar
    if (isDuringEvent) {
      if (peserta === false) {
        return (
          <UserNotParticipan_And_DuringEvent
            id={data.id}
            userId={user?.id as string}
            data={data}
          />
        );
      }

      if (peserta === true) {
        if (isWithinConfirmationWindow) {
          if (konfirmasi === false) {
            return (
              <TamplateBox data={data}>
                <TamplateText text="Konfirmasi Kehadiran" />
              </TamplateBox>
            );
          }
          return (
            <TamplateBox data={data}>
              <TamplateText text="Anda telah mengonfirmasi kehadiran dalam event ini. Terima kasih dan selamat menikmati acara. Have fun!" />
              <BackToOtherPath
                path="event"
                id={data.id}
                isAfterEvent={isAfterEvent}
              />
            </TamplateBox>
          );
        }

        // Ini sangat jarang terjadi selama event berlangsung, tapi aman
        return (
          <TamplateBox data={data}>
            <TamplateText text="Konfirmasi kehadiran tidak tersedia saat ini." />
            <BackToOtherPath path="home" />
          </TamplateBox>
        );
      }
    }

    // 🛑 Fallback aman
    return (
      <BaseBox>
        <StackCustom>
          <TamplateText text="Terjadi kesalahan tak terduga pada logika waktu." />
          <BackToOtherPath path="home" />
        </StackCustom>
      </BaseBox>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Konfirmasi Event",
          // headerLeft: () => (
          //   <Ionicons
          //     name="arrow-back"
          //     size={20}
          //     color={MainColor.yellow}
          //     onPress={() =>
          //       router.navigate("/(application)/(user)/event/create")
          //     }
          //   />
          // ),
        }} 
      />
      <ViewWrapper>{handlerReturn()}</ViewWrapper>
    </>
  );
}

const TamplateBox = ({
  data,
  children,
}: {
  data: DataEvent;
  children: React.ReactNode;
}) => {
  return (
    <>
      <CenterCustom>
        <BaseBox>
          <StackCustom gap={"lg"}>
            <StackCustom gap={"sm"}>
              <TextCustom bold align="center" size={"large"}>
                {data?.title}
              </TextCustom>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  //   backgroundColor: AccentColor.blue,
                  //   borderColor: AccentColor.blue,
                  //   borderWidth: 1,
                  //   borderRadius: 4,
                  //   padding: 3
                }}
              >
                <TextCustom align="center" size="small" bold>
                  {dayjs(data?.tanggal).format("DD MMM YYYY: HH:mm")}
                </TextCustom>
                <TextCustom align="center" size="small" bold>
                  {" "}
                  -{" "}
                </TextCustom>
                <TextCustom align="center" size="small" bold>
                  {dayjs(data?.tanggalSelesai).format("DD MMM YYYY: HH:mm")}
                </TextCustom>
              </View>
            </StackCustom>

            {children}
          </StackCustom>
        </BaseBox>
      </CenterCustom>
    </>
  );
};

const TamplateText = ({ text }: { text: React.ReactNode }) => {
  return (
    <>
      <TextCustom align="center">{text}</TextCustom>
    </>
  );
};

type BackToOtherPathProps =
  | { path: "home" | "beranda-event"; id?: never; isAfterEvent?: never }
  | { path: "event"; id: string; isAfterEvent: boolean };

const BackToOtherPath = ({ path, id, isAfterEvent }: BackToOtherPathProps) => {
  return (
    <>
      {path === "home" ? (
        <ButtonCustom
          onPress={() => {
            router.replace("/(application)/home");
          }}
        >
          Home
        </ButtonCustom>
      ) : (
        <View
          style={{
            flexDirection: "row",
            gap: 10,

            justifyContent: "center",
          }}
        >
          <ButtonCustom
            onPress={() => {
              router.replace("/(application)/home");
            }}
          >
            Home
          </ButtonCustom>
          <ButtonCustom
            onPress={() => {
              if (path === "event") {
                if (isAfterEvent) {
                  router.push(`/(application)/(user)/event/${id}/history`);
                } else {
                  router.push(`/(application)/(user)/event/${id}/publish`);
                }
              } else if (path === "beranda-event") {
                router.push(`/(application)/(user)/event`);
              } else {
                console.log("[PATH]", path);
              }
            }}
          >
            Lihat {path === "event" ? "Event" : "Beranda Event"}
          </ButtonCustom>
        </View>
      )}
    </>
  );
};

// 🔵 Acara belum mulai & belum terdaftar
const NotStarted_And_UserNotParticipan = ({
  id,
  userId,
  data,
}: {
  id: string;
  userId: string;
  data: DataEvent;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlerJoinEvent = async () => {
    try {
      setIsLoading(true);

      const response = await apiEventJoin({
        id: id as string,
        userId: userId as string,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Anda gagal join",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Anda berhasil join",
      });
      router.navigate(`/(application)/(user)/event/${id}/publish`);
    } catch (error) {
      console.log("[ERROR JOIN EVENT]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TamplateBox data={data}>
        <TamplateText text="Anda belum terdaftar sebagai peserta & Event belum dimulai. Silahkan daftarkan diri anda terlebih dahulu" />
        <ButtonCustom onPress={handlerJoinEvent} isLoading={isLoading}>
          Join
        </ButtonCustom>
      </TamplateBox>
    </>
  );
};

// 🟡 ZONA ACARA BERLANGSUNG
// Acara sedang berlangsung & belum terdaftar & user harus join dan konfirmasi
const UserNotParticipan_And_DuringEvent = ({
  id,
  userId,
  data,
}: {
  id: string;
  userId: string;
  data: DataEvent;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlerSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await apiEventConfirmationAction({
        id: id as string,
        userId: userId as string,
        category: "join_and_confirm",
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Anda gagal join & konfirmasi",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Anda berhasil join & konfirmasi",
      });
      router.navigate(`/(application)/(user)/event/${id}/publish`);
    } catch (error) {
      console.log("[ERROR JOIN & CONFIRMATION EVENT]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TamplateBox data={data}>
        <TamplateText text="Anda belum terdaftar sebagai peserta & Event sedang berlangsung. Silahkan daftarkan diri anda & Konfirmasi kehadiran" />

        <ButtonCustom onPress={() => handlerSubmit()} isLoading={isLoading}>
          Join & Konfirmasi
        </ButtonCustom>
      </TamplateBox>
    </>
  );
};


// 🟡 ZONA ACARA BERLANGSUN
// User sudah terdaftar & Event sedang berlangsung & user harus konfirmasi
const UserParticipan_And_DuringEvent = ({
  id,
  userId,
  data,
}: {
  id: string;
  userId: string;
  data: DataEvent;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlerSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await apiEventConfirmationAction({
        id: id as string,
        userId: userId as string,
        category: "confirmation",
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Anda gagal konfirmasi",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Anda berhasil konfirmasi",
      });
      router.navigate(`/(application)/(user)/event/${id}/publish`);
    } catch (error) {
      console.log("[ERROR JOIN & CONFIRMATION EVENT]", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <TamplateBox data={data}>
        <TamplateText text="Anda sudah terdaftar sebagai peserta & Event sedang berlangsung. Silahkan konfirmasi kehadiran" />

        <ButtonCustom onPress={() => handlerSubmit()} isLoading={isLoading}>
          Konfirmasi
        </ButtonCustom>
      </TamplateBox>
    </>
  );
};
