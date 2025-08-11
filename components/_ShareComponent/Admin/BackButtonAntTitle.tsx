import Grid from "@/components/Grid/GridCustom";
import TextCustom from "@/components/Text/TextCustom";
import AdminBackButton from "./BackButton";

export default function AdminBackButtonAntTitle({
  title,
  rightComponent,
}: {
  title: string;
  rightComponent?: React.ReactNode;
}) {
  return (
    <>
      <Grid>
        <Grid.Col span={2}>
          <AdminBackButton />
          </Grid.Col>
          <Grid.Col
            span={8}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <TextCustom bold size={"large"} align="center">
              {title}
            </TextCustom>
          </Grid.Col>
          <Grid.Col span={2} style={{ alignItems: "flex-end" }}>
            {rightComponent}
          </Grid.Col>
        </Grid>
      </>
    );
}