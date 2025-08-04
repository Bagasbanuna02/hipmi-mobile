import {
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { FontAwesome6 } from "@expo/vector-icons";
import dayjs from "dayjs";

export default function Donation_ListOfDonatur() {
  return (
    <>
      <ViewWrapper>
        {Array.from({ length: 10 }).map((_, index) => (
          <BaseBox key={index}>
            <Grid>
              <Grid.Col
                span={3}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <FontAwesome6
                  name="face-smile-wink"
                  size={50}
                  style={{ color: MainColor.yellow }}
                />
              </Grid.Col>
              <Grid.Col span={9}>
                <StackCustom gap={"xs"}>
                  <TextCustom bold size="large">
                    Username
                  </TextCustom>
                  <TextCustom>Berdonas sebesar </TextCustom>
                  <TextCustom bold size="large" color="yellow">
                    Rp. 100.000
                  </TextCustom>
                  <TextCustom>{dayjs().format("DD MMM YYYY")}</TextCustom>
                </StackCustom>
              </Grid.Col>
            </Grid>
          </BaseBox>
        ))}
      </ViewWrapper>
    </>
  );
}
