import { ViewStyle } from "react-native";
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
  styleLeft?: ViewStyle;
  styleRight?: ViewStyle;
}) {
  const baseStyle: ViewStyle = { justifyContent: "center" };

  return (
    <Grid containerStyle={{ marginBottom: 0 }}>
      <Grid.Col
        span={spanLeft}
        style={styleLeft ? { ...baseStyle, ...styleLeft } : baseStyle}
      >
        {leftIcon}
      </Grid.Col>
      <Grid.Col
        span={spanRight}
        style={styleRight ? { ...baseStyle, ...styleRight } : baseStyle}
      >
        {rightIcon}
      </Grid.Col>
    </Grid>
  );
}
