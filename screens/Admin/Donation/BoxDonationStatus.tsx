import { Divider, StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router } from "expo-router";
import { View } from "react-native";

interface BoxDonationStatusProps {
  item: any;
  status?: string;
}

export default function Admin_BoxDonationStatus({
  item,
  status,
}: BoxDonationStatusProps) {
  return (
    <>
      <AdminBasicBox
        style={{ marginHorizontal: 10, marginVertical: 5 }}
        onPress={() => {
          router.push(`/admin/donation/${item.id}/${status}`);
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
            label={<TextCustom>Durasi</TextCustom>}
            value={
              <TextCustom>
                {item?.DonasiMaster_Durasi?.name || "-"} hari
              </TextCustom>
            }
          />
          <GridSpan_4_8
            label={<TextCustom>Target</TextCustom>}
            value={
              <TextCustom>
                {item?.target
                  ? `Rp ${formatCurrencyDisplay(item?.target)}`
                  : "-"}
              </TextCustom>
            }
          />
        </StackCustom>
      </AdminBasicBox>
    </>
  );
}
