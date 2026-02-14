import {
  BadgeCustom,
  BaseBox,
  Grid,
  StackCustom,
  TextCustom
} from "@/components";
import dayjs from "dayjs";
import { View } from "moti";

interface Admin_BoxEventParticipantProps {
  item: any;
  startDate?: dayjs.Dayjs;
}

export function Admin_BoxEventParticipant({
  item,
  startDate,
}: Admin_BoxEventParticipantProps) {
  
  return (
    <BaseBox>
      <Grid>
        <Grid.Col span={6}>
          <StackCustom gap={"sm"}>
            <TextCustom bold truncate>
              {item?.User?.username}
            </TextCustom>
            <TextCustom>+{item?.User?.nomor}</TextCustom>
          </StackCustom>
        </Grid.Col>
        <Grid.Col span={6} style={{ justifyContent: "center" }}>
          {startDate && startDate.subtract(1, "hour").diff(dayjs()) < 0 ? (
            <BadgeCustom
              style={{ alignSelf: "flex-end" }}
              color={item?.isPresent ? "green" : "red"}
            >
              {item?.isPresent ? "Hadir" : "Tidak Hadir"}
            </BadgeCustom>
          ) : (
            <View
              style={{
                justifyContent: "flex-end",
              }}
            >
              <BadgeCustom style={{ alignSelf: "flex-end" }} color="gray">
                -
              </BadgeCustom>
            </View>
          )}
        </Grid.Col>
      </Grid>
    </BaseBox>
  );
}
