import Grid from "@/components/Grid/GridCustom";
import TextCustom from "@/components/Text/TextCustom";

export default function AdminTitleTable({
  title1,
  title2,
  title3,
}: {
  title1: string;
  title2: string;
  title3: string;
}) {
  return (
    <>
      <Grid>
        <Grid.Col span={3} style={{ alignItems: "center", justifyContent: "center" }}>
          <TextCustom bold align="center">{title1}</TextCustom>
        </Grid.Col>
        <Grid.Col span={3} style={{ alignItems: "center", justifyContent: "center" }}>
          <TextCustom bold align="center">{title2}</TextCustom>
        </Grid.Col>
        <Grid.Col span={6} style={{ alignItems: "center", justifyContent: "center" }}>
          <TextCustom bold align="center">{title3}</TextCustom>
        </Grid.Col>
      </Grid>
    </>
  );
}
