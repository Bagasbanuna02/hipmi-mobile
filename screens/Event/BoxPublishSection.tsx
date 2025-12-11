import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  StackCustom,
  TextCustom,
} from "@/components";
import { Href } from "expo-router";

export default function Event_BoxPublishSection({
  href,
  data,

  // Avatar
  sourceAvatar,
  rightComponentAvatar,
}: {
  href: Href;
  data: any;

  // Avatar
  sourceAvatar?: string;
  rightComponentAvatar?: React.ReactNode;
}) {
  return (
    <>
      <BoxWithHeaderSection href={href}>
        <StackCustom gap={"xs"}>
          <AvatarUsernameAndOtherComponent
            avatarHref={`/profile/${data?.Author?.Profile?.id}`}
            name={data?.Author?.username || "-"}
            // rightComponent={rightComponentAvatar}
            avatar={data?.Author?.Profile?.imageId || ""}
          />
          <TextCustom truncate bold>
            {data?.title || "-"}
          </TextCustom>
          <TextCustom truncate={2}>{data?.deskripsi || "-"}</TextCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
