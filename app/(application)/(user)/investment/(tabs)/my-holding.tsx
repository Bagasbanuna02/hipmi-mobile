import {
  BaseBox,
  Grid,
  ProgressCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { View } from "react-native";

export default function InvestmentMyHolding() {
  return (
    <ViewWrapper hideFooter>
      {Array.from({ length: 10 }).map((_, index) => (
        <BaseBox key={index} paddingTop={7} paddingBottom={7}>
          <Grid>
            <Grid.Col span={6}>
              <StackCustom gap={"xs"}>
                <TextCustom truncate={2}>
                  Title here : Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Omnis, exercitationem, sequi enim quod
                  distinctio maiores laudantium amet, quidem atque repellat sit
                  vitae qui aliquam est veritatis laborum eum voluptatum totam!
                </TextCustom>

                <Spacing height={5} />
                <TextCustom size="small">Rp. 7.500.000</TextCustom>
                <TextCustom size="small">300 Lembar</TextCustom>
              </StackCustom>
            </Grid.Col>
            <Grid.Col span={1}>
              <View />
            </Grid.Col>
            <Grid.Col
              span={5}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProgressCustom value={(index % 5) * 20} size="lg" />
            </Grid.Col>
          </Grid>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
