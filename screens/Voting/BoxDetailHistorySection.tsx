import {
  BadgeCustom,
  BoxWithHeaderSection,
  Spacing,
  StackCustom,
  TextCustom
} from "@/components";
import { Voting_ComponentDetailDataSection } from "./ComponentDetailDataSection";
import { GStyles } from "@/styles/global-styles";

export function Voting_BoxDetailHistorySection({
  headerAvatar,
  data,
  nameChoice,
}: {
  headerAvatar?: React.ReactNode;
  data: any;
  nameChoice: string;
}) {
  return (
    <>
      <BoxWithHeaderSection>
        {headerAvatar ? headerAvatar : <Spacing />}
        <StackCustom>
          <Voting_ComponentDetailDataSection data={data}  />
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
