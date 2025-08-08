import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCustom,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import { useLocalSearchParams } from "expo-router";

export default function AdminCollaborationPublish() {
  const { id, status } = useLocalSearchParams();
  console.log("params:", id, status);
  const bottomFooter = (
    <BoxButtonOnFooter>
      <ButtonCustom
        backgroundColor={MainColor.red}
        textColor="white"
        onPress={() => {}}
      >
        Reject
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail ${status}`} />}
        footerComponent={bottomFooter}
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
          </StackCustom>
        </BaseBox>
      </ViewWrapper>
    </>
  );
}

const listData = [
  {
    label: "Username",
    value: "Bagas Banuna",
  },
  {
    label: "Judul Proyek",
    value:
      "Judul Proyek: Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Industri",
    value: "Kesehatan",
  },
  {
    label: "Jumlah Partisipan ",
    value: "0",
  },
  {
    label: "Lokasi",
    value: "Kuta Selatan, Bali",
  },
  {
    label: "Tujuan Proyek",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    label: "Keuntungan",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
