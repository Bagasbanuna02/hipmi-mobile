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
  const [selectedId, setSelectedId] = useState<any>();

  const [data, setData] = useState<any | null>(null);
  const [listComment, setListComment] = useState<any[] | null>(null);

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
      console.log("[RES DATA]", JSON.stringify(response, null, 2));

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
          </StackCustom>
        </BaseBox>

        <BaseBox>
          <StackCustom gap={"sm"}>
            <TextCustom bold>Postingan</TextCustom>
            <TextCustom>{(data && data?.diskusi) || "-"}</TextCustom>
          </StackCustom>
        </BaseBox>

        {/* <AdminComp_BoxTitle title="Komentar" rightComponent={rightComponent} /> */}
        {/* <StackCustom>
          <AdminTitleTable title1="Aksi" title2="Username" title3="Komentar" />
          <Divider />
          {!listComment ? (
            <LoaderCustom />
          ) : _.isEmpty(listComment) ? (
            <TextCustom align="center" color="gray">
              Tidak ada komentar
            </TextCustom>
          ) : (
            listComment?.map((item: any, index: number) => (
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
                      setSelectedId(index + 1);
                    }}
                  />
                }
                value2={
                  <TextCustom truncate={1}>
                    {item?.Author?.username || "-"}
                  </TextCustom>
                }
                value3={
                  <TextCustom truncate={2}>{item?.komentar || "-"}</TextCustom>
                }
              />
            ))
          )}
        </StackCustom> */}
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
