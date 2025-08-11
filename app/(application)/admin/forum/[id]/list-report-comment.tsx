import {
  ActionIcon,
  AlertDefaultSystem,
  BaseBox,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconDot, IconView } from "@/components/_Icon/IconComponent";
import { IconTrash } from "@/components/_Icon/IconTrash";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { router } from "expo-router";
import { useState } from "react";
import { Divider } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminForumReportComment() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerAction, setOpenDrawerAction] = useState(false);

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title="Report Komentar"
            rightComponent={
              <ActionIcon
                icon={<IconDot size={16} color={MainColor.darkblue} />}
                onPress={() => setOpenDrawer(true)}
              />
            }
          />
        }
      >
        <BaseBox>
          <StackCustom gap={"sm"}>
            {listData.map((item, i) => (
              <GridDetail_4_8
                key={i}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
            <TextCustom bold>Posting</TextCustom>
            <TextCustom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores cupiditate nobis dignissimos explicabo quo unde dolorum
              numquam eos ab laborum fugiat illo nam velit quibusdam, maxime
              assumenda aut vero provident!
            </TextCustom>
          </StackCustom>
        </BaseBox>

        <AdminComp_BoxTitle title="Daftar Report Komentar" />

        <BaseBox>
          <AdminTitleTable
            title1="Aksi"
            title2="Username"
            title3="Kategori Report"
          />
          <Spacing />
          <Divider />
          {Array.from({ length: 5 }).map((_, index) => (
            <AdminTableValue
              key={index}
              value1={
                <ActionIcon
                  icon={<IconView size={ICON_SIZE_BUTTON} color="black" />}
                  onPress={() => {
                    setOpenDrawerAction(true);
                  }}
                />
              }
              value2={<TextCustom truncate={1}>Username username</TextCustom>}
              value3={
                <TextCustom truncate={2} align="center">
                  SPAM
                </TextCustom>
              }
            />
          ))}
        </BaseBox>
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconTrash />,
              label: "Hapus Komentar",
              value: "delete",
              path: "",
              color: MainColor.red,
            },
          ]}
          onPressItem={(item) => {
            AlertDefaultSystem({
              title: "Hapus Komentar",
              message: "Apakah Anda yakin ingin menghapus komentar ini?",
              textLeft: "Batal",
              textRight: "Hapus",
              onPressRight: () => {
                setOpenDrawer(false);
                Toast.show({
                  type: "success",
                  text1: "Komentar berhasil dihapus",
                });
                router.back();
              },
            });
          }}
        />
      </DrawerCustom>

      <DrawerCustom
        isVisible={openDrawerAction}
        closeDrawer={() => setOpenDrawerAction(false)}
        height={"auto"}
      >
        {listDataAction.map((item, i) => (
          <GridDetail_4_8
            key={i}
            label={<TextCustom bold>{item.label}</TextCustom>}
            value={<TextCustom>{item.value}</TextCustom>}
          />
        ))}
      </DrawerCustom>
    </>
  );
}

const listData = [
  {
    label: "Username",
    value: "Username",
  },
];

const listDataAction = [
  {
    label: "Username",
    value: "Riyusa",
  },
  {
    label: "Kategori Report",
    value: "SPAM",
  },
  {
    label: "Deskripsi",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis asperiores quidem deleniti architecto eaque et nostrum, ad consequuntur eveniet quisquam quae voluptatum ducimus! Dolorem nobis modi officia debitis, beatae mollitia.",
  },
];
