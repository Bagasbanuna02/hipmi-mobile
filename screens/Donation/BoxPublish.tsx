import {
  BaseBox,
  Grid,
  DummyLandscapeImage,
  StackCustom,
  TextCustom,
  ProgressCustom,
} from "@/components";
import { View } from "react-native";

export default function Donation_BoxPublish({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  return (
    <>
      <BaseBox paddingTop={7} paddingBottom={7} href={`/donation/${id}`}>
        <Grid>
          <Grid.Col span={5}>
            <DummyLandscapeImage
              unClickPath
              height={100}
              imageId={data?.imageId}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <View />
          </Grid.Col>
          <Grid.Col span={6}>
            <StackCustom>
              <View style={{ gap: 10 }}>
                <TextCustom truncate={2} bold>
                  {data?.title || "-"}
                </TextCustom>
                <TextCustom size="small">
                  Sisa hari: {data?.durasiDonasi || 0}
                </TextCustom>
              </View>
              <ProgressCustom
                label={data?.progres + "%" || "0%"}
                value={data?.progres || 0}
                size="lg"
              />
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
