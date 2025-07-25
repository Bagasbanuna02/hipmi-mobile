import { AlertDefaultSystem, ButtonCustom, Grid } from "@/components";
import { router } from "expo-router";
import { View } from "react-native";

export default function Job_ButtonStatusSection({
  status,
}: {
  status: string;
}) {
  const handleBatalkanReview = () => {
    AlertDefaultSystem({
      title: "Batalkan Review",
      message: "Apakah Anda yakin ingin batalkan review ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: () => {
        console.log("Hapus");
        router.back();
      },
    });
  };

  const handleAjukanReview = () => {
    AlertDefaultSystem({
      title: "Ajukan Review",
      message: "Apakah Anda yakin ingin ajukan review ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: () => {
        console.log("Hapus");
        router.back();
      },
    });
  };

  const handleEditKembali = () => {
    AlertDefaultSystem({
      title: "Edit Kembali",
      message: "Apakah Anda yakin ingin edit kembali ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: () => {
        console.log("Hapus");
        router.back();
      },
    });
  };

  const handleOpenDeleteAlert = () => {
    AlertDefaultSystem({
      title: "Hapus",
      message: "Apakah Anda yakin ingin menghapus data ini?",
      textLeft: "Batal",
      textRight: "Hapus",
      onPressRight: () => {
        console.log("Hapus");
        router.back();
      },
    });
  };

  const DeleteButton = () => {
    return (
      <>
        <ButtonCustom
          backgroundColor="red"
          textColor="white"
          onPress={handleOpenDeleteAlert}
        >
          Hapus
        </ButtonCustom>
      </>
    );
  };

  switch (status) {
    case "publish":
      return (
        <>
          <ButtonCustom
            onPress={() => {
              console.log("Arsipkan");
              router.replace("/(application)/(user)/job/(tabs)/archive");
            }}
          >
            Arsipkan
          </ButtonCustom>
        </>
      );

    case "review":
      return (
        <ButtonCustom onPress={handleBatalkanReview}>
          Batalkan Review
        </ButtonCustom>
      );

    case "draft":
      return (
        <>
          <Grid>
            <Grid.Col span={5}>
              <ButtonCustom onPress={handleAjukanReview}>
                Ajukan Review
              </ButtonCustom>
            </Grid.Col>
            <Grid.Col span={2}>
              <View />
            </Grid.Col>
            <Grid.Col span={5}>{DeleteButton()}</Grid.Col>
          </Grid>
        </>
      );

    case "reject":
      return (
        <>
          <Grid>
            <Grid.Col span={5}>
              <ButtonCustom onPress={handleEditKembali}>
                Edit Kembali
              </ButtonCustom>
            </Grid.Col>
            <Grid.Col span={2}>
              <View />
            </Grid.Col>
            <Grid.Col span={5}>{DeleteButton()}</Grid.Col>
          </Grid>
        </>
      );

    default:
      return <ButtonCustom disabled>Status Undifined</ButtonCustom>;
  }
}
