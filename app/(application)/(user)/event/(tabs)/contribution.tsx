import {
  AvatarCustom,
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import React from "react";

export default function EventContribution() {
  return (
    <ViewWrapper hideFooter>
      {Array.from({ length: 10 }).map((_, index) => (
        <BoxWithHeaderSection key={index} href={`/event/${index}/contribution`}>
          <StackCustom>
            <AvatarUsernameAndOtherComponent
              avatarHref={`/profile/${index}`}
              rightComponent={
                <TextCustom truncate>
                  {new Date().toLocaleDateString()}
                </TextCustom>
              }
            />

            <TextCustom bold align="center" size="xlarge">
              Judul Event Disini
            </TextCustom>

            <Grid>
              {Array.from({ length: 4 }).map((_, index2) => (
                <Grid.Col span={3} key={index2}>
                  <AvatarCustom size="sm" href={`/profile/${index2}`} />
                </Grid.Col>
              ))}
            </Grid>
          </StackCustom>
        </BoxWithHeaderSection>
      ))}
    </ViewWrapper>
  );
}
