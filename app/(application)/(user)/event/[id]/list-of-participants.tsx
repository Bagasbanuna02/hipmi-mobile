import {
  AvatarUsernameAndOtherComponent,
  BaseBox,
  ViewWrapper,
} from "@/components";

export default function EventListOfParticipants() {
  return (
    <ViewWrapper>
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox key={index} paddingBlock={0}>
          <AvatarUsernameAndOtherComponent avatarHref={`/profile/${index}`} />
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
