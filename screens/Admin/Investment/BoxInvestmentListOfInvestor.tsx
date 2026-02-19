import { BadgeCustom, Divider, StackCustom, TextCustom } from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import { GridSpan_4_8 } from "@/components/_ShareComponent/GridSpan_4_8";
import { colorBadgeTransaction } from "@/utils/colorBadge";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { router } from "expo-router";
import _ from "lodash";

interface BoxInvestmentListOfInvestorProps {
  item: any;
}

export default function Admin_BoxInvestmentListOfInvestor({
  item,
}: BoxInvestmentListOfInvestorProps) {
  const statusName = item?.StatusInvoice?.name || "-";

  return (
    <>
      <AdminBasicBox
        style={{ marginHorizontal: 10, marginVertical: 5 }}
        onPress={() => {
          router.push(
            `/admin/investment/${item?.id}/${_.lowerCase(
              item?.StatusInvoice?.name,
            )}/transaction-detail`,
          );
        }}
      >
        <StackCustom gap={0}>
          <StackCustom style={{ paddingBlock: 8 }}>
            <TextCustom size="large" bold truncate>
              {item?.Author?.username || "-"}
            </TextCustom>
          </StackCustom>
          <Divider />
          <GridSpan_4_8
            label={<TextCustom>Status</TextCustom>}
            value={
              <BadgeCustom
                color={colorBadgeTransaction({
                  status: statusName,
                })}
              >
                {statusName}
              </BadgeCustom>
            }
          />
          <GridSpan_4_8
            label={<TextCustom>Nominal</TextCustom>}
            value={
              <TextCustom>
                {item?.nominal
                  ? `Rp ${formatCurrencyDisplay(item?.nominal)}`
                  : "-"}
              </TextCustom>
            }
          />
        </StackCustom>
      </AdminBasicBox>
    </>
  );
}
