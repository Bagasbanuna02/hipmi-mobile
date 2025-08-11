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
import { IconDot, IconView } from "@/components/_Icon/IconComponent";
import { IconTrash } from "@/components/_Icon/IconTrash";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminTitleTable from "@/components/_ShareComponent/Admin/TableTitle";
import AdminTableValue from "@/components/_ShareComponent/Admin/TableValue";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import {
  ICON_SIZE_BUTTON,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_XLARGE,
} from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Divider } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminForumDetailPosting() {
  const [openDrawerPage, setOpenDrawerPage] = useState(false);
  const [openDrawerAction, setOpenDrawerAction] = useState(false);
  const [id, setId] = useState<any>();

  const handlerAction = (item: { value: string; path: string }) => {
    if (item.value === "delete") {
      AlertDefaultSystem({
        title: "Hapus Posting",
        message: "Apakah Anda yakin ingin menghapus posting ini?",
        textLeft: "Batal",
        textRight: "Hapus",
        onPressRight: () => {
          Toast.show({
            type: "success",
            text1: "Posting berhasil dihapus",
          });
        },
      });
    } else {
      router.navigate(item.path as any);
    }
    setOpenDrawerAction(false);
  };

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title="Detail Posting"
            rightComponent={
              <ActionIcon
                icon={<IconDot size={16} color={MainColor.darkblue} />}
                onPress={() => setOpenDrawerPage(true)}
              />
            }
          />
        }
      >
        <BaseBox>
          <StackCustom gap={"sm"}>
            {listDataAction.map((item, i) => (
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

        {/* <AdminComp_BoxTitle title="Komentar" rightComponent={rightComponent} /> */}
        <BaseBox>
          <AdminTitleTable title1="Aksi" title2="Username" title3="Komentar" />
          <Spacing />
          <Divider />
          {Array.from({ length: 10 }).map((_, index) => (
            <AdminTableValue
              key={index}
              value1={
                <ActionIcon
                  icon={
                    <Ionicons
                      name="ellipsis-vertical-outline"
                      size={ICON_SIZE_BUTTON}
                      color="black"
                    />
                  }
                  onPress={() => {
                    setOpenDrawerAction(true);
                    setId(index + 1);
                  }}
                />
              }
              value2={<TextCustom truncate={1}>Username username</TextCustom>}
              value3={
                <TextCustom truncate={2}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis asperiores quidem deleniti architecto eaque et
                  nostrum, ad consequuntur eveniet quisquam quae voluptatum
                  ducimus! Dolorem nobis modi officia debitis, beatae mollitia.
                </TextCustom>
              }
            />
          ))}
        </BaseBox>
      </ViewWrapper>

      <DrawerCustom
        isVisible={openDrawerPage}
        closeDrawer={() => setOpenDrawerPage(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: (
                <Ionicons
                  name="list"
                  size={ICON_SIZE_XLARGE}
                  color={MainColor.white}
                />
              ),
              label: "Daftar Report Posting",
              value: "detail",
              path: `/admin/forum/${id}/list-report-posting`,
            },
          ]}
          onPressItem={(item) => {
            router.navigate(item.path as any);
            setOpenDrawerPage(false);
          }}
        />
      </DrawerCustom>

      <DrawerCustom
        isVisible={openDrawerAction}
        closeDrawer={() => setOpenDrawerAction(false)}
        height={"auto"}
      >
        <MenuDrawerDynamicGrid
          data={[
            {
              icon: <IconView />,
              label: "Detail Komentar",
              value: "detail",
              path: `admin/forum/${id}/list-report-comment`,
            },
            {
              icon: (
                <IconTrash size={ICON_SIZE_MEDIUM} color={MainColor.white} />
              ),
              label: "Hapus Komentar",
              value: "delete",
              path: "",
              color: MainColor.red,
            },
          ]}
          onPressItem={(item) => {
            handlerAction(item as any);
          }}
        />
      </DrawerCustom>
    </>
  );
}

const listDataAction = [
  {
    label: "Username",
    value: "Username",
  },
  {
    label: "Status",
    value: <BadgeCustom color={MainColor.green}>Open</BadgeCustom>,
  },
  {
    label: "Komentar",
    value: "10",
  },
  {
    label: "Total Report",
    value: "1",
  },
];
