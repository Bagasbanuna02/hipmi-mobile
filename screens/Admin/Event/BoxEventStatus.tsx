import { StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { dateTimeView } from "@/utils/dateTimeView";
import { router } from "expo-router";
import { View } from "react-native";
import { Divider } from "react-native-paper";

interface Admin_BoxEventStatusProps {
  item: any;
  status: string;
}

export function Admin_BoxEventStatus({ item, status }: Admin_BoxEventStatusProps) {
  return (
    <AdminBasicBox
      style={{ marginHorizontal: 10, marginVertical: 5 }}
      onPress={() => {
        router.push(`/admin/event/${item.id}/${status}`);
      }}
    >
      <StackCustom gap={0}>
        <View style={{ paddingBlock: 8 }}>
          <TextCustom size={"large"} bold truncate={2}>
            {item?.title || "-"}
          </TextCustom>
        </View>
        <Divider />
        <GridSpan_4_8
          label={<TextCustom>Mulai</TextCustom>}
          value={
            <TextCustom>
              {dateTimeView({ date: item?.tanggal }) || "-"}
            </TextCustom>
          }
        />
        <GridSpan_4_8
          label={<TextCustom>Berakhir</TextCustom>}
          value={
            <TextCustom>
              {dateTimeView({ date: item?.tanggalSelesai }) || "-"}
            </TextCustom>
          }
        />
      </StackCustom>
    </AdminBasicBox>
  );
}
