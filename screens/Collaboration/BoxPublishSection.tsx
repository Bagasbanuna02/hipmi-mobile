import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  StackCustom,
  TextCustom
} from "@/components";
import { Href } from "expo-router";

function Collaboration_BoxPublishSection({
  href,
  data,
  rightComponentAvatar,
}: {
  href: Href;
  data: any;
  rightComponentAvatar?: React.ReactNode;
}) {

  return (
    <>
      <BoxWithHeaderSection href={href}>
        <StackCustom gap={0}>
          <AvatarUsernameAndOtherComponent
            avatarHref={`/profile/${data?.Author?.Profile?.id}`}
            name={data?.Author?.username || "Username"}
            rightComponent={rightComponentAvatar}
            avatar={data?.Author?.Profile?.imageId}
            // withBottomLine
          />

          <StackCustom style={{paddingBlock: 10}}>
            <TextCustom truncate size="large" bold align="center">
              {data?.title || "-"}
            </TextCustom>
            {/* <TextCustom truncate={2}>{data?.purpose || "-"}</TextCustom> */}
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
