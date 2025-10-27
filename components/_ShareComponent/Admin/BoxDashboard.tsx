import BaseBox from "@/components/Box/BaseBox";
import CircleContainer from "@/components/Container/CircleContainer";
import Grid from "@/components/Grid/GridCustom";
import StackCustom from "@/components/Stack/StackCustom";
import TextCustom from "@/components/Text/TextCustom";
import { AccentColor, MainColor } from "@/constants/color-palet";

interface BoxDashboardProps {
  item: {
    label: string;
    value: string | number;
    icon: React.ReactNode;
  };
}

export default function AdminComp_BoxDashboard({ item }: BoxDashboardProps) {
  return (
    <>
      <BaseBox
        backgroundColor={MainColor.soft_darkblue}
        paddingTop={5}
        paddingBottom={5}
      >
        <Grid containerStyle={{ marginBlock: 0 }}>
          <Grid.Col
            span={9}
            style={{
              paddingLeft: 10,
            }}
          >
            <StackCustom gap={"xs"}>
              <TextCustom bold>{item.label}</TextCustom>
              <TextCustom size={50}>{item.value}</TextCustom>
            </StackCustom>
          </Grid.Col>
          <Grid.Col
            span={3}
            style={{ alignItems: "flex-start", justifyContent: "center" }}
          >
            <CircleContainer style={{ backgroundColor: MainColor.white, borderColor: AccentColor.blue }} icon={item.icon} />
          </Grid.Col>
        </Grid>
      </BaseBox>
    </>
  );
}
