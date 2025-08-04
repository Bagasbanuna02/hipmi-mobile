import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  Grid,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function InvestmentInputDonation() {
  const { id } = useLocalSearchParams();
  const bottomComponent = (
    <BoxButtonOnFooter>
      <ButtonCustom
        onPress={() => router.replace(`/donation/${id}/select-bank`)}
      >
        Lanjutan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={bottomComponent}>
        {listData.map((item, i) => (
          <BaseBox key={i}>
            <Grid>
              <Grid.Col span={8}>
                <TextCustom bold size="large">
                  Rp. {item.label}
                </TextCustom>
              </Grid.Col>
              <Grid.Col span={4}>
                <Ionicons
                  name="chevron-forward"
                  size={ICON_SIZE_SMALL}
                  color={MainColor.yellow}
                  style={{ alignSelf: "flex-end" }}
                />
              </Grid.Col>
            </Grid>
          </BaseBox>
        ))}

        <BaseBox>
          <TextInputCustom
            label="Nominal lainnya"
            placeholder="0"
            iconLeft="Rp."
          />
          <TextCustom size="small" color="gray">
            Minimal donasi Rp. 10.000
          </TextCustom>
        </BaseBox>
      </ViewWrapper>
    </>
  );
}

const listData = [
  {
    label: "25.000",
    value: 25000,
  },
  {
    label: "50.000",
    value: 50000,
  },
  {
    label: "100.000",
    value: 100000,
  },
  {
    label: "250.000",
    value: 250000,
  },
];
