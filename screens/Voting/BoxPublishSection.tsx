import {
  BoxWithHeaderSection,
  AvatarUsernameAndOtherComponent,
  Spacing,
  StackCustom,
  TextCustom,
  BadgeCustom,
  Grid,
  CircleContainer,
} from "@/components";
import dayjs from "dayjs";
import { Href } from "expo-router";

export default function Voting_BoxPublishSection({
  href,
  id,
  bottomComponent,
}: {
  href?: Href
  id?: string
  bottomComponent?: React.ReactNode;
}) {
  return (
    <>
      <BoxWithHeaderSection href={href}>
        <AvatarUsernameAndOtherComponent avatarHref="/profile/1" />
        <Spacing />
        <StackCustom>
          <TextCustom align="center" bold truncate size="large">
            Voting Title {id}
          </TextCustom>

          <BadgeCustom
            style={{ width: "70%", alignSelf: "center" }}
            variant="light"
          >
            {dayjs().format("DD/MM/YYYY")} -{" "}
            {dayjs().add(1, "day").format("DD/MM/YYYY")}
          </BadgeCustom>

          <Grid>
            <Grid.Col span={3} style={{ alignItems: "center" }}>
              <CircleContainer value={"10"} />
            </Grid.Col>
            <Grid.Col span={3} style={{ alignItems: "center" }}>
              <CircleContainer value={"9"} />
            </Grid.Col>
            <Grid.Col span={3} style={{ alignItems: "center" }}>
              <CircleContainer value={"10"} />
            </Grid.Col>
            <Grid.Col span={3} style={{ alignItems: "center" }}>
              <CircleContainer value={"9"} />
            </Grid.Col>
          </Grid>
          {bottomComponent}
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
