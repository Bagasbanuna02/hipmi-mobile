import { AvatarUsernameAndOtherComponent, BoxWithHeaderSection, Grid, StackCustom, TextCustom } from "@/components";
import { dateTimeView } from "@/utils/dateTimeView";

export default function Event_BoxDetailPublishSection({
  data,
  footerButton,
}: {
  data?: any;
  footerButton?: React.ReactNode;
}) {
  const listData = [
    {
      title: "Lokasi",
      value: data?.lokasi || "-",
    },
    {
      title: "Tipe Acara",
      value: data?.EventMaster_TipeAcara?.name || "-",
    },
    {
      title: "Tanggal Mulai",
      value: dateTimeView({ date: data?.tanggal }) || "-",
    },
    {
      title: "Tanggal Berakhir",
      value: dateTimeView({ date: data?.tanggalSelesai }) || "-",
    },
    {
      title: "Deskripsi",
      value: data?.deskripsi || "-",
    },
  ];


  return (
    <>
      <BoxWithHeaderSection>
        <StackCustom>
          <AvatarUsernameAndOtherComponent
            avatarHref={`/profile/${data?.Author?.Profile?.id}`}
            name={data?.Author?.username || "-"}
            avatar={data?.Author?.Profile?.imageId || ""}
          />

          <TextCustom bold align="center" size="xlarge">
            {data?.title || "-"}
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

      {footerButton}
    </>
  );
}
