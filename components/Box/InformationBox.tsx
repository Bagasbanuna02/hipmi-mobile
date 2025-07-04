import { MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import Grid from "../Grid/GridCustom";
import TextCustom from "../Text/TextCustom";
import BaseBox from "./BaseBox";

export default function InformationBox({ text }: { text: string }) {
  return (
    <>
      <BaseBox>
        <Grid>
          <Grid.Col
            span={2}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={MainColor.white}
            />
          </Grid.Col>
          <Grid.Col span={10} style={{ justifyContent: "center" }}>
            <TextCustom>
              {text
                ? text
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
            </TextCustom>
          </Grid.Col>
        </Grid>
      </BaseBox>
    </>
  );
}
