/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDefaultSystem,
  BackButton,
  ButtonCustom,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  ViewWrapper,
} from "@/components";
import AppHeader from "@/components/_ShareComponent/AppHeader";
import { IMenuDrawerItem } from "@/components/_Interface/types";
import CustomSkeleton from "@/components/_ShareComponent/SkeletonCustom";
import LeftButtonCustom from "@/components/Button/BackButton";
import { useAuth } from "@/hooks/use-auth";
import Event_BoxDetailPublishSection from "@/screens/Event/BoxDetailPublishSection";
import { menuDrawerPublishEvent } from "@/screens/Event/menuDrawerPublish";
import {
  apiEventCheckParticipants,
  apiEventGetOne,
  apiEventJoin,
} from "@/service/api-client/api-event";
import dayjs from "dayjs";
import {
  Redirect,
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function EventDetailPublish() {
  const now = new Date().toISOString();
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);

  const [data, setData] = useState<any>();
  const [isParticipant, setIsParticipant] = useState<boolean | null>(null);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [])
  );

  async function onLoadData() {
    try {
      setIsLoadingData(true);
      const response = await apiEventGetOne({ id: id as string });
      if (response.success) {
        setData(response.data);

        const responseCheckParticipants = await apiEventCheckParticipants({
          id: id as string,
          userId: user?.id as string,
        });

        if (
          responseCheckParticipants.success &&
          responseCheckParticipants.data
        ) {
          setIsParticipant(true);
        }
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadingData(false);
    }
  }

  const handlePress = (item: IMenuDrawerItem) => {
    console.log("PATH ", item.path);
    router.navigate(item.path as any);
    setOpenDrawer(false);
  };

  const handlerJoin = async () => {
    const userId = user?.id;
    if (!userId) {
      return Toast.show({
        type: "error",
        text2: "Anda belum login",
      });
    }

    try {
      setIsLoadingJoin(true);
      const response = await apiEventJoin({
        id: id as string,
        userId: userId as string,
      });
      if (response.success) {
        router.navigate(
          `/(application)/(user)/event/${id}/list-of-participants`
        );
        Toast.show({
          type: "success",
          text1: "Anda berhasil join",
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoadingJoin(false);
    }
  };

  const isEventFinished =
    id && data?.tanggalSelesai && dayjs(data.tanggalSelesai).isBefore(now);

  useEffect(() => {
    if (isEventFinished) {
      router.replace(`/(application)/(user)/event/${id}/history`);
    }
  }, [isEventFinished, id]);

  if (isEventFinished) {
    return (
      <ViewWrapper>
        <CustomSkeleton />
      </ViewWrapper>
    );
  }

  const FooterButton = () => {
    return (
      <>
        <ButtonCustom
          disabled={isParticipant as any}
          isLoading={isLoadingJoin}
          backgroundColor="green"
          textColor="white"
          onPress={() =>
            AlertDefaultSystem({
              title: "Join event",
              message: "Anda yakin ingin join sebagai peserta event ?",
              textLeft: "Tidak",
              textRight: "Ya",
              onPressLeft: () => {},
              onPressRight: () => handlerJoin(),
            })
          }
        >
          {isParticipant ? "Anda sudah tergabung" : "Join"}
        </ButtonCustom>
      </>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <AppHeader
              title="Event Publish"
              left={<BackButton onPress={() => router.back()} />}
              right={<DotButton onPress={() => setOpenDrawer(true)} />}
            />
          ),
        }}
      />
      <ViewWrapper>
        {isLoadingData ? (
          <CustomSkeleton height={400} />
        ) : (
          <Event_BoxDetailPublishSection
            data={data}
            footerButton={FooterButton()}
          />
        )}
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={menuDrawerPublishEvent({ id: id as string })}
          columns={4}
          onPressItem={handlePress as any}
        />
      </DrawerCustom>
    </>
  );
}
