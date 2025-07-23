import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  StackCustom,
  TextCustom
} from "@/components";
import { Href } from "expo-router";

function Collaboration_BoxPublishSection({
  id,
  title,
  username,
  description,
  href,

  // Avatar
  sourceAvatar,
  rightComponentAvatar,
}: {
  id: string;
  title?: string;
  username?: string;
  description?: string;
  href: Href;

  // Avatar
  sourceAvatar?: string;
  rightComponentAvatar?: React.ReactNode;
}) {
  return (
    <>
      <BoxWithHeaderSection href={href}>
        <StackCustom gap={0}>
          <AvatarUsernameAndOtherComponent
            avatarHref={`/profile/${id}`}
            name={username || "Username"}
            rightComponent={rightComponentAvatar}
            avatar={sourceAvatar as any}
            withBottomLine
          />

          <StackCustom>
            <TextCustom truncate={2} size="large" bold align="center">
              {title || "Lorem ipsum dolor sit"}
            </TextCustom>
            <TextCustom truncate={2}>
              {description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa, obcaecati quia suscipit numquam, voluptates commodi porro impedit natus quos doloremque!"}
            </TextCustom>
            {/* <TextCustom bold size="small" >
            2 Partisipan
          </TextCustom> */}
          </StackCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}

export default Collaboration_BoxPublishSection;
