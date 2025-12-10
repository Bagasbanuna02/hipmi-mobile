/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  BaseBox,
  CenterCustom,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridSpan_NewComponent } from "@/components/_ShareComponent/GridSpan_NewComponent";
import { MainColor } from "@/constants/color-palet";
import { apiAdminMasterBusinessFieldById } from "@/service/api-admin/api-master-admin";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Divider } from "react-native-paper";

export default function AdminAppInformation_BusinessFieldDetail() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadDetail();
    }, [id])
  );

  const onLoadDetail = async () => {
    try {
      const response = await apiAdminMasterBusinessFieldById({
        id: id as string,
        category: "all",
      });

      console.log("Response >>", JSON.stringify(response, null, 2));

      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
      setData(null);
    }
  };

  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <AdminBackButtonAntTitle title="Detail Bidang & Sub Bidang" />

          {!data ? (
            <LoaderCustom />
          ) : (
            <StackCustom gap={"xs"}>
              <TextCustom bold>Nama Bidang</TextCustom>
              <Spacing height={5} />
              <BaseBox>
                <StackCustom gap={"xs"}>
                  <TextCustom bold>
                    Status: {data?.bidang?.active ? "Aktif" : "Tidak Aktif"}
                  </TextCustom>
                  <GridSpan_NewComponent
                    span1={10}
                    span2={2}
                    text1={
                      <TextCustom bold size={"large"}>
                        {data?.bidang?.name}
                      </TextCustom>
                    }
                    text2={
                      <CenterCustom>
                        <ActionIcon
                          icon={<IconEdit size={16} color={MainColor.black} />}
                          onPress={() =>
                            router.push(
                              `/admin/app-information/business-field/${id}/bidang-update`
                            )
                          }
                        />
                      </CenterCustom>
                    }
                  />
                </StackCustom>
              </BaseBox>
              {/* <Divider /> */}
              <Spacing height={5} />

              <TextCustom bold>Sub Bidang Bisnis</TextCustom>
              <Spacing height={5} />

              {data?.subBidang?.map((item: any, index: number) => (
                <BaseBox key={index}>
                  <StackCustom gap={0}>
                    <TextCustom bold>
                      Status: {item?.isActive ? "Aktif" : "Tidak Aktif"}
                    </TextCustom>

                    <GridSpan_NewComponent
                      span1={10}
                      span2={2}
                      text1={
                        <TextCustom bold size={"large"}>
                          {item.name}
                        </TextCustom>
                      }
                      text2={
                        <CenterCustom>
                          <ActionIcon
                            icon={
                              <IconEdit size={16} color={MainColor.black} />
                            }
                            onPress={() =>
                              router.push(
                                `/admin/app-information/business-field/${item?.id}/sub-bidang-update`
                              )
                            }
                          />
                        </CenterCustom>
                      }
                    />
                  </StackCustom>
                </BaseBox>
              ))}
            </StackCustom>
          )}

          {/* <TextCustom>{JSON.stringify(data, null, 2)}</TextCustom> */}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
