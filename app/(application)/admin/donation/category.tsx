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
import { GridView_3_3_6 } from "@/components/_ShareComponent/GridView_3_3_6";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { View } from "react-native";
import { Divider, Switch } from "react-native-paper";
import { router } from "expo-router";

export default function AdminDonationCategory() {
  return (
    <>
      <ViewWrapper headerComponent={<AdminTitlePage title="Donasi" />}>
        <AdminComp_BoxTitle
          title="Kategori"
          rightComponent={
            <AdminActionIconPlus
              onPress={() => {
                router.push(`/admin/donation/category-create`);
              }}
            />
          }
        />

        <BaseBox>
          <GridView_3_3_6
            component1={
              <TextCustom bold align="center">
                Aksi
              </TextCustom>
            }
            component2={<TextCustom bold>Status</TextCustom>}
            component3={<TextCustom bold>Kategori</TextCustom>}
          />
          <Divider />
          <Spacing />

          <StackCustom>
            {listData.map((item, index) => (
              <View key={index}>
                <GridView_3_3_6
                  component1={
                    <CenterCustom>
                      <ActionIcon
                        icon={
                          <IconEdit size={ICON_SIZE_BUTTON} color="black" />
                        }
                        onPress={() => {
                            router.push(`/admin/donation/category-update?id=${index}`);
                        }}
                      />
                    </CenterCustom>
                  }
                  component2={
                    <Switch
                      value={true}
                      onValueChange={(item) => {
                        console.log(item);
                      }}
                      color={MainColor.yellow}
                      
                    />
                  }
                  component3={<TextCustom bold>{item.label}</TextCustom>}
                />
                <Spacing height={10} />
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
    label: "Kegiatan Sosial",
    value: "kegiatan_sosial",
  },
  {
    label: "Pendidikan",
    value: "pendidikan",
  },
  {
    label: "Kesehatan",
    value: "kesehatan",
  },
  {
    label: "Kebudayaan",
    value: "kebudayaan",
  },
  {
    label: "Bencana Alami",
    value: "bencana_alami",
  },
  {
    label: "Lainnya",
    value: "lainnya",
  },
];
