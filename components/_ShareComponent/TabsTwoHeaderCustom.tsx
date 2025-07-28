import { MainColor, AccentColor } from "@/constants/color-palet";
import { View } from "react-native";
import ButtonCustom from "../Button/ButtonCustom";
import Spacing from "./Spacing";

export default function TabsTwoHeaderCustom ({
    leftValue,
    rightValue,
    leftText,
    rightText,
    activeCategory,
    handlePress,
}: {
    leftValue: string;
    rightValue: string;
    leftText: string;
    rightText: string;
    activeCategory: string | null;
    handlePress: (item: string) => void;
}) {
    return (
      <>
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
              activeCategory === leftValue ? MainColor.yellow : AccentColor.blue
            }
            textColor={
              activeCategory === leftValue ? MainColor.black : MainColor.white
            }
            style={{ width: "49%" }}
            onPress={() => handlePress(leftValue)}
          >
            {leftText}
          </ButtonCustom>
          <Spacing width={"2%"} />
          <ButtonCustom
            backgroundColor={
              activeCategory === rightValue ? MainColor.yellow : AccentColor.blue
            }
            textColor={
              activeCategory === rightValue ? MainColor.black : MainColor.white
            }
            style={{ width: "49%" }}
            onPress={() => handlePress(rightValue)}
          >
            {rightText}
          </ButtonCustom>
        </View>
      </>
    );
}