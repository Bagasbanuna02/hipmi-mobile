import {
    BaseBox,
    DummyLandscapeImage,
    FloatingButton,
    Grid,
    ProgressCustom,
    StackCustom,
    TextCustom,
    ViewWrapper,
} from "@/components";
import { router } from "expo-router";
import { View } from "react-native";

export default function DonationBeranda() {
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/donation/create")} />
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox
          key={index}
          paddingTop={7}
          paddingBottom={7}
          href={`/investment/${index}`}
        >
          <Grid>
            <Grid.Col span={5}>
              <DummyLandscapeImage height={100} />
            </Grid.Col>
            <Grid.Col span={1}>
              <View />
            </Grid.Col>
            <Grid.Col span={6}>
              <StackCustom>
                <View>
                  <TextCustom truncate>
                    Judul Donasi: Lorem ipsum dolor sit amet consectetur
                    adipisicing elit.
                  </TextCustom>
                  <TextCustom size="small">Sisa hari: 0</TextCustom>
                </View>
                <ProgressCustom value={(index % 5) * 20} size="lg" />
                {/* <TextCustom>
                 Terkumpul : Rp 300.000
                </TextCustom> */}
              </StackCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
