import {
    ActionIcon,
    CenterCustom,
    Divider,
    StackCustom,
    TextCustom,
    ViewWrapper
} from "@/components";
import { IconView } from "@/components/_Icon/IconComponent";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { GridViewCustomSpan } from "@/components/_ShareComponent/GridViewCustomSpan";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function AdminDonasiListOfDisbursementOfFunds() {
  const { id } = useLocalSearchParams();
  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle title="Daftar Pencairan Dana" />
        }
      >
        <GridViewCustomSpan
          span1={3}
          span2={5}
          span3={4}
          component1={
            <TextCustom bold align="center">
              Aksi
            </TextCustom>
          }
          component2={
            <TextCustom bold align="center">
              Tanggal
            </TextCustom>
          }
          component3={
            <TextCustom bold align="center">
              Nominal
            </TextCustom>
          }
        />
        <Divider />
        <StackCustom>
          {Array.from({ length: 10 }).map((_, index) => (
            <View key={index}>
              <GridViewCustomSpan
                span1={3}
                span2={5}
                span3={4}
                component1={
                  <CenterCustom>
                    <ActionIcon
                      icon={<IconView size={ICON_SIZE_BUTTON} color="black" />}
                      onPress={() => {
                        router.push(
                          `/admin/donation/${id}/detail-disbursement-of-funds`
                        );
                      }}
                    />
                  </CenterCustom>
                }
                component2={
                  <TextCustom bold align="center" truncate>
                    {dayjs()
                      .add(index + 1, "day")
                      .format("DD-MM-YYYY HH:mm")}
                  </TextCustom>
                }
                component3={<TextCustom>Rp. 1.000.000</TextCustom>}
              />
              <Divider />
            </View>
          ))}
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
