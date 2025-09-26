import {
  AvatarComp,
  BaseBox,
  ClickableCustom,
  Grid,
  Spacing,
  TextCustom,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { GStyles } from "@/styles/global-styles";
import { formatChatTime } from "@/utils/formatChatTime";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { View } from "react-native";

export default function Forum_BoxDetailSection({
  data,
  isTruncate,
  href,
  isRightComponent = true,
  onSetData,
}: {
  data: any;
  isTruncate?: boolean;
  href?: Href;
  isRightComponent?: boolean;
  onSetData: ({
    setDataId,
    setStatus,
    setOpenDrawer,
    setAuthorId,
  }: {
    setDataId: string;
    setStatus: string;
    setOpenDrawer: boolean;
    setAuthorId: string;
  }) => void;
}) {
  const deskripsiView = (
    <View style={GStyles.forumBox}>
      {isTruncate ? (
        <TextCustom truncate={2}>{data?.diskusi}</TextCustom>
      ) : (
        <TextCustom>{data?.diskusi}</TextCustom>
      )}
    </View>
  );

  return (
    <>
      <BaseBox>
        <View>
          <Grid>
            <Grid.Col span={2}>
              <AvatarComp
                fileId={data?.Author?.Profile?.imageId}
                href={`/profile/${data?.Author?.Profile?.id}`}
                size={"base"}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextCustom truncate>{data?.Author?.username}</TextCustom>
              {data?.ForumMaster_StatusPosting?.status === "Open" ? (
                <TextCustom bold size="small" color="green">
                  {data?.ForumMaster_StatusPosting?.status}
                </TextCustom>
              ) : (
                <TextCustom bold size="small" color="red">
                  {data?.ForumMaster_StatusPosting?.status}
                </TextCustom>
              )}
            </Grid.Col>

            <Grid.Col
              span={4}
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              {isRightComponent && (
                <ClickableCustom
                  onPress={() => {
                    onSetData({
                      setDataId: data?.id,
                      setStatus: data?.ForumMaster_StatusPosting?.status,
                      setAuthorId: data?.Author?.id,
                      setOpenDrawer: true,
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
              )}
            </Grid.Col>
          </Grid>

          {href ? (
            <ClickableCustom onPress={() => router.push(href as any)}>
              {deskripsiView}
            </ClickableCustom>
          ) : (
            deskripsiView
          )}

          <Spacing height={10} />

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
                <TextCustom>{data?.count}</TextCustom>
              </View>
            </Grid.Col>
            <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
              <TextCustom truncate size="small" color="gray">
                {formatChatTime(data?.createdAt)}
              </TextCustom>
            </Grid.Col>
          </Grid>
        </View>
      </BaseBox>
    </>
  );
}
