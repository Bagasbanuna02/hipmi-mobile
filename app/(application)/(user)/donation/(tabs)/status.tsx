import { ScrollableCustom, ViewWrapper } from "@/components";
import { dummyMasterStatus } from "@/lib/dummy-data/_master/status";
import Donasi_BoxStatus from "@/screens/Donation/BoxStatus";
import { useState } from "react";

export default function DonationStatus() {
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
    <ViewWrapper hideFooter headerComponent={scrollComponent}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Donasi_BoxStatus
          key={index}
          id={index.toString()}
          status={activeCategory as string}
        />
      ))}
    </ViewWrapper>
  );
}
