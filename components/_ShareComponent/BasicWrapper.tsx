import { MainColor } from "@/constants/color-palet";
import { View } from "react-native";

export default function BasicWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: MainColor.darkblue }}>
        {children}
      </View>
    </>
  );
}
