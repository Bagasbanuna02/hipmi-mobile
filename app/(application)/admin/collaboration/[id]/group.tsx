import {
  BaseBox,
  Grid,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { useLocalSearchParams } from "expo-router";

export default function AdminCollaborationGroup() {
  const { id } = useLocalSearchParams();
  console.log("params:", id);
  return (
    <>
      <ViewWrapper
        headerComponent={
          <AdminBackButtonAntTitle title={`Detail Group ${id}`} />
        }
      >
        <StackCustom gap={"xs"}>
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
          <BaseBox>
            <StackCustom>
              <TextCustom align="center">Anggota</TextCustom>

              {Array.from({ length: 10 }).map((_, i) => (
                <Grid key={i}>
                  <Grid.Col
                    span={4}
                    style={{ justifyContent: "center", paddingRight: 10 }}
                  >
                    <TextCustom bold>Username</TextCustom>
                  </Grid.Col>
                  <Grid.Col span={8} style={{ justifyContent: "center" }}>
                    <TextCustom>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </TextCustom>
                  </Grid.Col>
                </Grid>
              ))}
            </StackCustom>
          </BaseBox>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}

const listData = [
  {
    label: "Admin Group",
    value: "Bagas Banuna",
  },
  {
    label: "Nama Group",
    value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
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
