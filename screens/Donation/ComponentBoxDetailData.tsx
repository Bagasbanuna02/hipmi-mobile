import {
  BaseBox,
  StackCustom,
  DummyLandscapeImage,
  TextCustom,
  Grid,
} from "@/components";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import React from "react";
import { View } from "react-native";

export default function Donation_ComponentBoxDetailData({
  bottomSection,
  data,
}: {
  bottomSection?: React.ReactNode;
  data: any;
}) {
  return (
    <>
      <BaseBox>
        <StackCustom>
          <DummyLandscapeImage imageId={data?.imageId} />
          <View>
            <TextCustom bold size="large">
              {data?.title || "-"}
            </TextCustom>
            <TextCustom size="small">
              Durasi: {data?.DonasiMaster_Durasi?.name || "-"}
            </TextCustom>
          </View>

          <Grid>
            <Grid.Col span={6}>
              <View>
                <TextCustom size="small">Target Dana</TextCustom>
                <TextCustom truncate={2} size="large" bold color="yellow">
                  Rp. {formatCurrencyDisplay(data?.target) || "-"}
                </TextCustom>
              </View>
            </Grid.Col>
            <Grid.Col span={6}>
              <View>
                <TextCustom size="small">Kategori</TextCustom>
                <TextCustom size="large" bold color="yellow">
                  {data?.DonasiMaster_Ketegori?.name || "-"}
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
