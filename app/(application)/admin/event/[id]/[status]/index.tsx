/* eslint-disable react-hooks/exhaustive-deps */
import {
    ActionIcon,
    AlertDefaultSystem,
    BadgeCustom,
    BaseBox,
    DrawerCustom,
    LoaderCustom,
    MenuDrawerDynamicGrid,
    Spacing,
    StackCustom,
    TextCustom,
    ViewWrapper,
} from "@/components";
import { IconDot, IconList } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import ReportBox from "@/components/Box/ReportBox";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import { funUpdateStatusEvent } from "@/screens/Admin/Event/funUpdateStatus";
import { apiAdminEventById } from "@/service/api-admin/api-admin-event";
import { DEEP_LINK_URL } from "@/service/api-config";
import { colorBadgeStatus } from "@/utils/colorBadge";
import { dateTimeView } from "@/utils/dateTimeView";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React, { useCallback } from "react";
import QRCode from "react-native-qrcode-svg";
import Toast from "react-native-toast-message";

export default function AdminEventDetail() {
  const { user } = useAuth();
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [data, setData] = React.useState<any | null>(null);
  const [loadData, setLoadData] = React.useState(false);
  const deepLinkURL = `${DEEP_LINK_URL}/event/${id}/confirmation?userId=${user?.id}`;
  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
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

  const listData = [
    {
      label: "Pembuat Event",
      value: (data && data?.Author?.username) || "-",
    },
    {
      label: "Judul Event",
      value: (data && data?.title) || "-",
    },
    {
      label: "Status",
      value:
        (data && (
          <BadgeCustom color={colorBadgeStatus({ status: status as string })}>
            {_.startCase(status as string)}
          </BadgeCustom>
        )) ||
        "-",
    },
    {
      label: "Lokasi",
      value: (data && data?.lokasi) || "-",
    },
    {
      label: "Tipe Acara",
      value: (data && data?.EventMaster_TipeAcara?.name) || "-",
    },
    {
      label: "Mulai Event",
      value:
        (data && data?.tanggal && dateTimeView({ date: data?.tanggal })) || "-",
    },
    {
      label: "Event Berakhir",
      value:
        (data &&
          data?.tanggalSelesai &&
          dateTimeView({ date: data?.tanggalSelesai })) ||
        "-",
    },
    {
      label: "Deskripsi",
      value: (data && data?.deskripsi) || "-",
    },
  ];

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

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title={`Detail Data`}
            rightComponent={
              (status === "publish" || status === "history") && rightComponent
            }
          />
        }
      >
        <BaseBox>
          <StackCustom>
            {listData.map((item, i) => (
              <GridDetail_4_8
                key={i}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>

          <Spacing />
        </BaseBox>

        {data &&
          data?.catatan &&
          (status === "reject" || status === "review") && (
            <ReportBox text={data?.catatan} />
          )}

        {(status === "publish" || status === "history") && (
          <BaseBox>
            <StackCustom style={{ alignItems: "center" }}>
              <TextCustom bold>QR Code Event</TextCustom>
              {loadData ? (
                <LoaderCustom />
              ) : (
                <QRCode
                  value={deepLinkURL}
                  size={200}
                  // logo={require("@/assets/images/logo-hipmi.png")}
                  // logoSize={70}
                  // logoBackgroundColor="transparent"
                  // logoBorderRadius={50}
                  // color="black"
                />
              )}
            </StackCustom>
          </BaseBox>
        )}

        {status === "review" && (
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
        )}

        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/event/${id}/reject-input?status=${status}`);
            }}
          />
        )}
        <Spacing />
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Daftar Peserta",
              icon: <IconList />,
              path: `/admin/event/${id}/list-of-participants`,
            },
          ]}
          onPressItem={(item) => {
            setOpenDrawer(false);
            router.push(item.path as any);
          }}
        />
      </DrawerCustom>
    </>
  );
}
