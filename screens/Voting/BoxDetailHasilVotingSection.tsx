import {
  BaseBox,
  StackCustom,
  TextCustom,
  Grid,
  CircleContainer,
} from "@/components";

export default function Voting_BoxDetailHasilVotingSection() {
  return (
    <>
      <BaseBox>
        <StackCustom>
          <TextCustom bold align="center">
            Hasil Voting
          </TextCustom>

          <Grid>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid.Col span={3} style={{ alignItems: "center" }} key={i}>
                <CircleContainer value={9 % (i + 4)} />
                <TextCustom size="small">Pilihan {i + 1}</TextCustom>
              </Grid.Col>
            ))}
          </Grid>
        </StackCustom>
      </BaseBox>
    </>
  );
}
