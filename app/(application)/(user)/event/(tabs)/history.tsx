import { ButtonCustom, Spacing, TextCustom } from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { AccentColor, MainColor } from "@/constants/color-palet";
import Event_BoxPublishSection from "@/screens/Event/BoxPublishSection";
import { useState } from "react";
import { View } from "react-native";

export default function EventHistory() {
  const [activeCategory, setActiveCategory] = useState<string | null>("all");

  const handlePress = (item: any) => {
    setActiveCategory(item);
    // tambahkan logika lain seperti filter dsb.
  };

  const headerComponent = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        backgroundColor: MainColor.soft_darkblue,
        borderRadius: 50,
        width: "100%",
      }}
    >
      <ButtonCustom
        backgroundColor={
          activeCategory === "all" ? MainColor.yellow : AccentColor.blue
        }
        textColor={activeCategory === "all" ? MainColor.black : MainColor.white}
        style={{ width: "49%" }}
        onPress={() => handlePress("all")}
      >
        Semua Riwayat
      </ButtonCustom>
      <Spacing width={"2%"} />
      <ButtonCustom
        backgroundColor={
          activeCategory === "main" ? MainColor.yellow : AccentColor.blue
        }
        textColor={
          activeCategory === "main" ? MainColor.black : MainColor.white
        }
        style={{ width: "49%" }}
        onPress={() => handlePress("main")}
      >
        Riwayat Saya
      </ButtonCustom>
    </View>
  );

  return (
    <ViewWrapper headerComponent={headerComponent} hideFooter>
      {Array.from({ length: 10 }).map((_, index) => (
        <Event_BoxPublishSection
          key={index.toString()}
          id={index.toString()}
          username={`Riwayat ${activeCategory === "main" ? "Saya" : "Semua"}`}
          rightComponentAvatar={
            <TextCustom>{new Date().toLocaleDateString()}</TextCustom>
          }
          href={`/event/${index}/history`}
        />
      ))}
    </ViewWrapper>
  );
}
