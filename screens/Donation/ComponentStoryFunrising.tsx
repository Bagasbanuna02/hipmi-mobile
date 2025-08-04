import { BaseBox, StackCustom, Grid, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";

export default function Donation_ComponentStoryFunrising() {
    return (
      <>
        <BaseBox>
          <StackCustom gap={"xs"}>
            <Grid>
              <Grid.Col span={10}>
                <TextCustom bold size="large">
                  Cerita Penggalang Dana
                </TextCustom>
              </Grid.Col>
              <Grid.Col span={2}>
                <Ionicons
                  name="chevron-forward-circle-outline"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.yellow}
                  style={{
                    alignSelf: "flex-end",
                  }}
                />
              </Grid.Col>
            </Grid>
            <TextCustom truncate={3}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              iusto porro quae optio accusantium amet minima deleniti temporibus
              cum voluptatem vel veniam doloribus blanditiis sapiente deserunt
              distinctio eaque aliquid laboriosam?
            </TextCustom>
          </StackCustom>
        </BaseBox>
      </>
    );
}