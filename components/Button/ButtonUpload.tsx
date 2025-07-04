import { MainColor } from "@/constants/color-palet";
import { GStyles } from "@/styles/global-styles";
import { Feather } from "@expo/vector-icons";
import React from "react";
import ButtonCustom from "./ButtonCustom";

interface ButtonUploadProps {
    title?: string;
    onPress: () => void;
}
export default function ButtonUpload({ onPress, title = "Upload" }: ButtonUploadProps) {
  return (
    <ButtonCustom
      onPress={onPress}
      iconLeft={<Feather name="upload" size={20} color={MainColor.black} />}
      style={GStyles.buttonCentered50Percent}
    >
      {title}
    </ButtonCustom>
  );
}
