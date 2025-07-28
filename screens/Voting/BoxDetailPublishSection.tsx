import {
    BadgeCustom,
    BoxWithHeaderSection,
    ButtonCustom,
    Spacing,
    StackCustom,
    TextCustom,
} from "@/components";
import { RadioCustom, RadioGroup } from "@/components/Radio/RadioCustom";
import { GStyles } from "@/styles/global-styles";
import dayjs from "dayjs";
import { useState } from "react";
import { View } from "react-native";

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
          <TextCustom align="center" bold size="large">
            Title of Voting Here
          </TextCustom>
          <TextCustom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis corporis blanditiis est provident corrupti facilis iste
            cum voluptate. Natus eum aut quos consequatur doloribus fugiat sit
            ullam minima non enim?
          </TextCustom>
          <View>
            <TextCustom bold size="small" align="center">
              Batas Voting
            </TextCustom>
            <BadgeCustom
              style={[GStyles.alignSelfCenter, { width: "70%" }]}
              variant="light"
            >
              {dayjs().format("DD/MM/YYYY")} -{" "}
              {dayjs().add(1, "day").format("DD/MM/YYYY")}
            </BadgeCustom>
          </View>

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

          <ButtonCustom onPress={() => console.log("vote")}>
            Vote
          </ButtonCustom>
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}
