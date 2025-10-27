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
  ViewWrapper,
} from "@/components";
import { IconDot, IconList } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON, TEXT_SIZE_LARGE } from "@/constants/constans-value";
import AdminDonation_BoxOfDonationStory from "@/screens/Admin/Donation/BoxOfDonationStory";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import React from "react";
import { View } from "react-native";

export default function AdminDonationDetail() {
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
      label: "Penggalang Dana",
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
      label: "Durasi",
      value: "30 Hari",
    },
    {
      label: "Target Dana",
      value: "Rp 10.000.000",
    },
    {
      label: "Kategori",
      value: "Kategori Donasi",
    },
    // {
    //   label: "Total Donatur",
    //   value: "-",
    // },
    // {
    //   label: "Progress",
    //   value: "0 %",
    // },
    // {
    //   label: "Dana Terkumpul",
    //   value: "Rp 0",
    // },
  ];

  const listPencarianDana = [
    {
      label: "Total Dana Dicairkan",
      value: "Rp 0",
    },
    {
      label: "Sisa Dana",
      value: "Rp 0",
    },
    {
      label: "Akumulasi Pencairan",
      value: "0 kali",
    },
    {
      label: "Bank Tujuan",
      value: "BNI",
    },
    {
      label: "Nomor Rekening",
      value: "123456789",
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
          <View>
            <BaseBox>
              <StackCustom>
                <TextCustom bold align="center" size={TEXT_SIZE_LARGE}>
                  Pencarian Dana
                </TextCustom>

                <StackCustom gap={5}>
                  {listPencarianDana.map((item, i) => (
                    <GridDetail_4_8
                      key={i}
                      label={<TextCustom bold>{item.label}</TextCustom>}
                      value={<TextCustom>{item.value}</TextCustom>}
                    />
                  ))}
                </StackCustom>
                <ButtonCustom
                  iconLeft={
                    <Ionicons name="cash-outline" size={ICON_SIZE_BUTTON} />
                  }
                  onPress={() => {
                    router.push(`/admin/donation/${id}/disbursement-of-funds`);
                  }}
                >
                  Cairkan Dana
                </ButtonCustom>
              </StackCustom>
            </BaseBox>

            <BaseBox>
              <ProgressCustom size="lg" />
              <Spacing />
              <StackCustom gap={"xs"}>
                <GridDetail_4_8
                  label={<TextCustom bold>Jumlah Donatur</TextCustom>}
                  value={<TextCustom>0 orang</TextCustom>}
                />
                <GridDetail_4_8
                  label={<TextCustom bold>Dana Terkumpul</TextCustom>}
                  value={<TextCustom>Rp 0</TextCustom>}
                />
              </StackCustom>
            </BaseBox>
          </View>
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

        {status === "review" && (
          <StackCustom>
            <AdminDonation_BoxOfDonationStory />

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
                router.push(`/admin/donation/${id}/reject-input`);
              }}
            />
          </StackCustom>
        )}

        {status === "reject" && (
          <StackCustom>
            <AdminDonation_BoxOfDonationStory />

            <AdminButtonReject
              title="Tambah Catatan"
              onReject={() => {
                router.push(`/admin/donation/${id}/reject-input`);
              }}
            />
          </StackCustom>
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
              label: "Daftar Donatur",
              icon: <IconList />,
              path: `/admin/donation/${id}/list-of-donatur`,
            },
            {
              label: "Daftar Pencarian Dana",
              icon: <IconList />,
              path: `/admin/donation/${id}/list-disbursement-of-funds`,
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
