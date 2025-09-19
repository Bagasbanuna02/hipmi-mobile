import {
  BadgeCustom,
  BoxWithHeaderSection,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { GStyles } from "@/styles/global-styles";
import { Voting_ComponentDetailDataSection } from "./ComponentDetailDataSection";

export function Voting_BoxDetailContributionSection({
  data,
  headerAvatar,
  nameChoice,
}: {
  data: any;
  headerAvatar?: React.ReactNode;
  nameChoice?: string;
}) {
  return (
    <>
      <BoxWithHeaderSection>
        {headerAvatar && (
          <>
            {headerAvatar}
            <Spacing />
          </>
        )}
        <StackCustom gap={"lg"}>
          <Voting_ComponentDetailDataSection data={data} />

          <StackCustom gap={"sm"}>
            <TextCustom bold size="small" align="center">
              Pilihan Anda
            </TextCustom>
            <BadgeCustom variant="light" size="lg" style={[GStyles.alignSelfCenter]}>
              {nameChoice || "-"}
            </BadgeCustom>
          </StackCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
