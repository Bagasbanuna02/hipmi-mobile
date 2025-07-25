import {
  BaseBox,
  ScrollableCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { masterStatus } from "@/lib/dummy-data/_master/status";
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
      data={masterStatus.map((e, i) => ({
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
        <BaseBox key={i} paddingBlock={20}>
          <TextCustom align="center" bold truncate size="large">
            {activeCategory?.toUpperCase()} {e.posisi}
          </TextCustom>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
