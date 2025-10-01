import { ButtonCustom } from "@/components";
import { router } from "expo-router";

export default function Investment_ButtonInvestasiSection({
  id,
  isMine,
}: {
  id: string;
  isMine: boolean;
}) {
  console.log("[IS MINE]", isMine);
  return (
    <>
      {isMine ? (
        <ButtonCustom disabled>Investasi Ini Milik Anda</ButtonCustom>
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
