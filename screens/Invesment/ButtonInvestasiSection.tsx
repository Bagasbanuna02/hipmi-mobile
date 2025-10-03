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
        <ButtonCustom disabled>Investasi ini milik Anda</ButtonCustom>
      ) : (
        <ButtonCustom
          onPress={() => {
            router.navigate(`/investment/${id}/(transaction-flow)`);
          }}
        >
          Beli Saham
        </ButtonCustom>
      )}
    </>
  );
}
