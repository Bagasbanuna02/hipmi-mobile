import { Grid } from "@/components";

export const GridView_4_4_4 = ({
  component1,
  component2,
  component3,
}: {
  component1: React.ReactNode;
  component2: React.ReactNode;
  component3: React.ReactNode;
}) => {
  return (
    <Grid>
      <Grid.Col
        span={4}
        style={{ justifyContent: "center", paddingRight: 5, paddingLeft: 5 }}
      >
        {component1}
      </Grid.Col>
      <Grid.Col
        span={4}
        style={{ justifyContent: "center", paddingRight: 5, paddingLeft: 5 }}
      >
        {component2}
      </Grid.Col>
      <Grid.Col
        span={4}
        style={{ justifyContent: "center", paddingRight: 5, paddingLeft: 5 }}
      >
        {component3}
      </Grid.Col>
    </Grid>
  );
};
