import {
  BadgeCustom,
  BaseBox,
  ButtonCustom,
  DummyLandscapeImage,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";

export default function AdminJobDetailStatus() {
  const { id, status } = useLocalSearchParams();

  const colorBadge = () => {
    if (status === "publish") {
      return MainColor.green;
    } else if (status === "review") {
      return MainColor.orange;
    } else if (status === "reject") {
      return MainColor.red;
    }
  };

  const listData = [
    {
      label: "Username",
      value: "Bagas Banuna",
    },
    {
      label: "Judul",
      value: `Judul Proyek: ${id}Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
    },
    {
      label: "Status",
      value: (
        <BadgeCustom color={colorBadge()}>
          {_.startCase(status as string)}
        </BadgeCustom>
      ),
    },
    {
      label: "Konten",
      value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      label: "Deskripsi",
      value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    // {
    //   label: "Poster",
    //   value: (
    //     <ButtonCustom
    //       href={`/(application)/()/${id}`}
    //     >
    //       Lihat Poster
    //     </ButtonCustom>
    //   ),
    // },
  ];

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail Data`} />}
      >
        <BaseBox>
          <StackCustom>
            {listData.map((item, i) => (
              <Grid key={i}>
                <Grid.Col
                  span={4}
                  style={{ justifyContent: "center", paddingRight: 10 }}
                >
                  <TextCustom bold>{item.label}</TextCustom>
                </Grid.Col>
                <Grid.Col span={8} style={{ justifyContent: "center" }}>
                  <TextCustom>{item.value}</TextCustom>
                </Grid.Col>
              </Grid>
            ))}

            <TextCustom bold>Poster</TextCustom>

            <DummyLandscapeImage />
          </StackCustom>
        </BaseBox>

        {status === "review" && (
          <Grid>
            <Grid.Col span={6} style={{ paddingRight: 10 }}>
              <ButtonCustom backgroundColor={MainColor.green} textColor="white">
                Publish
              </ButtonCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ paddingLeft: 10 }}>
              <ButtonCustom backgroundColor={MainColor.red} textColor="white">
                Reject
              </ButtonCustom>
            </Grid.Col>
          </Grid>
        )}
      </ViewWrapper>
    </>
  );
}
