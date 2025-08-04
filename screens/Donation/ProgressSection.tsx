import { ProgressCustom, Spacing, Grid, TextCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function Donation_ProgressSection() {
    return (
      <>
        <View>
          <ProgressCustom size="lg" />
          <Spacing />
          <Grid>
            <Grid.Col span={4}>
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="flower-sharp"
                  size={ICON_SIZE_MEDIUM}
                  color={MainColor.yellow}
                />
                <Spacing height={10} />
                <TextCustom size="small">Donatur</TextCustom>
              </View>
            </Grid.Col>
            <Grid.Col
              span={4}
              style={{
                borderLeftWidth: 1,
                borderLeftColor: MainColor.white,
                borderRightWidth: 1,
                borderRightColor: MainColor.white,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="chatbox"
                  size={ICON_SIZE_MEDIUM}
                  color={MainColor.yellow}
                />
                <Spacing height={10} />
                <TextCustom size="small">Kabar Terbaru</TextCustom>
              </View>
            </Grid.Col>
            <Grid.Col span={4}>
              <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  name="transfer-within-a-station"
                  size={ICON_SIZE_MEDIUM}
                  color={MainColor.yellow}
                />
                <Spacing height={10} />
                <TextCustom size="small">Pencairan Dana</TextCustom>
              </View>
            </Grid.Col>
          </Grid>
        </View>
      </>
    );
}