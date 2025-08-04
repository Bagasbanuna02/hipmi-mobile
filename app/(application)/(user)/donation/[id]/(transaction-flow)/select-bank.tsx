import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  ViewWrapper,
} from "@/components";
import { RadioCustom, RadioGroup } from "@/components/Radio/RadioCustom";
import { dummyMasterBank } from "@/lib/dummy-data/_master/bank";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function DonationSelectBank() {
  const { id, transaction } = useLocalSearchParams();
  const [value, setValue] = useState<any | number>("");

  const buttonSubmit = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom
            onPress={() =>
              router.replace(
                `/(application)/(user)/donation/${id}/(transaction-flow)/${transaction}/invoice`
              )
            }
          >
            Pilih
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  };
  return (
    <ViewWrapper footerComponent={buttonSubmit()}>
      <RadioGroup value={value} onChange={setValue}>
        {dummyMasterBank.map((item) => (
          <BaseBox key={item.name}>
            <RadioCustom label={item.name} value={item.code} />
          </BaseBox>
        ))}
      </RadioGroup>
    </ViewWrapper>
  );
}
