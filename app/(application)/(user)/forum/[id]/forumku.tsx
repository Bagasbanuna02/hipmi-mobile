import {
  AvatarCustom,
  ButtonCustom,
  CenterCustom,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import Forum_BerandaSection from "@/screens/Forum/berandaSection";
import { useLocalSearchParams } from "expo-router";

export default function Forumku() {
  const { id } = useLocalSearchParams();
  return (
    <ViewWrapper>
      <StackCustom>
        <CenterCustom>
          <AvatarCustom
            href={`/(application)/(image)/preview-image/${id}`}
            size="xl"
          />
        </CenterCustom>

        <Grid>
          <Grid.Col span={6}>
            <TextCustom bold truncate>
              @bagas_banuna
            </TextCustom>
            <TextCustom>1 postingan</TextCustom>
          </Grid.Col>
          <Grid.Col span={6} style={{ alignItems: "flex-end" }}>
            <ButtonCustom href={`/profile/${id}`}>
              Kunjungi Profile
            </ButtonCustom>
          </Grid.Col>
        </Grid>
      <Forum_BerandaSection />
      </StackCustom>
    </ViewWrapper>
  );
}
