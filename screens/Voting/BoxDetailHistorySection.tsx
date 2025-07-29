import {
  BoxWithHeaderSection,
  Spacing,
  StackCustom
} from "@/components";
import { Voting_ComponentDetailDataSection } from "./ComponentDetailDataSection";

export function Voting_BoxDetailHistorySection({
  headerAvatar,
}: {
  headerAvatar?: React.ReactNode;
}) {
  return (
    <>
      <BoxWithHeaderSection>
        {headerAvatar ? headerAvatar : <Spacing />}
        <StackCustom>
          <Voting_ComponentDetailDataSection />
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
