/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  DummyLandscapeImage,
  Grid,
  ProgressCustom,
  StackCustom,
  TextCustom,
} from "@/components";
import { countDownAndCondition } from "@/utils/countDownAndCondition";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Donation_BoxPublish({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  const [value, setValue] = useState({
    sisa: 0,
    reminder: false,
  });
  
  useEffect(() => {
    updateCountDown();
  }, [data]);

  const updateCountDown = () => {
    const countDown = countDownAndCondition({
      duration: data?.durasiDonasi,
      publishTime: data?.publishTime,
    });

    setValue({
      sisa: countDown.durationDay,
      reminder: countDown.reminder,
    });
  };

  return (
    <>
      <BaseBox paddingTop={7} paddingBottom={7} href={`/donation/${id}`}>
        <Grid>
          <Grid.Col span={5}>
            <DummyLandscapeImage
              unClickPath
              height={100}
              imageId={data?.imageId}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <View />
          </Grid.Col>
          <Grid.Col span={6}>
            <StackCustom>
              <View style={{ gap: 10 }}>
                <TextCustom truncate={2} bold>
                  {data?.title || "-"}
                </TextCustom>
                <TextCustom size="small">
                  {value.reminder ? (
                    <TextCustom bold color="red">
                      Waktu berakhir
                    </TextCustom>
                  ) : (
                    <TextCustom>Sisa hari: {value.sisa}</TextCustom>
                  )}
                </TextCustom>
              </View>
              <ProgressCustom
                size="lg"
                value={Number(data?.progres) || 0}
                showLabel={true}
                label={data?.progres + "%"}
                animated
                color="primary"
              />
              {/* <TextCustom>
                 Terkumpul : Rp 300.000
                </TextCustom> */}
            </StackCustom>
          </Grid.Col>
        </Grid>
      </BaseBox>
    </>
  );
}
