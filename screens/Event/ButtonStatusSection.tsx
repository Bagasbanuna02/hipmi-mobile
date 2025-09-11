import { AlertDefaultSystem, ButtonCustom, Grid } from "@/components";
import { apiEventUpdateStatus } from "@/service/api-client/api-event";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function Event_ButtonStatusSection({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const handleBatalkanReview = () => {
    AlertDefaultSystem({
      title: "Batalkan Review",
      message: "Apakah Anda yakin ingin batalkan review ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: async () => {
        try {
          const response = await apiEventUpdateStatus({
            id: id,
            status: "draft",
          });

          if (response.success) {
            Toast.show({
              type: "success",
              text1: response.message,
            });
            router.back();
          } else {
            Toast.show({
              type: "info",
              text1: "Info",
              text2: response.message,
            });
            router.back();
          }
        } catch (error) {
          console.log("[ERROR]", error);
        }
      },
    });
  };

  const handleAjukanReview = () => {
    AlertDefaultSystem({
      title: "Ajukan Review",
      message: "Apakah Anda yakin ingin ajukan review ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: async () => {
        try {
          const response = await apiEventUpdateStatus({
            id: id,
            status: "review",
          });

          if (response.success) {
            Toast.show({
              type: "success",
              text1: response.message,
            });
            router.back();
          } else {
            Toast.show({
              type: "info",
              text1: "Info",
              text2: response.message,
            });
            router.back();
          }
        } catch (error) {
          console.log("[ERROR]", error);
        }
      },
    });
  };

  const handleEditKembali = () => {
    AlertDefaultSystem({
      title: "Edit Kembali",
      message: "Apakah Anda yakin ingin edit kembali ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: async () => {
        try {
          const response = await apiEventUpdateStatus({
            id: id,
            status: "draft",
          });

          if (response.success) {
            Toast.show({
              type: "success",
              text1: response.message,
            });
            router.back();
          } else {
            Toast.show({
              type: "info",
              text1: "Info",
              text2: response.message,
            });
            router.back();
          }
        } catch (error) {
          console.log("[ERROR]", error);
        }
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
      return <></>;

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
            <Grid.Col span={6} style={{ paddingRight: 10 }}>
              <ButtonCustom onPress={handleAjukanReview}>
                Ajukan Review
              </ButtonCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ paddingLeft: 10 }}>
              {DeleteButton()}
            </Grid.Col>
          </Grid>
        </>
      );

    case "reject":
      return (
        <>
          <Grid>
            <Grid.Col span={6} style={{ paddingRight: 10 }}>
              <ButtonCustom onPress={handleEditKembali}>
                Edit Kembali
              </ButtonCustom>
            </Grid.Col>
            <Grid.Col span={6} style={{ paddingLeft: 10 }}>
              {DeleteButton()}
            </Grid.Col>
          </Grid>
        </>
      );

    default:
      return <ButtonCustom disabled>Status Undifined</ButtonCustom>;
  }
}
