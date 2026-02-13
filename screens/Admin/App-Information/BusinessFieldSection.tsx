import {
  BadgeCustom,
  CenterCustom,
  Grid,
  StackCustom,
  TextCustom
} from "@/components";
import AdminBasicBox from "@/components/_ShareComponent/Admin/AdminBasicBox";
import { router } from "expo-router";

interface Bidang {
  item: {
    id: string;
    name: string;
    slug: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export default function AdminAppInformation_BusinessFieldSection({
  item,
}: {
  item: any;
}) {
  return (
    <>
      <AdminBasicBox
        onPress={() =>
          router.push(`/admin/app-information/business-field/${item.item.id}`)
        }
        style={{ marginHorizontal: 10, marginVertical: 5 }}
      >
        <Grid>
          <Grid.Col span={8} style={{ alignSelf: "center" }}>
            <StackCustom gap={"xs"}>
              <TextCustom bold truncate>
                {item?.item?.name || "-"}
              </TextCustom>
            </StackCustom>
          </Grid.Col>
          <Grid.Col span={4} style={{ alignItems: "flex-end" }}>
            <CenterCustom>
              {item?.item?.active ? (
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
