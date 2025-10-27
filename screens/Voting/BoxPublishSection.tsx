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
  data,
}: {
  href?: Href;
  id?: string;
  bottomComponent?: React.ReactNode;
  data?: any;
}) {
  return (
    <>
      <BoxWithHeaderSection href={href}>
        <AvatarUsernameAndOtherComponent
          avatar={data?.Author?.Profile?.imageId || ""}
          name={data?.Author?.username || "Username"}
          avatarHref="/profile/1"
        />
        <Spacing height={0} />
        <StackCustom gap={"lg"}>
          <TextCustom align="center" bold truncate size="large">
            {data?.title || "-"}
          </TextCustom>

          <BadgeCustom
            style={{ width: "70%", alignSelf: "center" }}
            variant="light"
          >
            {dayjs(data?.awalVote).format("DD/MM/YYYY")} -{" "}
            {dayjs(data?.akhirVote).format("DD/MM/YYYY")}
          </BadgeCustom>

          {/* <Grid>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid.Col span={3} style={{ alignItems: "center" }} key={i}>
                <CircleContainer value={9 % (i + 4)} />
                <TextCustom size="small">Pilihan {i + 1}</TextCustom>
              </Grid.Col>
            ))}
          </Grid> */}
          {bottomComponent}
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
