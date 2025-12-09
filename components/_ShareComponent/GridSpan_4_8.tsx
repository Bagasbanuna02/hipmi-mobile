import { Grid } from "@/components";

export const GridSpan_4_8 = ({
  label: text1,
  value: text2,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) => {
  return (
    <Grid>
      <Grid.Col
        span={4}
        style={{
          justifyContent: "flex-start",
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        {text1}
      </Grid.Col>
      <Grid.Col span={8} style={{ justifyContent: "center", paddingRight: 8 }}>
        {text2}
      </Grid.Col>
    </Grid>
  );
};
