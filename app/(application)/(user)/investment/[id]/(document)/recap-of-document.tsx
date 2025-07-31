import {
  AlertDefaultSystem,
  BackButton,
  DotButton,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Investment_BoxDetailDocument from "@/screens/Invesment/Document/RecapBoxDetail";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function InvestmentRecapOfDocument() {
  const { id } = useLocalSearchParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerBox, setOpenDrawerBox] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Rekap Dokumen",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <DotButton
              onPress={() => {
                setOpenDrawer(true);
                setOpenDrawerBox(false);
              }}
            />
          ),
        }}
      />

      <ViewWrapper>
        {Array.from({ length: 10 }).map((_, index) => (
          <Investment_BoxDetailDocument
            key={index}
            title={`Judul Dokumen ${index + 1}`}
            leftIcon={
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={ICON_SIZE_SMALL}
                color={MainColor.white}
                style={{
                  zIndex: 10,
                  alignSelf: "flex-end",
                }}
                onPress={() => setOpenDrawerBox(true)}
              />
            }
            href={`/investment/${id}/dokumen/file`}
          />
        ))}
      </ViewWrapper>

      {/* Drawer On Header */}
      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: (
                <AntDesign
                  name="pluscircle"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              label: "Tambah Dokumen",
              path: `/investment/${id}/(document)/add-document`,
            },
          ]}
          onPressItem={(item) => {
            router.push(item.path as any);
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>

      {/* Drawer On Box */}
      <DrawerCustom
        isVisible={openDrawerBox}
        closeDrawer={() => setOpenDrawerBox(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconEdit />,
              label: "Edit Dokumen",
              path: `/investment/${id}/(document)/edit-document`,
            },
            {
              icon: (
                <Ionicons
                  name="trash-outline"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.white}
                />
              ),
              label: "Hapus Dokumen",
              path: "" as any,
              color: MainColor.red,
            },
          ]}
          onPressItem={(item) => {
            if (item.path === ("" as any)) {
              AlertDefaultSystem({
                title: "Hapus Dokumen",
                message: "Apakah anda yakin ingin menghapus dokumen ini?",
                textLeft: "Batal",
                textRight: "Hapus",
                onPressRight: () => {
                  setOpenDrawerBox(false);
                },
              });
            }
            router.push(item.path as any);
            setOpenDrawer(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
