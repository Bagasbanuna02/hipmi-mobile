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
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";

export default function Forum_CommentarBoxSection({
  data,
  setOpenDrawer,
}: {
  data: any;
  setOpenDrawer: (value: boolean) => void;
}) {
  return (
    <>
      <BaseBox>
        <View>
          <Grid>
            <Grid.Col span={2}>
              <AvatarCustom href={`/profile/${data.id}`} />
            </Grid.Col>
            <Grid.Col
              span={8}
              style={{
                justifyContent: "center",
              }}
            >
              <TextCustom>{data.name}</TextCustom>
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

          <TextCustom>{data.deskripsi}</TextCustom>

          <Spacing />
          <View style={{ alignItems: "flex-end" }}>
            <TextCustom>{data.date}</TextCustom>
          </View>
        </View>
      </BaseBox>
    </>
  );
}
