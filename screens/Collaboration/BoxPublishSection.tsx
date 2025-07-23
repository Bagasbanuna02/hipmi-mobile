import {
  BoxWithHeaderSection,
  StackCustom,
  AvatarUsernameAndOtherComponent,
  TextCustom,
  BaseBox,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
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
          />
          <BaseBox backgroundColor={MainColor.soft_darkblue}>
            <StackCustom>
              <TextCustom truncate={2} size="large" bold align="center">
                {title || "Lorem ipsum dolor sit"}
              </TextCustom>
              <TextCustom truncate={2}>
                {description ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa, obcaecati quia suscipit numquam, voluptates commodi porro impedit natus quos doloremque!"}
              </TextCustom>
            </StackCustom>
          </BaseBox>

          <TextCustom bold size="small" align="center">
            2 Partisipan
          </TextCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}

export default Collaboration_BoxPublishSection;
