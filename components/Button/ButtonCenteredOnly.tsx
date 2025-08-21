import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_BUTTON } from "@/constants/constans-value";
import { GStyles } from "@/styles/global-styles";
import { Feather } from "@expo/vector-icons";
import React from "react";
import ButtonCustom from "./ButtonCustom";

interface ButtonCenteredOnlyProps {
  children?: React.ReactNode;
  icon?: "plus" | "upload" | string;
  onPress: () => void;
  isLoading?: boolean;
}
export default function ButtonCenteredOnly({
  onPress,
  children,
  icon = "plus",
  isLoading = false,
}: ButtonCenteredOnlyProps) {
  return (
    <ButtonCustom
      isLoading={isLoading}
      onPress={onPress}
      iconLeft={
        <Feather
          name={icon as any}
          size={ICON_SIZE_BUTTON}
          color={MainColor.black}
        />
      }
      style={[GStyles.buttonCentered50Percent]}
    >
      {children}
    </ButtonCustom>
  );
}
