import { AlertDefaultSystem, ButtonCustom, Grid } from "@/components";
import {
  apiInvestmentDelete,
  apiInvestmentUpdateStatus,
} from "@/service/api-client/api-investment";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function Investment_ButtonStatusSection({
  id,
  status,
  buttonPublish,
}: {
  id: string;
  status: string;
  buttonPublish?: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleBatalkanReview = () => {
    AlertDefaultSystem({
      title: "Batalkan Review",
      message: "Apakah Anda yakin ingin batalkan review ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: async () => {
        try {
          setIsLoading(true);
          const response = await apiInvestmentUpdateStatus({
            id: id as string,
            status: "draft",
          });
          console.log("[RESPONSE]", JSON.stringify(response, null, 2));
          if (response.success) {
            Toast.show({
              type: "success",
              text1: "Berhasil Batalkan Review",
            });
            router.back();
          } else {
            Toast.show({
              type: "error",
              text1: "Gagal Batalkan Review",
            });
          }
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setIsLoading(false);
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
          setIsLoading(true);
          const response = await apiInvestmentUpdateStatus({
            id: id as string,
            status: "review",
          });
          console.log("[RESPONSE]", JSON.stringify(response, null, 2));
          if (response.success) {
            Toast.show({
              type: "success",
              text1: "Berhasil Ajukan Review",
            });
            router.back();
          } else {
            Toast.show({
              type: "error",
              text1: "Gagal Ajukan Review",
            });
          }
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setIsLoading(false);
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
          setIsLoading(true);
          const response = await apiInvestmentUpdateStatus({
            id: id as string,
            status: "draft",
          });
          console.log("[RESPONSE]", JSON.stringify(response, null, 2));
          if (response.success) {
            Toast.show({
              type: "success",
              text1: "Berhasil Update Status",
            });
            router.back();
          } else {
            Toast.show({
              type: "error",
              text1: "Gagal Update Status",
            });
          }
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setIsLoading(false);
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
          setIsLoading(true);
          const response = await apiInvestmentDelete({
            id: id as string,
          });

          console.log("[RESPONSE DELETE]", JSON.stringify(response, null, 2));

          if (response.success) {
            Toast.show({
              type: "success",
              text1: "Berhasil Hapus Data",
            });

            router.back();
          } else {
            Toast.show({
              type: "error",
              text1: "Gagal Hapus Data",
            });
          }
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setIsLoading(false);
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
      return <>{buttonPublish}</>;

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
