import { BaseBox, StackCustom, TextCustom } from "@/components";
import { listDummyReportForum } from "@/lib/dummy-data/forum/report-list";
import { View } from "react-native";

export default function Forum_ReportListSection() {
  return (
    <>
      <BaseBox>
        <StackCustom>
          {listDummyReportForum.map((e, i) => (
            <View key={i}>
              <TextCustom>{e.title}</TextCustom>
              <TextCustom>{e.desc}</TextCustom>
            </View>
          ))}
        </StackCustom>
      </BaseBox>
    </>
  );
}
