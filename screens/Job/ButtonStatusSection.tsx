import { AlertDefaultSystem, ButtonCustom, Grid } from "@/components";
import {
  apiJobDelete,
  apiJobUpdateData,
  apiJobUpdateStatus,
} from "@/service/api-client/api-job";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function Job_ButtonStatusSection({
  id,
  status,
  isLoading,
  onSetLoading,
  isArchive,
}: {
  id: string;
  status: string;
  isLoading: boolean;
  onSetLoading: (value: boolean) => void;
  isArchive?: boolean;
}) {
  const handleBatalkanReview = () => {
    AlertDefaultSystem({
      title: "Batalkan Review",
      message: "Apakah Anda yakin ingin batalkan review ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: async () => {
        try {
          onSetLoading(true);
          const response = await apiJobUpdateStatus({
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
        } finally {
          onSetLoading(false);
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
          onSetLoading(true);
          const response = await apiJobUpdateStatus({
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
        } finally {
          onSetLoading(false);
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
          onSetLoading(true);
          const response = await apiJobUpdateStatus({
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
        } finally {
          onSetLoading(false);
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
      onPressRight: async () => {
        try {
          onSetLoading(true);
          const response = await apiJobDelete({
            id: id,
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
        } finally {
          onSetLoading(false);
        }
      },
    });
  };

  const handleArchive = () => {
    AlertDefaultSystem({
      title: "Arsipkan",
      message: "Apakah Anda yakin ingin mengarsipkan data ini?",
      textLeft: "Batal",
      textRight: "Arsipkan",
      onPressRight: async () => {
        try {
          onSetLoading(true);
          const response = await apiJobUpdateData({
            id: id,
            data: isArchive,
            category: "archive",
          });

          if (response.success) {
            Toast.show({
              type: "success",
              text1: response.message,
            });
            // router.back();
            router.replace("/(application)/(user)/job/(tabs)/archive");
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
        } finally {
          onSetLoading(false);
        }
      },
    });
  };

  const DeleteButton = () => {
    return (
      <>
        <ButtonCustom
          isLoading={isLoading}
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
            isLoading={isLoading}
            onPress={() => {
              handleArchive();
            }}
          >
            Arsipkan
          </ButtonCustom>
        </>
      );

    case "review":
      return (
        <ButtonCustom isLoading={isLoading} onPress={handleBatalkanReview}>
          Batalkan Review
        </ButtonCustom>
      );

    case "draft":
      return (
        <>
          <Grid>
            <Grid.Col span={6} style={{ paddingRight: 10 }}>
              <ButtonCustom isLoading={isLoading} onPress={handleAjukanReview}>
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
              <ButtonCustom isLoading={isLoading} onPress={handleEditKembali}>
                Edit Kembali
              </ButtonCustom>
            </Grid.Col>

            <Grid.Col span={6} style={{ paddingRight: 10 }}>
              {DeleteButton()}
            </Grid.Col>
          </Grid>
        </>
      );

    default:
      return <ButtonCustom disabled>Status Undifined</ButtonCustom>;
  }
}
