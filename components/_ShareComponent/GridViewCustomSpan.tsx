import { Grid } from "@/components";
import { StyleProp, ViewStyle } from "react-native";

export const GridViewCustomSpan = ({
  span1,
  span2,
  span3,
  component1,
  component2,
  component3,
  style1,
  style2,
  style3,
}: {
  span1?: number;
  span2?: number;
  span3?: number;
  component1: React.ReactNode;
  component2: React.ReactNode;
  component3: React.ReactNode;
  style1?: StyleProp<ViewStyle>;
  style2?: StyleProp<ViewStyle>;
  style3?: StyleProp<ViewStyle>;
}) => {
  return (
    <Grid>
      <Grid.Col
        span={span1 || 4}
        style={{
          justifyContent: "center",
          paddingRight: 10,
          paddingLeft: 10,
          ...(style1 as object)
        } as ViewStyle}
      >
        {component1}
      </Grid.Col>
      <Grid.Col
        span={span2 || 4}
        style={{
          justifyContent: "center",
          paddingRight: 10,
          paddingLeft: 10,
          ...(style2 as object)
        } as ViewStyle}
      >
        {component2}
      </Grid.Col>
      <Grid.Col
        span={span3 || 4}
        style={{
          justifyContent: "center",
          paddingRight: 10,
          paddingLeft: 10,
          ...(style3 as object)
        } as ViewStyle}
      >
        {component3}
      </Grid.Col>
    </Grid>
  );
};
