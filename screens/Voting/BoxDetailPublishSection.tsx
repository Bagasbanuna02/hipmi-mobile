import {
  BoxWithHeaderSection,
  ButtonCustom,
  Spacing,
  StackCustom,
  TextCustom
} from "@/components";
import { RadioCustom, RadioGroup } from "@/components/Radio/RadioCustom";
import { useState } from "react";
import { View } from "react-native";
import { Voting_ComponentDetailDataSection } from "./ComponentDetailDataSection";

export function Voting_BoxDetailPublishSection({
  headerAvatar,
}: {
  headerAvatar?: React.ReactNode;
}) {
  const [value, setValue] = useState<any | number>("");
  return (
    <>
      <BoxWithHeaderSection>
        {headerAvatar ? headerAvatar : <Spacing />}
        <StackCustom gap={"lg"}>
          <Voting_ComponentDetailDataSection />

          <View>
            <TextCustom bold size="small">
              Pilihan :
            </TextCustom>
            <RadioGroup value={value} onChange={setValue}>
              {Array.from({ length: 4 }).map((_, i) => (
                <View key={i}>
                  <RadioCustom
                    label={`Pilihan ${i + 1}`}
                    value={`Pilihan ${i + 1}`}
                  />
                </View>
              ))}
            </RadioGroup>
          </View>

          <ButtonCustom onPress={() => console.log("vote")}>Vote</ButtonCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
