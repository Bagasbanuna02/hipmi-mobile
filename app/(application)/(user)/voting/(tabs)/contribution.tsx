import {
  ViewWrapper
} from "@/components";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";

export default function VotingContribution() {
  return (
    <ViewWrapper hideFooter>
      {Array.from({ length: 5 }).map((_, index) => (
        <Voting_BoxPublishSection
          key={index}
          href={`/voting/${index}/contribution`}
        />
      ))}
    </ViewWrapper>
  );
}
