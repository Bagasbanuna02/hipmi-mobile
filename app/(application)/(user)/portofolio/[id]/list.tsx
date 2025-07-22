import { BaseBox, Grid, TextCustom, ViewWrapper } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function ListPortofolio() {
  const { id } = useLocalSearchParams();
  return (
    <ViewWrapper>
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox
          key={index}
          style={{ backgroundColor: MainColor.darkblue }}
          onPress={() => {
            console.log("press to Portofolio");
            router.push(`/portofolio/${id}`);
          }}
        >
          <Grid>
            <Grid.Col
              span={10}
              style={{ justifyContent: "center", backgroundColor: "" }}
            >
              <TextCustom bold size="large" truncate={1}>
                Nama usaha portofolio
              </TextCustom>
              <TextCustom size="small" color="yellow">
                #id-porofolio12345
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
      ))}
    </ViewWrapper>
  );
}
