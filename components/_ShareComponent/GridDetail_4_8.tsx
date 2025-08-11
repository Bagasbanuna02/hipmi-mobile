import { Grid } from "@/components";

export const GridDetail_4_8 = ({
    label,
    value,
}: {
    label: React.ReactNode;
    value: React.ReactNode;
}) => {
    return (
        <Grid>
            <Grid.Col span={4} style={{ justifyContent: "center", paddingRight: 10 }}>
                {label}
            </Grid.Col>
            <Grid.Col span={8} style={{ justifyContent: "center" }}>
                {value}
            </Grid.Col>
        </Grid>
    );
};