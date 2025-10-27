import {
  BaseBox,
  Grid,
  DummyLandscapeImage,
  StackCustom,
  TextCustom,
} from "@/components";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import { View } from "react-native";

export default function Donasi_BoxStatus({
  data,
  status,
}: {
  data: any;
  status: string;
}) {
  return (
    <>
      <BaseBox
        paddingTop={7}
        paddingBottom={7}
        href={`/donation/${data.id}/${status}/detail`}
      >
        <Grid>
          <Grid.Col span={5}>
            <DummyLandscapeImage
              unClickPath
              height={100}
              imageId={data.imageId}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <View />
          </Grid.Col>
          <Grid.Col span={6}>
            <StackCustom>
              <TextCustom truncate={2} bold>{data.title || "-"}</TextCustom>

              <View>
                <TextCustom>Target Dana</TextCustom>
                <TextCustom bold color="yellow">
                  Rp.
                  {data && data?.target
                    ? formatCurrencyDisplay(data.target)
                    : "-"}
                </TextCustom>
              </View>
            </StackCustom>
          </Grid.Col>
        </Grid>
      </BaseBox>
    </>
  );
}
