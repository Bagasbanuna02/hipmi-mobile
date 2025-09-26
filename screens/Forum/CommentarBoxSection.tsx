import {
  AvatarComp,
  BoxWithHeaderSection,
  ClickableCustom,
  Grid,
  Spacing,
  TextCustom
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { GStyles } from "@/styles/global-styles";
import { formatChatTime } from "@/utils/formatChatTime";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";

export default function Forum_CommentarBoxSection({
  data,
  onSetData,
}: {
  data: any;
  onSetData: ({
    setCommentId,
    setOpenDrawer,
    setCommentAuthorId,
  }: {
    setCommentId: string;
    setOpenDrawer: boolean;
    setCommentAuthorId: string;
  }) => void;
}) {
  return (
    <>
      <BoxWithHeaderSection>
        <View>
          <Grid>
            <Grid.Col span={2}>
              <AvatarComp
                href={`/profile/${data?.Author?.Profile?.id}`}
                fileId={data?.Author?.Profile?.imageId}
                size="base"
              />
            </Grid.Col>
            <Grid.Col
              span={8}
              style={{
                justifyContent: "center",
              }}
            >
              <TextCustom>{data?.Author?.username}</TextCustom>
            </Grid.Col>

            <Grid.Col
              span={2}
              style={{
                justifyContent: "center",
              }}
            >
              <ClickableCustom
                onPress={() => {
                  onSetData({
                    setCommentId: data?.id,
                    setOpenDrawer: true,
                    setCommentAuthorId: data?.Author?.id,
                  });
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

          <View style={GStyles.forumBox}>
            <TextCustom>{data.komentar}</TextCustom>
          </View>

          <Spacing height={10} />
          <View style={{ alignItems: "flex-end" }}>
            <TextCustom size="small" color="gray">
              {formatChatTime(data?.createdAt)}
            </TextCustom>
          </View>
        </View>
      </BoxWithHeaderSection>
    </>
  );
}
