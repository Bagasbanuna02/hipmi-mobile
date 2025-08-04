import {
  BaseBox,
  Grid,
  DummyLandscapeImage,
  StackCustom,
  TextCustom,
} from "@/components";
import { View } from "react-native";

export default function Donasi_BoxStatus({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  return (
    <>
      <BaseBox
        paddingTop={7}
        paddingBottom={7}
        href={`/donation/${id}/${status}/detail`}
      >
        <Grid>
          <Grid.Col span={5}>
            <DummyLandscapeImage unClickPath height={100} />
          </Grid.Col>
          <Grid.Col span={1}>
            <View />
          </Grid.Col>
          <Grid.Col span={6}>
            <StackCustom>
              <TextCustom truncate>
                Judul Donasi: {status} Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </TextCustom>

              <View>
                <TextCustom>Target Dana</TextCustom>
                <TextCustom bold color="yellow">
                  Rp. 7.500.000
                </TextCustom>
              </View>
            </StackCustom>
          </Grid.Col>
        </Grid>
      </BaseBox>
    </>
  );
}
