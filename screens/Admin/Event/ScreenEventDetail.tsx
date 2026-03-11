/* eslint-disable react-hooks/exhaustive-deps */
import { ActionIcon, AlertDefaultSystem, Spacing } from "@/components";
import { IconDot } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import NewWrapper from "@/components/_ShareComponent/NewWrapper";
import ReportBox from "@/components/Box/ReportBox";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import { funUpdateStatusEvent } from "@/screens/Admin/Event/funUpdateStatus";
import { apiAdminEventById } from "@/service/api-admin/api-admin-event";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { BoxEventDetail } from "./BoxEventDetail";
import { EventDetailDrawer } from "./EventDetailDrawer";
import { EventDetailQRCode } from "./EventDetailQRCode";
import { View } from "react-native";

export function Admin_ScreenEventDetail() {
  const { user } = useAuth();
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [loadData, setLoadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      setLoadData(true);
      const response = await apiAdminEventById({
        id: id as string,
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadData(false);
    }
  };

  const rightComponent = (
    <ActionIcon
      icon={<IconDot size={ICON_SIZE_BUTTON} />}
      onPress={() => {
        setOpenDrawer(true);
      }}
    />
  );

  const handlerSubmit = async () => {
    try {
      const response = await funUpdateStatusEvent({
        id: id as string,
        changeStatus: "publish",
        data: { catatan: "", senderId: user?.id as string },
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mempublikasikan event",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Event berhasil dipublikasikan",
      });
      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const headerComponent = useMemo(
    () => (
      <AdminBackButtonAntTitle
        title={`Detail Data`}
        rightComponent={
          status === "publish" || status === "history"
            ? rightComponent
            : undefined
        }
      />
    ),
    [status],
  );

  const footerComponent = useMemo(() => {
    if (status === "review") {
      return (
        <AdminButtonReview
          onPublish={() => {
            AlertDefaultSystem({
              title: "Publish",
              message: "Apakah anda yakin ingin mempublikasikan data ini?",
              textLeft: "Batal",
              textRight: "Ya",
              onPressRight: () => handlerSubmit(),
            });
          }}
          onReject={() => {
            router.push(`/admin/event/${id}/reject-input?status=${status}`);
          }}
        />
      );
    }

    if (status === "reject") {
      return (
        <AdminButtonReject
          title="Tambah Catatan"
          onReject={() => {
            router.push(`/admin/event/${id}/reject-input?status=${status}`);
          }}
        />
      );
    }

    return null;
  }, [status, id]);

  return (
    <>
      <NewWrapper
        headerComponent={headerComponent}
        // footerComponent={
        //   <View style={{ paddingInline: 8 }}>
        //     {footerComponent}
        //   </View>
        // }
      >
        <BoxEventDetail data={data} status={status as string} />

        {data?.catatan && (status === "reject" || status === "review") && (
          <ReportBox text={data.catatan} />
        )}

        {(status === "publish" || status === "history") && (
          <EventDetailQRCode userId={user?.id || ""} isLoading={loadData} />
        )}

        {footerComponent}
        <Spacing />
      </NewWrapper>

      <EventDetailDrawer
        isVisible={openDrawer}
        onClose={() => setOpenDrawer(false)}
        eventId={id as string}
      />
    </>
  );
}
