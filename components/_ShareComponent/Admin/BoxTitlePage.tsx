import BaseBox from "@/components/Box/BaseBox";
import Grid from "@/components/Grid/GridCustom";
import TextCustom from "@/components/Text/TextCustom";
import { TEXT_SIZE_LARGE } from "@/constants/constans-value";

export default function AdminComp_BoxTitle({
  title,
  rightComponent,
}: {
  title: string;
  rightComponent?: React.ReactNode;
}) {
  return (
    <>
      <BaseBox
        style={{ flexDirection: "row", justifyContent: "space-between" }}
        paddingTop={5}
        paddingBottom={5}
      >
        <Grid>
          <Grid.Col span={rightComponent ? 6 : 12} style={{ justifyContent: "center" }}>
            <TextCustom
              // style={{ alignSelf: "center" }}
              bold
              size={TEXT_SIZE_LARGE}
            >
              {title}
            </TextCustom>
          </Grid.Col>
          {rightComponent && (
            <Grid.Col
              span={6}
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              {rightComponent}
            </Grid.Col>
          )}
        </Grid>
      </BaseBox>
    </>
  );
}
