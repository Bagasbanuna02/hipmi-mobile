import {
  BaseBox,
  FloatingButton,
  Grid,
  ProgressCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { router } from "expo-router";
import { View } from "react-native";

export default function InvestmentBursa() {
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/investment/create")} />
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox key={index} paddingTop={7} paddingBottom={7}>
          <Grid>
            <Grid.Col span={5}>
              <Image
                source={DUMMY_IMAGE.background}
                style={{ width: "auto", height: 100, borderRadius: 10 }}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <View />
            </Grid.Col>
            <Grid.Col span={6}>
              <StackCustom>
                <TextCustom truncate={2}>
                  Title here : Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Omnis, exercitationem, sequi enim quod
                  distinctio maiores laudantium amet, quidem atque repellat sit
                  vitae qui aliquam est veritatis laborum eum voluptatum totam!
                </TextCustom>
                <ProgressCustom value={index % 5 * 20} size="lg" />
                <TextCustom>
                  Sisa waktu: {dayjs().diff(dayjs(), "day")} hari
                </TextCustom>
              </StackCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>
      ))}
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