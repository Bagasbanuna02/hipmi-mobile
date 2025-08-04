import {
  ClickableCustom,
  Grid,
  ProgressCustom,
  Spacing,
  TextCustom,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_MEDIUM } from "@/constants/constans-value";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";

export default function Donation_ProgressSection({ id }: { id: string }) {
  return (
    <>
      <View>
        <ProgressCustom size="lg" />
        <Spacing />
        <Grid>
          <Grid.Col span={4}>
            <ClickableCustom
              onPress={() => router.push(`/donation/${id}/list-of-donatur`)}
            >
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="flower-sharp"
                  size={ICON_SIZE_MEDIUM}
                  color={MainColor.yellow}
                />
                <Spacing height={10} />
                <TextCustom size="small">Donatur</TextCustom>
              </View>
            </ClickableCustom>
          </Grid.Col>
          <Grid.Col span={4}>
            <ClickableCustom
              onPress={() => router.push(`/donation/${id}/(news)/list-of-news`)}
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
            </ClickableCustom>
          </Grid.Col>
          <Grid.Col span={4}>
            <ClickableCustom
              onPress={() => router.push(`/donation/${id}/fund-disbursement`)}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  name="transfer-within-a-station"
                  size={ICON_SIZE_MEDIUM}
                  color={MainColor.yellow}
                />
                <Spacing height={10} />
                <TextCustom size="small">Pencairan Dana</TextCustom>
              </View>
            </ClickableCustom>
          </Grid.Col>
        </Grid>
      </View>
    </>
  );
}
