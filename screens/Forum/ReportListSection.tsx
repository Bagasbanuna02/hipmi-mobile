import { BaseBox, ButtonCustom, StackCustom, TextCustom } from "@/components";
import { RadioCustom, RadioGroup } from "@/components/Radio/RadioCustom";
import { MainColor } from "@/constants/color-palet";
import { listDummyReportForum } from "@/lib/dummy-data/forum/report-list";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Forum_ReportListSection() {
  const [value, setValue] = useState<any | number>("");
  return (
    <>
      <BaseBox>
        <StackCustom>
          <RadioGroup value={value} onChange={setValue}>
            {listDummyReportForum.map((e, i) => (
              <View key={i}>
                <RadioCustom
                  label={e.title}
                  //  value={i}
                  value={e.title}
                />
                <TextCustom>{e.desc}</TextCustom>
              </View>
            ))}
          </RadioGroup>

          {/* <ButtonCustom
            backgroundColor={MainColor.red}
            textColor={MainColor.white}
            onPress={() => {
              console.log("Report", value);
            }}
          >
            Report
          </ButtonCustom> */}
        </StackCustom>
      </BaseBox>
    </>
  );
}
