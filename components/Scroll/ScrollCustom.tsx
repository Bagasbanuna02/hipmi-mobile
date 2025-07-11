import { AccentColor, MainColor } from "@/constants/color-palet";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ButtonCustom from "../Button/ButtonCustom";

interface ButtonData {
  id: string | number;
  label: string;
}

interface ScrollableCustomProps {
  data: ButtonData[];
  onButtonPress: (item: ButtonData) => void;
  activeId?: string | number;
}

const ScrollableCustom = ({
  data,
  onButtonPress,
  activeId,
}: ScrollableCustomProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.buttonContainer}
      style={styles.scrollView}
    >
      {data.map((item) => {
        const isActive = activeId === item.id;

        return (
          <ButtonCustom
            key={item.id}
            backgroundColor={isActive ? MainColor.yellow : AccentColor.blue}
            textColor={isActive ? MainColor.black : MainColor.white}
            onPress={() => onButtonPress(item)}
          >
            {item.label}
          </ButtonCustom>
        );
      })}
    </ScrollView>
  );
};

export default ScrollableCustom;

const styles = StyleSheet.create({
  scrollView: {
    // maxHeight: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 16,
    // paddingVertical: 10,
    gap: 12,
  },
});
