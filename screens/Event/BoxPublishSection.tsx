import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  StackCustom,
  TextCustom,
} from "@/components";

export default function Event_BoxPublishSection({
  id,
  title,
  username,
  description,

  // Avatar
  sourceAvatar,
  rightComponentAvatar,
}: {
  id: string;
  title?: string;
  username?: string;
  description?: string;

  // Avatar
  sourceAvatar?: string;
  rightComponentAvatar?: React.ReactNode;
}) {
  return (
    <>
      <BoxWithHeaderSection href={`/event/${id}/history`}>
        <StackCustom gap={"xs"}>
          <AvatarUsernameAndOtherComponent
            avatarHref={`/profile/${id}`}
            name={username || "Lorem ipsum dolor sit"}
            rightComponent={rightComponentAvatar}
            avatar={sourceAvatar as any}
          />
          <TextCustom truncate bold>
            {title || "Lorem ipsum dolor sit"}
          </TextCustom>
          <TextCustom truncate={2}>
            {description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa, obcaecati quia suscipit numquam, voluptates commodi porro impedit natus quos doloremque!"}
          </TextCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
