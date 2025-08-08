import { ViewWrapper } from "@/components";
import TabsTwoButtonCustom from "@/components/_ShareComponent/TabsTwoHeaderCustom";
import Voting_BoxPublishSection from "@/screens/Voting/BoxPublishSection";
import { useState } from "react";

export default function VotingHistory() {
  const [activeCategory, setActiveCategory] = useState<string | null>("all");

  const handlePress = (item: any) => {
    setActiveCategory(item);
    // tambahkan logika lain seperti filter dsb.
  };

  return (
    <ViewWrapper
      hideFooter
      headerComponent={
        <TabsTwoButtonCustom
          leftValue="all"
          rightValue="main"
          leftText="Semua Riwayat"
          rightText="Riwayat Saya"
          activeCategory={activeCategory}
          handlePress={handlePress}
        />
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Voting_BoxPublishSection
          key={index}
          id={activeCategory as any}
          href={`/voting/${index}/history`}
        />
      ))}
    </ViewWrapper>
  );
}
