import { Grid } from "@/components";

export const GridSpan_NewComponent = ({
  text1,
  text2,
  text3,
  text4,
  span1,
  span2,
}: {
  text1: React.ReactNode;
  text2: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  span1?: number;
  span2?: number;
}) => {
  return (
    <Grid>
      <Grid.Col
        span={span1 ? span1 : text4 ? 3 : 4}
        style={{
          justifyContent: "flex-start",
          paddingRight: 5,
          paddingLeft: 3,
        }}
      >
        {text1}
      </Grid.Col>
      <Grid.Col
        span={span2 ? span2 : text4 ? 3 : text3 ? 4 : 8}
        style={{ justifyContent: "flex-start", paddingRight: 5 }}
      >
        {text2}
      </Grid.Col>
      {text3 && (
        <Grid.Col
          span={text4 ? 3 : 4}
          style={{ justifyContent: "flex-start", paddingRight: 5 }}
        >
          {text3}
        </Grid.Col>
      )}
      {text4 && (
        <Grid.Col
          span={3}
          style={{ justifyContent: "flex-start", paddingRight: 5 }}
        >
          {text4}
        </Grid.Col>
      )}
    </Grid>
  );
};
