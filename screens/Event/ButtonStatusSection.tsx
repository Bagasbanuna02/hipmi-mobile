import { ButtonCustom, Grid } from "@/components";
import { View } from "react-native";

export default function Event_ButtonStatusSection({
  status,
  onOpenAlert,
  onOpenDeleteAlert,
}: {
  status: string;
  onOpenAlert: (value: boolean) => void;
  onOpenDeleteAlert: (value: boolean) => void;
}) {

  const handleOpenAlert = () => {
    onOpenAlert(true);
  };

  const handleOpenDeleteAlert = () => {
    onOpenDeleteAlert(true);
  };

  const DeleteButton = () => {
    return (
      <>
        <ButtonCustom backgroundColor="red" textColor="white" onPress={handleOpenDeleteAlert}>
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
        <ButtonCustom onPress={handleOpenAlert}>
          Batalkan Review
        </ButtonCustom>
      );

    case "draft":
      return (
        <>
          <Grid>
            <Grid.Col span={5}>
              <ButtonCustom onPress={handleOpenAlert}>Ajukan Review</ButtonCustom>
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
              <ButtonCustom onPress={handleOpenAlert}>Edit Kembali</ButtonCustom>
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
