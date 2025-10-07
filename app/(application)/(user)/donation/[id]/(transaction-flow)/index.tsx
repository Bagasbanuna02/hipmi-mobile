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
import { LOCAL_STORAGE_KEY } from "@/constants/local-storage-key";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function InvestmentInputDonation() {
  const { id } = useLocalSearchParams();
  const [nominal, setNominal] = useState<number>(0);

  const handlerSubmit = async () => {
    try {
      console.log("jumlah", nominal);
      await AsyncStorage.setItem(
        LOCAL_STORAGE_KEY.transactionDonation,
        JSON.stringify({ nominal: nominal.toString() })
      );
      router.replace(`/donation/${id}/select-bank`);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const displayJumlah = formatCurrencyDisplay(nominal);

  const handleChangeCurrency = (text: string) => {
    const numeric = text.replace(/\D/g, "");
    setNominal(Number(numeric));
  };

  const bottomComponent = (
    <BoxButtonOnFooter>
      <ButtonCustom
        disabled={nominal < 10000 || nominal === 0}
        onPress={() => {
          handlerSubmit();
        }}
      >
        Lanjutan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={bottomComponent}>
        {listData.map((item, i) => (
          <BaseBox key={i} onPress={() => setNominal(item.value)}>
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
            value={displayJumlah}
            onChangeText={(value) => handleChangeCurrency(value)}
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
