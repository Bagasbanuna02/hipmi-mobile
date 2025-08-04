import {
  AvatarCustom,
  BaseBox,
  ButtonCustom,
  CenterCustom,
  Grid,
  Spacing,
  TextCustom,
  ViewWrapper
} from "@/components";
import Donation_BoxPublish from "@/screens/Donation/BoxPublish";
import React from "react";

export default function DonationInformationFunrising() {
  return (
    <>
      <ViewWrapper>
        <BaseBox>
          <Grid>
            <Grid.Col span={6} style={{ justifyContent: "center" }}>
              <CenterCustom>
                <AvatarCustom size="lg" />
                <TextCustom bold size="large" truncate>
                  @Username
                </TextCustom>
              </CenterCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ justifyContent: "center" }}>
              <ButtonCustom href={`/profile/1234`}>
                Kunjungi Profile
              </ButtonCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>

        <Spacing />

        {Array.from({ length: 10 }).map((_, index) => (
          <Donation_BoxPublish key={index} id={index.toString()} />
        ))}
      </ViewWrapper>
    </>
  );
}
