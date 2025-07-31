import {
  BadgeCustom,
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { GStyles } from "@/styles/global-styles";
import dayjs from "dayjs";
import { View } from "react-native";

export default function InvestmentTransaction() {
  return (
    <ViewWrapper hideFooter>
      {Array.from({ length: 10 }).map((_, i) => (
        <BaseBox key={i} paddingTop={7} paddingBottom={7}>
          <Grid>
            <Grid.Col span={6}>
              <StackCustom gap={"xs"}>
                <TextCustom truncate>
                  Title Investment: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Am culpa excepturi deleniti soluta animi
                  porro amet ducimus.
                </TextCustom>
                <TextCustom color="gray" size="small">
                  {dayjs().format("DD/MM/YYYY")}
                </TextCustom>
              </StackCustom>
            </Grid.Col>
            <Grid.Col span={1}>
              <View />
            </Grid.Col>
            <Grid.Col span={5} style={{ alignItems: "flex-end" }}>
              <StackCustom gap={"xs"}>
                <TextCustom bold truncate>
                  Rp. 7.500.000
                </TextCustom>
                <BadgeCustom
                  variant="light"
                  color="success"
                  style={GStyles.alignSelfFlexEnd}
                >
                  Berhasil
                </BadgeCustom>
              </StackCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
