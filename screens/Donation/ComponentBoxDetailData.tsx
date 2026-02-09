import {
  BaseBox,
  DummyLandscapeImage,
  Grid,
  StackCustom,
  TextCustom,
} from "@/components";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import React from "react";
import { View } from "react-native";

export default function Donation_ComponentBoxDetailData({
  bottomSection,
  data,
  showSisaHari = true,
  sisaHari,
  reminder,
}: {
  bottomSection?: React.ReactNode;
  data: any;
  showSisaHari?: boolean;
  sisaHari: number;
  reminder: boolean;
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
            {reminder ? (
              <TextCustom bold color="red">
                Waktu berakhir
              </TextCustom>
            ) : showSisaHari ? (
              <TextCustom>Sisa hari: {sisaHari}</TextCustom>
            ) : null}
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
