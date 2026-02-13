import {
  BadgeCustom,
  CenterCustom,
  Grid,
  StackCustom,
  TextCustom
} from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import { router } from "expo-router";

interface BankProps {
  item: {
    id: string;
    namaBank: string;
    namaAkun: string;
    norek: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
export default function AdminAppInformation_Bank({
  item,
}: {
  item: BankProps;
}) {
  return (
    <>
      <AdminBasicBox
        onPress={() =>
          router.push(`/admin/app-information/information-bank/${item.item.id}`)
        }
        style={{ marginHorizontal: 10, marginVertical: 5 }}
      >
        <Grid>
          <Grid.Col span={8}>
            <StackCustom gap={"xs"}>
              <TextCustom bold truncate>
                {item?.item?.namaBank || "-"}
              </TextCustom>
              <TextCustom size={"small"} bold truncate color="gray">
                {item?.item?.norek || "-"}
              </TextCustom>
            </StackCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
            <CenterCustom>
              {item?.item?.isActive ? (
                <BadgeCustom color="green">Aktif</BadgeCustom>
              ) : (
                <BadgeCustom color="red">Tidak Aktif</BadgeCustom>
              )}
            </CenterCustom>
          </Grid.Col>
        </Grid>
      </AdminBasicBox>
    </>
  );
}
