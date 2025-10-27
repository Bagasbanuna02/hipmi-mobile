import Grid from "@/components/Grid/GridCustom";
import TextCustom from "@/components/Text/TextCustom";
import AdminBackButton from "./BackButton";

export default function AdminBackButtonAntTitle({
  title,
  rightComponent,
  newComponent,
}: {
  title?: string;
  rightComponent?: React.ReactNode;
  newComponent?: React.ReactNode;
}) {
  return (
    <>
      <Grid>
        <Grid.Col span={2} style={{ justifyContent: "center" }}>
          <AdminBackButton />
        </Grid.Col>
        <Grid.Col
          span={newComponent ? 10 : 8}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {newComponent ? (
            newComponent
          ) : (
            <TextCustom bold size={"large"} align="center">
              {title}
            </TextCustom>
          )}
        </Grid.Col>
        <Grid.Col
          span={newComponent ? 0 : 2}
          style={{ alignItems: "flex-end" }}
        >
          {rightComponent}
        </Grid.Col>
      </Grid>
    </>
  );
}
