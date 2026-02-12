import BaseBox from "@/components/Box/BaseBox";
import Grid from "@/components/Grid/GridCustom";
import TextCustom from "@/components/Text/TextCustom";
import { AccentColor } from "@/constants/color-palet";
import { TEXT_SIZE_LARGE } from "@/constants/constans-value";
import { View } from "react-native";

export default function AdminComp_BoxTitle({
  title,
  rightComponent,
}: {
  title: string;
  rightComponent?: React.ReactNode;
}) {
  return (
    <>
      {/* <BaseBox
        style={{ flexDirection: "row", justifyContent: "space-between" }}
        paddingTop={5}
        paddingBottom={5}
        backgroundColor={AccentColor.blue}
      > */}
      <View
        style={{
          backgroundColor: AccentColor.darkblue,
          borderColor: AccentColor.blue,

          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <Grid
        // containerStyle={{
        //   bottom: 0,
        //   left: 0,
        //   right: 0,
        // }}
        >
          <Grid.Col
            span={rightComponent ? 6 : 12}
            style={{ justifyContent: "center" }}
          >
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
      </View>
      {/* </BaseBox> */}
    </>
  );
}
