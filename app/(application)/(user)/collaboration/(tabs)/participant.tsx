import { ButtonCustom, Spacing } from "@/components";
import ViewWrapper from "@/components/_ShareComponent/ViewWrapper";
import { AccentColor, MainColor } from "@/constants/color-palet";
import Collaboration_BoxPublishSection from "@/screens/Collaboration/BoxPublishSection";
import { useState } from "react";
import { View } from "react-native";

export default function CollaborationParticipans() {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "participant"
  );

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
          activeCategory === "participant" ? MainColor.yellow : AccentColor.blue
        }
        textColor={
          activeCategory === "participant" ? MainColor.black : MainColor.white
        }
        style={{ width: "49%" }}
        onPress={() => handlePress("participant")}
      >
        Partisipasi Proyek
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
        Proyek Saya
      </ButtonCustom>
    </View>
  );

  return (
    <ViewWrapper hideFooter headerComponent={headerComponent}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Collaboration_BoxPublishSection
          key={index.toString()}
          id={index.toString()}
          username={` ${
            activeCategory === "participant"
              ? "Partisipasi Proyek"
              : "Proyek Saya"
          }`}
          href={
            activeCategory === "participant"
              ? `/collaboration/${index}/detail-participant`
              : `/collaboration/${index}/detail-project-main`
          }
        />
      ))}
    </ViewWrapper>
  );
}
