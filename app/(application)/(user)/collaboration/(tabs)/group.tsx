import { BaseBox, Grid, TextCustom } from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { MainColor } from "@/constants/color-palet";
import { Feather } from "@expo/vector-icons";

export default function CollaborationGroup() {
  return (
    <ViewWrapper hideFooter>
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox key={index} paddingBlock={5}>
          <Grid>
            <Grid.Col span={10}>
              <TextCustom bold>Nama Grup</TextCustom>
              <TextCustom size="small">2 Anggota</TextCustom>
            </Grid.Col>
            <Grid.Col
              span={2}
              style={{ alignItems: "flex-end", justifyContent: "center" }}
            >
              <Feather name="chevron-right" size={20} color={MainColor.white} />
            </Grid.Col>
          </Grid>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
