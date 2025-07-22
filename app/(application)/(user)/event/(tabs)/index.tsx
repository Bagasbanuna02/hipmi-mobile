/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AvatarUsernameAndOtherComponent,
  BaseBox,
  StackCustom,
  TextCustom,
} from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import FloatingButton from "@/components/Button/FloatingButton";
import { router } from "expo-router";

export default function Event() {
  const index = "test-id-event";
  const status = "publish";
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/event/create")} />
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox key={index} href={`/event/${index}/${status}/detail-event`}>
          <StackCustom gap={"xs"}>
            <AvatarUsernameAndOtherComponent
              avatarHref={`/profile/${index}`}
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
      ))}
    </ViewWrapper>
  );
}
