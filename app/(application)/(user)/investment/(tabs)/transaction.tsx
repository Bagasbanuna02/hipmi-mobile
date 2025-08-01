import {
  BadgeCustom,
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { dummyMasterStatusTransaction } from "@/lib/dummy-data/_master/status-transaction";
import { GStyles } from "@/styles/global-styles";
import dayjs from "dayjs";
import { router } from "expo-router";
import { View } from "react-native";

export default function InvestmentTransaction() {
  const randomStatusData = Array.from({ length: 10 }, () => {
    const randomIndex = Math.floor(
      Math.random() * dummyMasterStatusTransaction.length
    );
    return dummyMasterStatusTransaction[randomIndex];
  });

  const handlePress = (value: string) => {
    if (value === "menunggu") {
      router.push(`/investment/${value}/(transaction-flow)/invoice`);
    } else if (value === "proses") {
      router.push(`/investment/${value}/(transaction-flow)/process`);
    } else if (value === "berhasil") {
      router.push(`/investment/${value}/(transaction-flow)/success`);
    } else if (value === "gagal") {
      router.push(`/investment/${value}/(transaction-flow)/failed`);
    }
  };

  return (
    <ViewWrapper hideFooter>
      {randomStatusData.map((item, i) => (
        <BaseBox
          key={i}
          paddingTop={7}
          paddingBottom={7}
          onPress={() => {
            handlePress(item.value);
          }}
        >
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
                  color={item.color}
                  style={GStyles.alignSelfFlexEnd}
                >
                  {item.label}
                </BadgeCustom>
              </StackCustom>
            </Grid.Col>
          </Grid>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
