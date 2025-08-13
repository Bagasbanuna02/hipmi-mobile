import {
  ActionIcon,
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  ButtonCustom,
  DrawerCustom,
  DummyLandscapeImage,
  MenuDrawerDynamicGrid,
  ProgressCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import { IconProspectus } from "@/components/_Icon";
import { IconDot, IconList } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React from "react";

export default function AdminInvestmentDetail() {
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
      label: "Username",
      value: `Bagas Banuna ${id}`,
    },
    {
      label: "Judul",
      value: `Donasi Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
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
      label: "Dana Dibutuhkan",
      value: "Rp 10.000.000",
    },
    {
      label: "Harga Perlembar",
      value: "Rp 2500",
    },
    {
      label: "Total Lembar",
      value: "2490 lembar",
    },
    {
      label: "ROI",
      value: "4 %",
    },
    {
      label: "Pembagian Deviden",
      value: "3 bulan",
    },
    {
      label: "Jadwal Pembagian",
      value: "Selamanya",
    },
    {
      label: "Pencarian Investor",
      value: "30 Hari",
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

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title={`Detail Data`}
            rightComponent={status === "publish" && rightComponent}
          />
        }
      >
        {status === "publish" && (
          <BaseBox>
            <ProgressCustom size="lg" />
            <Spacing />
            <StackCustom gap={"xs"}>
              <GridDetail_4_8
                label={<TextCustom bold>Sisa Saham</TextCustom>}
                value={<TextCustom>2490 lembar</TextCustom>}
              />
              <GridDetail_4_8
                label={<TextCustom bold>Validasi Transaksi</TextCustom>}
                value={<TextCustom>4 Transaksi</TextCustom>}
              />
            </StackCustom>
          </BaseBox>
        )}

        <BaseBox>
          <StackCustom>
            <DummyLandscapeImage />
            {listData.map((item, i) => (
              <GridDetail_4_8
                key={i}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>

        <BaseBox>
          <StackCustom>
            <GridDetail_4_8
              label={<TextCustom bold>File Prospektus</TextCustom>}
              value={
                <ButtonCustom
                  iconLeft={
                    <IconProspectus
                      size={ICON_SIZE_BUTTON}
                      color={MainColor.darkblue}
                    />
                  }
                  onPress={() => {
                    router.push(`/(application)/(file)/${id}`);
                  }}
                >
                  Preview
                </ButtonCustom>
              }
            />
            <GridDetail_4_8
              label={<TextCustom bold>File Dokumen</TextCustom>}
              value={
                <StackCustom>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ButtonCustom
                      key={i}
                      iconLeft={
                        <IconProspectus
                          size={ICON_SIZE_BUTTON}
                          color={MainColor.darkblue}
                        />
                      }
                      onPress={() => {
                        router.push(`/(application)/(file)/${id}`);
                      }}
                    >
                      Dokumen {i + 1}
                    </ButtonCustom>
                  ))}
                </StackCustom>
              }
            />
          </StackCustom>
        </BaseBox>

        {status === "review" && (
          <AdminButtonReview
            onPublish={() => {
              AlertDefaultSystem({
                title: "Publish",
                message: "Apakah anda yakin ingin mempublikasikan data ini?",
                textLeft: "Batal",
                textRight: "Ya",
                onPressLeft: () => {
                  router.back();
                },
                onPressRight: () => {
                  router.back();
                },
              });
            }}
            onReject={() => {
              router.push(`/admin/investment/${id}/reject-input`);
            }}
          />
        )}

        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/investment/${id}/reject-input`);
            }}
          />
        )}
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              label: "Daftar Investor",
              icon: <IconList />,
              path: `/admin/investment/${id}/list-of-investor`,
            },
            // {
            //   label: "Daftar Pencarian Dana",
            //   icon: <IconList />,
            //   path: `/admin/donation/${id}/list-disbursement-of-funds`,
            // },
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
