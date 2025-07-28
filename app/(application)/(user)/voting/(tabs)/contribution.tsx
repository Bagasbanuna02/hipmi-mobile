import {
  BadgeCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { GStyles } from "@/styles/global-styles";

export default function VotingContribution() {
  const bottomComponent = (
    <StackCustom>
      <TextCustom align="center">Pilihan Anda:</TextCustom>
      <BadgeCustom style={[GStyles.alignSelfCenter]}>Pilihan 1</BadgeCustom>
    </StackCustom>
  );
  return (
    <ViewWrapper hideFooter>
      {Array.from({ length: 5 }).map((_, index) => (
        <Voting_BoxPublishSection
          key={index}
          bottomComponent={bottomComponent}
        />
      ))}
    </ViewWrapper>
  );
}
