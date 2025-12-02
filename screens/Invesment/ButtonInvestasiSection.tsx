import { ButtonCustom } from "@/components";
import { router } from "expo-router";

export default function Investment_ButtonInvestasiSection({
  id,
  isMine,
  reminder,
}: {
  id: string;
  isMine: boolean;
  reminder: boolean;
}) {
  return (
    <>
      {isMine ? (
        <ButtonCustom disabled>Investasi ini milik Anda</ButtonCustom>
      ) : (
        <ButtonCustom
          disabled={reminder}
          onPress={() => {
            router.navigate(`/investment/${id}/(transaction-flow)`);
          }}
        >
          {reminder ? "Periode Investasi Berakhir" : "Beli Saham"}
        </ButtonCustom>
      )}
    </>
  );
}
