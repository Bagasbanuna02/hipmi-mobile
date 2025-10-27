import { BaseBox, Grid, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Portofolio_BoxView({ data }: { data: any }) {
  return (
    <>
      <BaseBox
        style={{ backgroundColor: MainColor.darkblue }}
        onPress={() => {
          router.push(`/portofolio/${data?.id}`);
        }}
      >
        <Grid>
          <Grid.Col
            span={10}
            style={{ justifyContent: "center", backgroundColor: "" }}
          >
            <TextCustom bold size="large" truncate={1}>
              {data && data?.namaBisnis ? data.namaBisnis : "-"}
            </TextCustom>
            <TextCustom size="small" color="yellow">
              #{data && data?.id_Portofolio ? data.id_Portofolio : "-"}
            </TextCustom>
          </Grid.Col>
          <Grid.Col
            span={2}
            style={{ alignItems: "flex-end", justifyContent: "center" }}
          >
            <Ionicons
              name="caret-forward"
              size={ICON_SIZE_SMALL}
              color="white"
            />
          </Grid.Col>
        </Grid>
      </BaseBox>
    </>
  );
}
