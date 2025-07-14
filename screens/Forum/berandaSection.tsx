import {
  BaseBox,
  Grid,
  AvatarCustom,
  TextCustom,
  ClickableCustom,
  Spacing,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import dayjs from "dayjs";

export default function Forum_BerandaSection() {
  const dateNow = dayjs().format("DD/MM/YYYY")
  return (
    <>
      {Array.from({ length: 10 }).map((e, i) => (
        <BaseBox key={i}>
          <View>
            <Grid>
              <Grid.Col span={2}>
                <AvatarCustom />
              </Grid.Col>
              <Grid.Col span={8}>
                <TextCustom>Nama User</TextCustom>
                <TextCustom bold size="small" color="green">
                  Open
                </TextCustom>
              </Grid.Col>

              <Grid.Col
                span={2}
                style={{
                  justifyContent: "center",
                }}
              >
                <ClickableCustom
                  onPress={() => {}}
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Entypo
                    name="dots-three-horizontal"
                    color={MainColor.white}
                    size={ICON_SIZE_SMALL}
                  />
                </ClickableCustom>
              </Grid.Col>
            </Grid>

            <View
              style={{
                backgroundColor: MainColor.soft_darkblue,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <TextCustom truncate={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                inventore iure pariatur, libero omnis excepturi. Ullam ad
                officiis deleniti quos esse odit nesciunt, ipsam adipisci cumque
                aliquam corporis culpa fugit?
              </TextCustom>
            </View>
            <Spacing />

            <Grid>
              <Grid.Col span={6}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={ICON_SIZE_SMALL}
                    color={MainColor.white}
                  />
                  <TextCustom>2</TextCustom>
                </View>
              </Grid.Col>
              <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
                <TextCustom size="small"> {dateNow}</TextCustom>
              </Grid.Col>
            </Grid>
          </View>
        </BaseBox>
      ))}
    </>
  );
}
