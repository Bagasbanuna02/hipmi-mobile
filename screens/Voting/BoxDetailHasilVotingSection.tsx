import {
  BaseBox,
  StackCustom,
  TextCustom,
  Grid,
  CircleContainer,
} from "@/components";

export default function Voting_BoxDetailHasilVotingSection({
  listData,
}: {
  listData: any[];
}) {
  return (
    <>
      <BaseBox>
        <StackCustom>
          <TextCustom bold align="center">
            Hasil Voting
          </TextCustom>

          <Grid>
            {listData?.map((item: any, i: number) => (
              <Grid.Col span={12 / listData?.length} style={{ alignItems: "center" }} key={i}>
                <StackCustom style={{
                  alignItems: "center",
                }}>
                  <CircleContainer value={item?.jumlah} />
                  <TextCustom truncate={2} align="center" size="small">{item?.value}</TextCustom>
                </StackCustom>
              </Grid.Col>
            ))}
          </Grid>
        </StackCustom>
      </BaseBox>
    </>
  );
}
