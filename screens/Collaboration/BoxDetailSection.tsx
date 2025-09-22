import {
  AvatarUsernameAndOtherComponent,
  BoxWithHeaderSection,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";

export default function Collaboration_BoxDetailSection({
  data,
}: {
  data: any;
}) {
  return (
    <>
      <BoxWithHeaderSection>
        <AvatarUsernameAndOtherComponent
          avatar={data?.Author?.Profile?.imageId}
          name={data?.Author?.username}
          avatarHref={`/profile/${data?.Author?.Profile?.id}`}
          withBottomLine
        />
        <Spacing height={10}/>
        <StackCustom>
          <TextCustom align="center" bold size="large">
            {data?.title || ""}
          </TextCustom>

          {listData(data).map((item, index) => (
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

const listData = (data: any) => [
  {
    title: "Industri",
    value: data?.ProjectCollaborationMaster_Industri?.name || "-",
  },
  {
    title: "Lokasi",
    value: data?.lokasi || "-",
  },
  {
    title: "Tujuan Proyek",
    value: data?.purpose || "-",
  },
  {
    title: "Keuntungan Proyek",
    value: data?.benefit || "-",
  },
];
