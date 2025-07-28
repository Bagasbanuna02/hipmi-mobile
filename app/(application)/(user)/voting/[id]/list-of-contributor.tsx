import {
    AvatarUsernameAndOtherComponent,
    BaseBox,
    ViewWrapper
} from "@/components";

export default function Voting_ListOfContributor() {
  return (
    <ViewWrapper>
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox key={index.toString()}>
          <AvatarUsernameAndOtherComponent />
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
