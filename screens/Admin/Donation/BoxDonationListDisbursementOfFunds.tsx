import { Divider, StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import dayjs from "dayjs";
import { router } from "expo-router";
import { View } from "react-native";

interface BoxDonationListDisbursementOfFundsProps {
  item: any;
}

export default function Admin_BoxDonationListDisbursementOfFunds({
  item,
}: BoxDonationListDisbursementOfFundsProps) {
  return (
    <>
      <AdminBasicBox
        style={{ marginHorizontal: 10, marginVertical: 5 }}
        onPress={() => {
          router.push(
            `/admin/donation/${item?.id}/detail-disbursement-of-funds`,
          );
        }}
      >
        <StackCustom gap={0}>
          <View style={{ paddingBlock: 8 }}>
            <TextCustom size={"large"} bold truncate>
              {item?.title || "-"}
            </TextCustom>
          </View>
          <Divider />
          <GridSpan_4_8
            label={<TextCustom>Tanggal</TextCustom>}
            value={
              <TextCustom>
                {dayjs(item?.createdAt).format("DD-MM-YYYY") || "-"}
              </TextCustom>
            }
          />
          <GridSpan_4_8
            label={<TextCustom>Nominal</TextCustom>}
            value={
              <TextCustom bold>
                Rp {formatCurrencyDisplay(item?.nominalCair)}
              </TextCustom>
            }
          />
        </StackCustom>
      </AdminBasicBox>
    </>
  );
}
