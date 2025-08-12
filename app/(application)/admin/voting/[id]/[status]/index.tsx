import {
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  CircleContainer,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { GridDetail_4_8 } from "@/components/_ShareComponent/GridDetail_4_8";
import { MainColor } from "@/constants/color-palet";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { List } from "react-native-paper";

export default function AdminVotingDetail() {
  const { id, status } = useLocalSearchParams();

  const colorBadge = () => {
    if (status === "publish") {
      return MainColor.green;
    } else if (status === "review") {
      return MainColor.orange;
    } else if (status === "reject") {
      return MainColor.red;
    } else {
      return MainColor.placeholder;
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
      label: "Mulai Voting",
      value: dayjs().format("DD/MM/YYYY"),
    },
    {
      label: "Voting Berakhir",
      value: dayjs().format("DD/MM/YYYY"),
    },

    {
      label: "Deskripsi",
      value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      label: "Daftar Pilhan",
      value: (
        <>
          <List.Item
            title={<TextCustom>Pilihan 1</TextCustom>}
            left={(props) => (
              <List.Icon {...props} icon="circle" color={MainColor.yellow} />
            )}
          />
          <List.Item
            title={<TextCustom>Pilihan 2</TextCustom>}
            left={(props) => (
              <List.Icon {...props} icon="circle" color={MainColor.yellow} />
            )}
          />
          <List.Item
            title={<TextCustom>Pilihan 3</TextCustom>}
            left={(props) => (
              <List.Icon {...props} icon="circle" color={MainColor.yellow} />
            )}
          />
          <List.Item
            title={<TextCustom>Pilihan 4</TextCustom>}
            left={(props) => (
              <List.Icon {...props} icon="circle" color={MainColor.yellow} />
            )}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <ViewWrapper
        headerComponent={<AdminBackButtonAntTitle title={`Detail Data`} />}
      >
        <BaseBox>
          <StackCustom>
            {listData.map((item, i) => (
              <GridDetail_4_8
                key={i}
                label={<TextCustom bold>{item.label}</TextCustom>}
                value={<TextCustom>{item.value}</TextCustom>}
              />
            ))}
          </StackCustom>
        </BaseBox>

        {status === "publish" && (
          <BaseBox>
            <TextCustom bold align="center">
              Hasil Voting
            </TextCustom>
            <Spacing />
            <Grid>
             
             {Array.from({length: 4}).map((_, index) => (
              <Grid.Col key={index} span={3} style={{ paddingRight: 3, paddingLeft: 3 }}>
                <StackCustom gap={"sm"}>
                  <CircleContainer value={index % 3 * 3} style={{ alignSelf: "center" }} />
                  <TextCustom size="small" align="center">
                    Pilihan {index + 1}
                  </TextCustom>
                </StackCustom>
              </Grid.Col>
             ))}
            </Grid>
          </BaseBox>
        )}

        {status === "review" && (
          <AdminButtonReview
            onPublish={() => {
              AlertDefaultSystem({
                title: "Publish",
                message: "Apakah anda yakin ingin mempublikasikan data ini?",
                textLeft: "Cancel",
                textRight: "Publish",
                onPressLeft: () => {
                  router.back();
                },
                onPressRight: () => {
                  router.back();
                },
              });
            }}
            onReject={() => {
              router.push(`/admin/voting/${id}/reject-input`);
            }}
          />
        )}

        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/voting/${id}/reject-input`);
            }}
          />
        )}
        <Spacing />
      </ViewWrapper>
    </>
  );
}
