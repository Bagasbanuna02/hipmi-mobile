import { Grid } from "@/components";

export const GridViewCustomSpan = ({
  span1,
  span2,
  span3,
  component1,
  component2,
  component3,
}: {
  span1: number;
  span2: number;
  span3: number;
  component1: React.ReactNode;
  component2: React.ReactNode;
  component3: React.ReactNode;
}) => {
  return (
    <Grid>
      <Grid.Col
        span={span1 || 4}
        style={{ justifyContent: "center", paddingRight: 5, paddingLeft: 5 }}
      >
        {component1}
      </Grid.Col>
      <Grid.Col
        span={span2 || 4}
        style={{ justifyContent: "center", paddingRight: 5, paddingLeft: 5 }}
      >
        {component2}
      </Grid.Col>
      <Grid.Col
        span={span3 || 4}
        style={{ justifyContent: "center", paddingRight: 5, paddingLeft: 5 }}
      >
        {component3}
      </Grid.Col>
    </Grid>
  );
};
