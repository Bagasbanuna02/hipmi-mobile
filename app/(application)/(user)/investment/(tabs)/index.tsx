import {
  BaseBox,
  FloatingButton,
  Grid,
  LoaderCustom,
  ProgressCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import NoDataText from "@/components/_ShareComponent/NoDataText";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { apiInvestmentGetAll } from "@/service/api-client/api-investment";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import _ from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function InvestmentBursa() {
  const [list, setList] = useState<any[] | null>(null);
  const [loadingList, setLoadingList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onLoadList();
    }, [])
  );

  const onLoadList = async () => {
    try {
      setLoadingList(true);
      const response = await apiInvestmentGetAll();
      console.log("[DATA LIST]", JSON.stringify(response.data, null, 2));
      setList(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingList(false);
    }
  };

  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/investment/create")} />
      }
    >
      {loadingList ? (
        <LoaderCustom />
      ) : _.isEmpty(list) ? (
        <NoDataText />
      ) : (
        list?.map((item: any, index: number) => (
          <BaseBox
            key={index}
            paddingTop={7}
            paddingBottom={7}
            href={`/investment/${item.id}`}
          >
            <Grid>
              <Grid.Col span={5}>
                <Image
                  source={
                    item && item.imageId
                      ? API_STRORAGE.GET({ fileId: item.imageId })
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
                  <TextCustom truncate={2}>{item.title}</TextCustom>
                  <ProgressCustom
                    label={`${item.progress}%`}
                    value={item.progress}
                    size="lg"
                  />
                  {Number(item?.pencarianInvestor) -
                    dayjs().diff(dayjs(item.countDown), "days") <=
                  0 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Ionicons
                        name="alert-circle-outline"
                        size={16}
                        color="red"
                      />
                      <TextCustom color="red" size="small">
                        Periode Investasi Selesai
                      </TextCustom>
                    </View>
                  ) : (
                    <TextCustom>
                      Sisa waktu:{" "}
                      {Number(item?.pencarianInvestor) -
                        dayjs().diff(dayjs(item.countDown), "days")}{" "}
                      hari
                    </TextCustom>
                  )}
                </StackCustom>
              </Grid.Col>
            </Grid>
          </BaseBox>
        ))
      )}
    </ViewWrapper>
  );
}

//   <View style={{ padding: 20, gap: 16 }}>
//     <TextCustom>Progress 70%</TextCustom>
//     <ProgressCustom value={70} color="primary" size="md" />

//     <TextCustom>Success Progress</TextCustom>
//     <ProgressCustom value={40} color="success" size="lg" />

//     <TextCustom>Warning Progress (small)</TextCustom>
//     <ProgressCustom value={90} color="warning" size="sm" />

//     <TextCustom>Error Indeterminate</TextCustom>
//     <ProgressCustom value={null} color="error" size="md" />

//     <TextCustom>Custom Radius</TextCustom>
//     <ProgressCustom value={60} color="info" size="xl" radius={4} />

//     <ProgressCustom value={70} color="primary" size="lg" />

//     <ProgressCustom value={45} color="success" size="md" label="Halfway!" />

//     <ProgressCustom value={90} color="warning" size="lg" showLabel={false} />

//     <ProgressCustom value={null} color="error" size="sm" label="Loading..." />
//   </View>;
