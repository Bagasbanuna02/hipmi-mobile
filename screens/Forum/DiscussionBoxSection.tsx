import {
  AvatarComp,
  BaseBox,
  ClickableCustom,
  Grid,
  Spacing,
  TextCustom
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { View } from "react-native";

export default function Forum_BoxDetailSection({
  data,
  isTruncate,
  setOpenDrawer,
  setStatus,
  href,
}: {
  data: any;
  isTruncate?: boolean;
  setOpenDrawer: (value: boolean) => void;
  setStatus: (value: string) => void;
  href?: Href;
}) {
  const deskripsiView = (
    <View
      style={{
        backgroundColor: MainColor.soft_darkblue,
        padding: 8,
        borderRadius: 8,
        paddingBlock: 20,
      }}
    >
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
            <Grid.Col span={8}>
              <TextCustom>{data?.Author?.username}</TextCustom>
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
              span={2}
              style={{
                justifyContent: "center",
              }}
            >
              <ClickableCustom
                onPress={() => {
                  setOpenDrawer(true);
                  setStatus(data?.ForumMaster_StatusPosting?.status);
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
                <TextCustom>{data?.Forum_Komentar?.length}</TextCustom>
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
