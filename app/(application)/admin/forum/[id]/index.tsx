/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  BadgeCustom,
  BaseBox,
  DrawerCustom,
  MenuDrawerDynamicGrid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconDot } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_XLARGE } from "@/constants/constans-value";
import { apiAdminForumPostingById } from "@/service/api-admin/api-admin-forum";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

export default function AdminForumDetailPosting() {
  const { id } = useLocalSearchParams();
  const [openDrawerPage, setOpenDrawerPage] = useState(false);
  const [data, setData] = useState<any | null>(null);
  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminForumPostingById({
        id: id as string,
      });

      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const listDataAction = [
    {
      label: "Username",
      value: data?.Author?.username || "-",
    },
    {
      label: "Status",
      value:
        (data && (
          <BadgeCustom
            color={
              data?.ForumMaster_StatusPosting?.status === "Open"
                ? MainColor.green
                : MainColor.red
            }
          >
            {data?.ForumMaster_StatusPosting?.status || "-"}
          </BadgeCustom>
        )) ||
        "-",
    },
    {
      label: "Komentar",
      value: data?.JumlahKomentar || 0,
    },
    {
      label: "Total Report",
      value: data?.JumlahReportPosting || 0,
    },
  ];

  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle
            title="Detail Posting"
            rightComponent={
              data &&
              data?.isActive && (
                <ActionIcon
                  icon={<IconDot size={16} color={MainColor.darkblue} />}
                  onPress={() => setOpenDrawerPage(true)}
                />
              )
            }
          />
        }
      >
        {data && !data?.isActive && (
          <BaseBox>
            <TextCustom bold align="center" color="red">
              Postingan ini telah di nonaktifkan
            </TextCustom>
          </BaseBox>
        )}

        <BaseBox>
          <StackCustom gap={"sm"}>
            {listDataAction.map((item, i) => (
              <GridDetail_4_8
                key={i}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>

        <BaseBox>
          <StackCustom gap={"sm"}>
            <TextCustom bold>Postingan</TextCustom>
            <TextCustom>{(data && data?.diskusi) || "-"}</TextCustom>
          </StackCustom>
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
            {
              icon: (
                <Ionicons
                  name="list"
                  size={ICON_SIZE_XLARGE}
                  color={MainColor.white}
                />
              ),
              label: "Daftar Komentar",
              value: "detail",
              path: `/admin/forum/${id}/list-comment`,
            },
          ]}
          onPressItem={(item) => {
            router.navigate(item.path as any);
            setOpenDrawerPage(false);
          }}
        />
      </DrawerCustom>
    </>
  );
}
