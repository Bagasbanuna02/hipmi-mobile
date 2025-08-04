import {
  BaseBox,
  Grid,
  DummyLandscapeImage,
  StackCustom,
  TextCustom,
  ProgressCustom,
} from "@/components";
import { View } from "react-native";

export default function Donation_BoxPublish({ id }: { id: string }) {
  return (
    <>
      <BaseBox paddingTop={7} paddingBottom={7} href={`/donation/${id}`}>
        <Grid>
          <Grid.Col span={5}>
            <DummyLandscapeImage unClickPath height={100} />
          </Grid.Col>
          <Grid.Col span={1}>
            <View />
          </Grid.Col>
          <Grid.Col span={6}>
            <StackCustom>
              <View>
                <TextCustom truncate>
                  Judul Donasi: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </TextCustom>
                <TextCustom size="small">Sisa hari: 0</TextCustom>
              </View>
              <ProgressCustom value={(Number(id) % 5) * 20} size="lg" />
              {/* <TextCustom>
                 Terkumpul : Rp 300.000
                </TextCustom> */}
            </StackCustom>
          </Grid.Col>
        </Grid>
      </BaseBox>
    </>
  );
}
