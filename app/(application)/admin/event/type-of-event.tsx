import {
  ActionIcon,
  BaseBox,
  CenterCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { IconEdit } from "@/components/_Icon";
import AdminActionIconPlus from "@/components/_ShareComponent/Admin/ActionIconPlus";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminTitlePage from "@/components/_ShareComponent/Admin/TitlePage";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { router } from "expo-router";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function AdminEventTypeOfEvent() {
  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Event" />}>
        <AdminComp_BoxTitle
          title="Tipe Acara"
          rightComponent={
            <AdminActionIconPlus
              onPress={() => {
                router.push(`/admin/event/type-create`);
              }}
            />
          }
        />

        <BaseBox>
          <GridDetail_4_8
            label={
              <TextCustom bold align="center">
                Aksi
              </TextCustom>
            }
            value={<TextCustom bold>Tipe Acara</TextCustom>}
          />
          <Divider />
          <Spacing />

          <StackCustom>
            {listData.map((item, index) => (
              <View key={index}>
                <GridDetail_4_8
                  label={
                    <CenterCustom>
                      <ActionIcon
                        icon={
                          <IconEdit size={ICON_SIZE_BUTTON} color="black" />
                        }
                        onPress={() => {
                          router.push(`/admin/event/type-update?id=${index}`);
                        }}
                      />
                    </CenterCustom>
                  }
                  value={<TextCustom bold>{item.label}</TextCustom>}
                />
                <Divider />
              </View>
            ))}
          </StackCustom>
        </BaseBox>
      </ViewWrapper>
    </>
  );
}

const listData = [
  {
    label: "Seminar",
    value: "seminar",
  },
  {
    label: "Workshop",
    value: "workshop",
  },
  {
    label: "Konferensi",
    value: "konferensi",
  },
  {
    label: "Lomba",
    value: "lomba",
  },
  {
    label: "Pameran",
    value: "pameran",
  },
  {
    label: "Pesta",
    value: "pesta",
  },
  {
    label: "Pertandingan",
    value: "pertandingan",
  },
];
