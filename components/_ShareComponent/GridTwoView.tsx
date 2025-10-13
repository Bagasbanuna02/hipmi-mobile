import { StyleProp, ViewStyle } from "react-native";
import Grid from "../Grid/GridCustom";

export default function GridTwoView({
  spanLeft = 6,
  spanRight = 6,
  leftIcon,
  rightIcon,
  styleLeft,
  styleRight,
}: {
  spanLeft?: number;
  spanRight?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  styleLeft?: StyleProp<ViewStyle>;
  styleRight?: StyleProp<ViewStyle>;
}) {
  return (
    <Grid containerStyle={{ marginBottom: 0 }}>
      <Grid.Col span={spanLeft} style={{ justifyContent: "center" }}>
        {leftIcon}
      </Grid.Col>
      <Grid.Col span={spanRight} style={{ justifyContent: "center" }}>
        {rightIcon}
      </Grid.Col>
    </Grid>
  );
}
