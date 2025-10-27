import Grid from "../Grid/GridCustom";

export default function GridComponentView({
  leftIcon,
  children,
  rightIcon,
}: {
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  return (
    <Grid containerStyle={{ marginBottom: 0 }}>
      <Grid.Col span={1} style={{ justifyContent: "center" }}>
        {leftIcon}
      </Grid.Col>
      <Grid.Col span={10} style={{ justifyContent: "center" }}>
        {children}
      </Grid.Col>
      <Grid.Col span={1} style={{ justifyContent: "center" }}>
        {rightIcon}
      </Grid.Col>
    </Grid>
  );
}
