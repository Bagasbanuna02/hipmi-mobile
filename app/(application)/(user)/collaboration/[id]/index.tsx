import {
    AlertDefaultSystem,
    AvatarUsernameAndOtherComponent,
    BackButton,
    BoxWithHeaderSection,
    ButtonCustom,
    DotButton,
    DrawerCustom,
    Grid,
    MenuDrawerDynamicGrid,
    Spacing,
    StackCustom,
    TextAreaCustom,
    TextCustom,
    ViewWrapper
} from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function CollaborationDetail() {
  const { id } = useLocalSearchParams();
  const [openDrawerPartisipasi, setOpenDrawerPartisipasi] = useState(false);
  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Detail Proyek",
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <DotButton onPress={() => setOpenDrawerMenu(true)} />
          ),
        }}
      />
      <ViewWrapper>
        <BoxWithHeaderSection>
          <AvatarUsernameAndOtherComponent />
          <Spacing />
          <StackCustom>
            <TextCustom align="center" bold size="large">
              Judul Proyek {id}
            </TextCustom>
            <Spacing height={0} />
            {listData.map((item, index) => (
              <Grid key={index}>
                <Grid.Col span={4}>
                  <TextCustom bold>{item.title}</TextCustom>
                </Grid.Col>
                <Grid.Col span={8}>
                  <TextCustom>{item.value}</TextCustom>
                </Grid.Col>
              </Grid>
            ))}
          </StackCustom>
        </BoxWithHeaderSection>

        <ButtonCustom onPress={() => setOpenDrawerPartisipasi(true)}>
          Partisipasi
        </ButtonCustom>
      </ViewWrapper>

      {/* Drawer Partisipasi */}
      <DrawerCustom
        isVisible={openDrawerPartisipasi}
        closeDrawer={() => setOpenDrawerPartisipasi(false)}
        height={300}
      >
        <TextAreaCustom
          label="Dekripsi diri"
          placeholder="Masukan dekripsi diri"
          required
          showCount
          maxLength={500}
        />

        <ButtonCustom
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            AlertDefaultSystem({
              title: "Simpan data deskripsi",
              message: "Apakah anda sudah yakin ingin menyimpan data ini ?",
              textLeft: "Batal",
              textRight: "Simpan",
              onPressRight: () => router.replace(`/collaboration/(tabs)/group`),
            });
          }}
        >
          Simpan
        </ButtonCustom>
      </DrawerCustom>

      {/* Drawer Menu */}
      <DrawerCustom
        isVisible={openDrawerMenu}
        closeDrawer={() => setOpenDrawerMenu(false)}
        height={250}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <Ionicons name="people" size={24} color="white" />,
              label: "Daftar Partisipan",
              path: `/collaboration/${id}/list-of-participants`,
            },
          ]}
          onPressItem={(item) => {
            router.push(item.path as any);
            setOpenDrawerMenu(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}

const listData = [
  {
    title: "Industri",
    value: "Pilihan Industri",
  },
  {
    title: "Deskripsi",
    value: "Deskripsi Proyek",
  },
  {
    title: "Tujuan Proyek",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Keuntungan Proyek",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
