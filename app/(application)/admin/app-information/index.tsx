import {
  ScrollableCustom,
  ViewWrapper
} from "@/components";
import AdminAppInformation_BusinessFieldSection from "@/screens/Admin/App-Information/BusinessFieldSection";
import AdminAppInformation_Bank from "@/screens/Admin/App-Information/InformationBankSection";
import AdminAppInformation_StickerSection from "@/screens/Admin/App-Information/StickerSection";
import { useState } from "react";

export default function AdminInformation() {
  const [activeCategory, setActiveCategory] = useState<string | null>("bank");

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    // tambahkan logika lain seperti filter dsb.
  };

  const scrollComponent = (
    <ScrollableCustom
      data={[
        {
          id: "1",
          label: "Informasi Bank",
          value: "bank",
        },
        {
          id: "2",
          label: "Bidang Bisnis",
          value: "business",
        },
        {
          id: "3",
          label: "Stiker",
          value: "sticker",
        },
      ]}
      onButtonPress={handlePress}
      activeId={activeCategory as any}
    />
  );

  const renderContent = () => {
    switch (activeCategory) {
      case "bank":
        return <AdminAppInformation_Bank />;
      case "business":
        return <AdminAppInformation_BusinessFieldSection />;
      case "sticker":
        return <AdminAppInformation_StickerSection />;
      default:
        return <AdminAppInformation_Bank />;
    }
  };

  return (
    <>
      <ViewWrapper headerComponent={scrollComponent}>
        {renderContent()}
      </ViewWrapper>
    </>
  );
}
