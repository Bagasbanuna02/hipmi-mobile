import {
    AvatarUsernameAndOtherComponent,
    BoxWithHeaderSection,
    Grid,
    StackCustom,
    TextCustom
} from "@/components";

export default function Collaboration_BoxDetailSection({ id }: { id: string }) {
  return (
    <>
      <BoxWithHeaderSection>
        <StackCustom>
          <AvatarUsernameAndOtherComponent />
          <TextCustom align="center" bold size="large">
            Judul Proyek {id}
          </TextCustom>

          {listData.map((item, index) => (
            <Grid key={index}>
              <Grid.Col span={4}>
                <TextCustom bold>{item.title}</TextCustom>
              </Grid.Col>
              <Grid.Col span={8}>
                <TextCustom>{item.value}</TextCustom>
              </Grid.Col>
            </Grid>
          ))}
        </StackCustom>
      </BoxWithHeaderSection>
    </>
  );
}

const listData = [
  {
    title: "Industri",
    value: "Pilihan Industri",
  },
  {
    title: "Deskripsi",
    value: "Deskripsi Proyek",
  },
  {
    title: "Tujuan Proyek",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Keuntungan Proyek",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
