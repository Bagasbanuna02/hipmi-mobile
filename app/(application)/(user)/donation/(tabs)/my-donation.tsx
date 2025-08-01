import {
    BadgeCustom,
    BaseBox,
    DummyLandscapeImage,
    Grid,
    StackCustom,
    TextCustom,
    ViewWrapper
} from "@/components";
import { dummyMasterStatusTransaction } from "@/lib/dummy-data/_master/status-transaction";
import { View } from "react-native";

export default function DonationMyDonation() {
  const randomStatusData = Array.from({ length: 10 }, () => {
    const randomIndex = Math.floor(
      Math.random() * dummyMasterStatusTransaction.length
    );
    return dummyMasterStatusTransaction[randomIndex];
  });
  return (
    <ViewWrapper hideFooter>
      {randomStatusData.map((item, index) => (
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
