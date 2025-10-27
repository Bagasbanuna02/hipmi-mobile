import { BaseBox, StackCustom, TextCustom } from "@/components";
import { RadioCustom, RadioGroup } from "@/components/Radio/RadioCustom";
import { listDummyReportForum } from "@/lib/dummy-data/forum/report-list";
import { useState } from "react";
import { View } from "react-native";

export default function Forum_ReportListSection({
  listMaster,
  selectReport,
  setSelectReport,
}: {
  listMaster: any[] | null;
  selectReport: string;
  setSelectReport: (value: string) => void;
}) {
  return (
    <>
      <BaseBox>
        <StackCustom>
          <RadioGroup value={selectReport} onChange={(val) => {
            setSelectReport(val);
          }}>
            {listMaster?.map((e, i) => (
              <View key={i}>
                <RadioCustom
                  label={e.title}
                  //  value={i}
                  value={e.id}
                />
                <TextCustom>{e.deskripsi}</TextCustom>
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
