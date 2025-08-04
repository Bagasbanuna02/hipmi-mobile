import {
  BaseBox,
  StackCustom,
  DummyLandscapeImage,
  TextCustom,
  Grid,
} from "@/components";
import React from "react";
import { View } from "react-native";

export default function Donation_ComponentBoxDetailData({
  bottomSection,
}: {
  bottomSection?: React.ReactNode;
}) {
  return (
    <>
      <BaseBox>
        <StackCustom>
          <DummyLandscapeImage />
          <View>
            <TextCustom bold size="large">
              Judul Donasi: Lorem, ipsum dolor sit amet consectetur adipisicing
              elit.
            </TextCustom>
            <TextCustom size="small">Durasi: 30 hari</TextCustom>
          </View>

          <Grid>
            <Grid.Col span={6}>
              <View>
                <TextCustom size="small">Target Dana</TextCustom>
                <TextCustom truncate={2} size="large" bold color="yellow">
                  Rp. 7.500.000
                </TextCustom>
              </View>
            </Grid.Col>
            <Grid.Col span={6}>
              <View>
                <TextCustom size="small">Kategori</TextCustom>
                <TextCustom size="large" bold color="yellow">
                  Kegiatan Sosial
                </TextCustom>
              </View>
            </Grid.Col>
          </Grid>
          {bottomSection}
        </StackCustom>
      </BaseBox>
    </>
  );
}
