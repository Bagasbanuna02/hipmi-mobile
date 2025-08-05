import {
  BadgeCustom,
  BaseBox,
  DummyLandscapeImage,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { dummyMasterStatusTransaction } from "@/lib/dummy-data/_master/status-transaction";
import { router } from "expo-router";
import { View } from "react-native";

export default function DonationMyDonation() {
  const randomStatusData = Array.from({ length: 10 }, () => {
    const randomIndex = Math.floor(
      Math.random() * dummyMasterStatusTransaction.length
    );
    return dummyMasterStatusTransaction[randomIndex];
  });

  const handlePress = (value: string) => {
    if (value === "menunggu") {
      router.push(`/donation/${value}/(transaction-flow)/123/invoice`);
    } else if (value === "proses") {
      router.push(`/donation/${value}/(transaction-flow)/123/process`);
    } else if (value === "berhasil") {
      router.push(`/donation/${value}/(transaction-flow)/123/success`);
    } else if (value === "gagal") {
      router.push(`/donation/${value}/(transaction-flow)/123/failed`);
    }
  };

  return (
    <ViewWrapper hideFooter>
      {randomStatusData.map((item, index) => (
        <BaseBox
          key={index}
          paddingTop={7}
          paddingBottom={7}
          onPress={() => {
            handlePress(item.value);
          }}
        >
          <Grid>
            <Grid.Col span={5}>
              <DummyLandscapeImage height={100} unClickPath />
            </Grid.Col>
            <Grid.Col span={1}>
              <View />
            </Grid.Col>
            <Grid.Col span={6}>
              <StackCustom gap={"sm"}>
                <View>
                  <TextCustom truncate>
                    Judul Donasi: Lorem ipsum dolor sit amet consectetur
                    adipisicing elit.
                  </TextCustom>
                </View>
                <View>
                  <TextCustom>Donasi Saya</TextCustom>
                  <TextCustom bold color="yellow">
                    Rp. 7.500.000
                  </TextCustom>
                </View>
                <BadgeCustom variant="light" color={item.color} fullWidth>
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
