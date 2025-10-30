/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
  ProgressCustom,
} from "@/components";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { countDownAndCondition } from "@/utils/countDownAndCondition";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Investment_BoxBerandaSection({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
//   console.log("[DATA By one]", JSON.stringify(data, null, 2));

  const [value, setValue] = useState({
    sisa: 0,
    reminder: false,
  });

  useEffect(() => {
    updateCountDown();
  }, [data]);

  const updateCountDown = () => {
    const countDown = countDownAndCondition({
      duration: data?.pencarianInvestor,
      publishTime: data?.countDown,
    });

    setValue({
      sisa: countDown.durationDay,
      reminder: countDown.reminder,
    });
  };

  return (
    <>
      <BaseBox paddingTop={7} paddingBottom={7} href={`/investment/${id}`}>
        <Grid>
          <Grid.Col span={5}>
            <Image
              source={
                data && data.imageId
                  ? API_STRORAGE.GET({ fileId: data.imageId })
                  : DUMMY_IMAGE.background
              }
              style={{ width: "auto", height: 100, borderRadius: 10 }}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <View />
          </Grid.Col>
          <Grid.Col span={6}>
            <StackCustom>
              <TextCustom truncate={2}>{data.title}</TextCustom>
              <ProgressCustom
                label={`${data.progress}%`}
                value={data.progress}
                size="lg"
              />
              {value.reminder ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Ionicons name="alert-circle-outline" size={16} color="red" />
                  <TextCustom truncate color="red" size="small">
                    Periode Investasi Berakhir
                  </TextCustom>
                </View>
              ) : (
                <TextCustom>
                  Sisa waktu: {value.sisa} hari
                </TextCustom>
              )}
            </StackCustom>
          </Grid.Col>
        </Grid>
      </BaseBox>
    </>
  );
}
