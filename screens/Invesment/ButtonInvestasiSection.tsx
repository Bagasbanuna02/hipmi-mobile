import { ButtonCustom } from "@/components";
import { router } from "expo-router";

export default function Investment_ButtonInvestasiSection({
  id,
  isMine,
}: {
  id: string;
  isMine: boolean;
}) {
  return (
    <>
      {isMine ? (
        <ButtonCustom
          onPress={() => {
            router.navigate(`/investment/${id}/(transaction-flow)`);
          }}
        >
          Beli Saham
        </ButtonCustom>
      ) : (
        <ButtonCustom disabled>Investasi Ini Milik Anda</ButtonCustom>
      )}
    </>
  );
}
