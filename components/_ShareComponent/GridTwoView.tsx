import { ViewStyle } from "react-native";
import Grid from "../Grid/GridCustom";

export default function GridTwoView({
  spanLeft = 6,
  spanRight = 6,
  leftItem,
  rightItem,
  styleLeft,
  styleRight,
}: {
  spanLeft?: number;
  spanRight?: number;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
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
        {leftItem}
      </Grid.Col>
      <Grid.Col
        span={spanRight}
        style={styleRight ? { ...baseStyle, ...styleRight } : baseStyle}
      >
        {rightItem}
      </Grid.Col>
    </Grid>
  );
}
