import { BadgeCustom, StackCustom, TextCustom } from "@/components";
import { GStyles } from "@/styles/global-styles";
import { dateTimeView } from "@/utils/dateTimeView";

export function Voting_ComponentDetailDataSection({ data }: { data?: any }) {
  return (
    <>
      <TextCustom align="center" bold size="large">
        {data?.title || "-"}
      </TextCustom>
      <TextCustom>{data?.deskripsi || "-"}</TextCustom>
      <StackCustom gap={"sm"}>
        <TextCustom bold size="small" align="center">
          Batas Voting
        </TextCustom>
        <BadgeCustom
          style={[GStyles.alignSelfCenter, { width: "70%" }]}
          variant="light"
        >
          {data?.awalVote &&
            dateTimeView({ date: data?.awalVote, withoutTime: true })}{" "}
          -{" "}
          {data?.akhirVote &&
            dateTimeView({ date: data?.akhirVote, withoutTime: true })}
        </BadgeCustom>
      </StackCustom>
    </>
  );
}
