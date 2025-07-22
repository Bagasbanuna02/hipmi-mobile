import {
    BaseBox,
    Grid,
    StackCustom,
    TextCustom
} from "@/components";

export default function Event_BoxDetailPublishSection({
  footerButton,
}: {
  footerButton?: React.ReactNode;
}) {
  return (
    <>
      <BaseBox>
        <StackCustom>
          <TextCustom bold align="center" size="xlarge">
            Judul event publish
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
      </BaseBox>

      {footerButton}
    </>
  );
}

const listData = [
  {
    title: "Lokasi",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eveniet ab eum ducimus tempore a quia deserunt quisquam. Tempora, atque. Aperiam minima asperiores dicta perferendis quis adipisci, dolore optio porro!",
  },
  {
    title: "Tipe Acara",
    value: "Workshop",
  },
  {
    title: "Tanggal Mulai",
    value: "Senin, 18 Juli 2025, 10:00 WIB",
  },
  {
    title: "Tanggal Berakhir",
    value: "Selasa, 19 Juli 2025, 12:00 WIB",
  },
  {
    title: "Deskripsi",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eveniet ab eum ducimus tempore a quia deserunt quisquam. Tempora, atque. Aperiam minima asperiores dicta perferendis quis adipisci, dolore optio porro!",
  },
];
