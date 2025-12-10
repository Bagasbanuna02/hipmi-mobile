import { ScrollableCustom, StackCustom, ViewWrapper } from "@/components";
import AdminActionIconPlus from "@/components/_ShareComponent/Admin/ActionIconPlus";
import AdminComp_BoxTitle from "@/components/_ShareComponent/Admin/BoxTitlePage";
import AdminAppInformation_BusinessFieldSection from "@/screens/Admin/App-Information/BusinessFieldSection";
import AdminAppInformation_Bank from "@/screens/Admin/App-Information/InformationBankSection";
import AdminAppInformation_StickerSection from "@/screens/Admin/App-Information/StickerSection";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export default function AdminInformation() {
  const [activeCategory, setActiveCategory] = useState<string | null>("bank");
  const [activePage, setActivePage] = useState<string>("Informasi Bank");

  const handlePress = (item: any) => {
    setActiveCategory(item.value);
    setActivePage(item.label);
    // tambahkan logika lain seperti filter dsb.
  };

  const scrollComponent = (
    <StackCustom>
      <ScrollableCustom
        data={listPage}
        onButtonPress={handlePress}
        activeId={activeCategory as any}
      />
    </StackCustom>
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
        <AdminComp_BoxTitle
          title={activePage}
          rightComponent={
            <AdminActionIconPlus
              onPress={() => {
                if (activeCategory === "bank") {
                  router.push("/admin/app-information/information-bank/create");
                } else if (activeCategory === "business") {
                  router.push("/admin/app-information/business-field/create");
                } else if (activeCategory === "sticker") {
                  Alert.alert("Coming Soon", "Next Update");
                  // router.push("/admin/app-information/sticker/create");
                }
              }}
            />
          }
        />
        {renderContent()}
      </ViewWrapper>
    </>
  );
}

const listPage = [
  {
    id: "1",
    label: "Informasi Bank",
    value: "bank",
  },
  {
    id: "2",
    label: "Bidang & Sub Bidang",
    value: "business",
  },
  {
    id: "3",
    label: "Stiker",
    value: "sticker",
  },
];
