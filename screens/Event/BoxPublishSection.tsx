import { BaseBox, StackCustom, AvatarUsernameAndOtherComponent, TextCustom } from "@/components";

export default function Event_BoxPublishSection({
    id,
    name,
    avatarHref,
    description,
    footerButton
}: {
    id: string;
    name?: string;
    avatarHref?: string;
    description?: string;
    footerButton?: React.ReactNode;
}) {
    return (
      <>
        <BaseBox href={`/event/${id}/publish`}>
          <StackCustom gap={"xs"}>
            <AvatarUsernameAndOtherComponent
              avatarHref={`/profile/${id}`}
              name="Lorem ipsum dolor sit"
            />
            <TextCustom truncate bold>
              Lorem ipsum dolor sit
            </TextCustom>
            <TextCustom truncate={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sed
              doloremque tempora soluta. Dolorem ex quidem ipsum tempora, ipsa,
              obcaecati quia suscipit numquam, voluptates commodi porro impedit
              natus quos doloremque!
            </TextCustom>
          </StackCustom>
        </BaseBox>
        {footerButton}
      </>
    );
}
    