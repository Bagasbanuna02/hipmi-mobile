import { AlertDefaultSystem, ButtonCustom, Grid } from "@/components";
import {
  apiDonationDelete,
  apiDonationUpdateStatus,
} from "@/service/api-client/api-donation";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function Donation_ButtonStatusSection({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const path: any = (status: string) => {
    return `/donation/(tabs)/status?status=${status}`;
  };
  const handleBatalkanReview = async () => {
    AlertDefaultSystem({
      title: "Batalkan Review",
      message: "Apakah Anda yakin ingin batalkan review ini?",
      textLeft: "Batal",
      textRight: "Ya",
      onPressRight: async () => {
        try {
          setLoading(true);
          const response = await apiDonationUpdateStatus({
            id: id,
            status: "draft",
          });

          if (!response.success) {
            Toast.show({
              type: "info",
              text1: response.message,
            });
            return;
          }

          Toast.show({
            type: "success",
            text1: response.message,
          });

          router.push(path("draft"));
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setLoading(false);
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
          setLoading(true);
          const response = await apiDonationUpdateStatus({
            id: id,
            status: "review",
          });

          if (!response.success) {
            Toast.show({
              type: "info",
              text1: response.message,
            });
            return;
          }

          Toast.show({
            type: "success",
            text1: response.message,
          });

          router.replace(path("review"));
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setLoading(false);
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
          setLoading(true);
          const response = await apiDonationUpdateStatus({
            id: id,
            status: "draft",
          });

          if (!response.success) {
            Toast.show({
              type: "info",
              text1: response.message,
            });
            return;
          }

          Toast.show({
            type: "success",
            text1: response.message,
          });

          router.replace(path("draft"));
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setLoading(false);
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
          setLoadingDelete(true);
          const response = await apiDonationDelete({ id: id });

          if (!response.success) {
            Toast.show({
              type: "info",
              text1: response.message,
            });
            return;
          }

          Toast.show({
            type: "success",
            text1: response.message,
          });

          router.back();
        } catch (error) {
          console.log("[ERROR]", error);
        } finally {
          setLoadingDelete(false);
        }
      },
    });
  };

  const DeleteButton = () => {
    return (
      <>
        <ButtonCustom
          isLoading={isLoadingDelete}
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
