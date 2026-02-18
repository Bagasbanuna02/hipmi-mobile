import { TextCustom, BadgeCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import GridTwoView from "@/components/_ShareComponent/GridTwoView";
import { router } from "expo-router";
import { View } from "react-native";

export default function Admin_BoxDonationCategory({item}: {item: any}) {
  return (
    <>
    <AdminBasicBox
        onPress={() => {
          router.push(`/admin/donation/category-update?id=${item.id}`);
        }}
        style={{ marginHorizontal: 10, marginVertical: 5 }}
      >
        <GridTwoView
          leftItem={<TextCustom bold>{item?.name || "-"}</TextCustom>}
          rightItem={
            <View>
              {item?.active ? (
                <BadgeCustom color="green">Aktif</BadgeCustom>
              ) : (
                <BadgeCustom color="red">Tidak Aktif</BadgeCustom>
              )}
            </View>
          }
          spanLeft={8}
          spanRight={4}
          styleRight={{
            alignItems: "flex-end",
          }}
        />
      </AdminBasicBox>
    </>
  )
}