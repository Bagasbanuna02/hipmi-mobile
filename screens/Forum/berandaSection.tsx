import {
  AvatarCustom,
  BaseBox,
  ClickableCustom,
  Grid,
  Spacing,
  TextCustom,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function Forum_BerandaSection({
  data,
  setOpenDrawer,
  setStatus,
}: {
  data: any;
  setOpenDrawer: (value: boolean) => void;
  setStatus: (value: string) => void;
}) {

  return (
    <>
      <BaseBox>
        <View>
          <Grid>
            <Grid.Col span={2}>
              <AvatarCustom href={`/profile/${data.id}`} />
            </Grid.Col>
            <Grid.Col span={8}>
              <TextCustom>{data.name}</TextCustom>
              {data.status === "Open" ? (
                <TextCustom bold size="small" color="green">
                  {data.status}
                </TextCustom>
              ) : (
                <TextCustom bold size="small" color="red">
                  {data.status}
                </TextCustom>
              )}
            </Grid.Col>

            <Grid.Col
              span={2}
              style={{
                justifyContent: "center",
              }}
            >
              <ClickableCustom
                onPress={() => {
                  setOpenDrawer(true);
                  setStatus(data.status);
                }}
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
            <TextCustom truncate={2}>{data.deskripsi}</TextCustom>
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
                <TextCustom>{data.jumlahBalas}</TextCustom>
              </View>
            </Grid.Col>
            <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
              <TextCustom size="small"> {data.date}</TextCustom>
            </Grid.Col>
          </Grid>
        </View>
      </BaseBox>
    </>
  );
}
