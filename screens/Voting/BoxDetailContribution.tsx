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
  headerAvatar,
}: {
  headerAvatar?: React.ReactNode;
}) {
  return (
    <>
      <BoxWithHeaderSection>
        {headerAvatar ? headerAvatar : <Spacing />}
        <StackCustom gap={"lg"}>
          <Voting_ComponentDetailDataSection />

          <StackCustom gap={"xs"}>
            <TextCustom bold size="small" align="center">
              Pilihan Anda
            </TextCustom>
            <BadgeCustom style={[GStyles.alignSelfCenter]}>
              Pilihan 1
            </BadgeCustom>
          </StackCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
