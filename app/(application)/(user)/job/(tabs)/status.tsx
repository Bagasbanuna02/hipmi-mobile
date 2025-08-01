import {
    BaseBox,
    ScrollableCustom,
    TextCustom,
    ViewWrapper,
} from "@/components";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import { jobDataDummy } from "@/screens/Job/listDataDummy";
import { useState } from "react";

export default function JobStatus() {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "publish"
  );

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // tambahkan logika lain seperti filter dsb.
  };

  const scrollComponent = (
    <ScrollableCustom
      data={dummyMasterStatus.map((e, i) => ({
        id: i,
        label: e.label,
        value: e.value,
      }))}
      onButtonPress={handlePress}
      activeId={activeCategory as any}
    />
  );

  return (
    <ViewWrapper headerComponent={scrollComponent} hideFooter>
      {jobDataDummy.map((e, i) => (
        <BaseBox
          key={i}
          paddingTop={20}
          paddingBottom={20}
          href={`/job/${e.id}/${activeCategory}/detail`}
          // onPress={() => console.log("pressed")}
        >
          <TextCustom align="center" bold truncate size="large">
            {e.posisi} {activeCategory?.toUpperCase()}
          </TextCustom>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
