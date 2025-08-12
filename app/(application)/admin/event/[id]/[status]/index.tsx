import {
  ActionIcon,
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  DrawerCustom,
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
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React from "react";
import QRCode from "react-native-qrcode-svg";

export default function AdminEventDetail() {
  const { id, status } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const colorBadge = () => {
    if (status === "publish") {
      return MainColor.green;
    } else if (status === "review") {
      return MainColor.orange;
    } else if (status === "reject") {
      return MainColor.red;
    } else {
      return MainColor.placeholder;
    }
  };

  const listData = [
    {
      label: "Pembuat Event",
      value: `Bagas Banuna ${id}`,
    },
    {
      label: "Judul Event",
      value: `Event 123`,
    },
    {
      label: "Status",
      value: (
        <BadgeCustom color={colorBadge()}>
          {_.startCase(status as string)}
        </BadgeCustom>
      ),
    },
    {
      label: "Lokasi",
      value: "Lokasi Event",
    },
    {
      label: "Tipe Acara",
      value: "Tipe Acara",
    },
    {
      label: "Mulai Event",
      value: dayjs().format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      label: "Event Berakhir",
      value: dayjs().add(3, "day").format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      label: "Deskripsi",
      value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    // {
    //   label: "Daftar Tipe Acara",
    //   value: (
    //     <>
    //       <List.Item
    //         title={<TextCustom>Pilihan 1</TextCustom>}
    //         left={(props) => (
    //           <List.Icon {...props} icon="circle" color={MainColor.yellow} />
    //         )}
    //       />
    //       <List.Item
    //         title={<TextCustom>Pilihan 2</TextCustom>}
    //         left={(props) => (
    //           <List.Icon {...props} icon="circle" color={MainColor.yellow} />
    //         )}
    //       />
    //       <List.Item
    //         title={<TextCustom>Pilihan 3</TextCustom>}
    //         left={(props) => (
    //           <List.Icon {...props} icon="circle" color={MainColor.yellow} />
    //         )}
    //       />
    //       <List.Item
    //         title={<TextCustom>Pilihan 4</TextCustom>}
    //         left={(props) => (
    //           <List.Icon {...props} icon="circle" color={MainColor.yellow} />
    //         )}
    //       />
    //     </>
    //   ),
    // },
  ];

  const rightComponent = (
    <ActionIcon
      icon={<IconDot size={ICON_SIZE_BUTTON} />}
      onPress={() => {
        setOpenDrawer(true);
      }}
    />
  );

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title={`Detail Data`}
            rightComponent={
              (status === "publish" || status === "riwayat") && rightComponent
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
        {(status === "publish" || status === "riwayat") && (
          <BaseBox>
            <StackCustom style={{ alignItems: "center" }}>
              <TextCustom bold>QR Code Event</TextCustom>
              <QRCode
                value="https://google.com"
                size={200}
                // logo={require("@/assets/images/logo-hipmi.png")}
                // logoSize={70}
                // logoBackgroundColor="transparent"
                // logoBorderRadius={50}
                // color="black"
              />
            </StackCustom>
          </BaseBox>
        )}

        {status === "review" && (
          <AdminButtonReview
            onPublish={() => {
              AlertDefaultSystem({
                title: "Publish",
                message: "Apakah anda yakin ingin mempublikasikan data ini?",
                textLeft: "Cancel",
                textRight: "Publish",
                onPressLeft: () => {
                  router.back();
                },
                onPressRight: () => {
                  router.back();
                },
              });
            }}
            onReject={() => {
              router.push(`/admin/event/${id}/reject-input`);
            }}
          />
        )}

        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/event/${id}/reject-input`);
            }}
          />
        )}
        <Spacing />
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
