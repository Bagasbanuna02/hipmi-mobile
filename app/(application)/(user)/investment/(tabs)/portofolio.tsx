import { ScrollableCustom, ViewWrapper } from "@/components";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import Investment_StatusBox from "@/screens/Invesment/StatusBox";
import { useState } from "react";

export default function InvestmentPortofolio() {
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
      {Array.from({ length: 10 }).map((_, index) => (
        <Investment_StatusBox
          key={index}
          id={index.toString()}
          status={activeCategory as string}
          href={`/investment/${index}/${activeCategory}/detail`}
        />
      ))}
    </ViewWrapper>
  );
}
