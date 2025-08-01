import {
  BadgeCustom,
  BaseBox,
  ScrollableCustom,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import dayjs from "dayjs";
import { useState } from "react";

export default function VotingStatus() {
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
      {Array.from({ length: 10 }).map((_, i) => (
        <BaseBox
          key={i}
          paddingTop={20}
          paddingBottom={20}
          href={`/voting/${i}/${activeCategory}/detail`}
        >
          <StackCustom>
            <TextCustom align="center" bold truncate size="large">
              Lorem ipsum dolor sit {activeCategory}
            </TextCustom>
            <BadgeCustom
              style={{ width: "70%", alignSelf: "center" }}
              variant="light"
            >
              {dayjs().format("DD/MM/YYYY")} -{" "}
              {dayjs().add(1, "day").format("DD/MM/YYYY")}
            </BadgeCustom>
          </StackCustom>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
