import {
  AlertDefaultSystem,
  BadgeCustom,
  BaseBox,
  DummyLandscapeImage,
  Grid,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import AdminButtonReject from "@/components/_ShareComponent/Admin/ButtonReject";
import AdminButtonReview from "@/components/_ShareComponent/Admin/ButtonReview";
import { MainColor } from "@/constants/color-palet";
import { router, useLocalSearchParams } from "expo-router";
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
          <AdminButtonReview
            onPublish={() => {
              AlertDefaultSystem({
                title: "Publish",
                message: "Apakah anda yakin ingin mempublikasikan data ini?",
                textLeft: "Batal",
                textRight: "Ya",
                onPressLeft: () => {
                  router.back();
                },
                onPressRight: () => {
                  router.back();
                },
              });
            }}
            onReject={() => {
              router.push(`/admin/job/${id}/reject-input`);
            }}
          />
        )}
        {status === "reject" && (
          <AdminButtonReject
            title="Tambah Catatan"
            onReject={() => {
              router.push(`/admin/job/${id}/reject-input`);
            }}
          />
        )}
        <Spacing />
      </ViewWrapper>
    </>
  );
}
