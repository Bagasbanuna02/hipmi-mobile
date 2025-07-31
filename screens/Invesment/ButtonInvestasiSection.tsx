import { ButtonCustom } from "@/components";

export default function Investment_ButtonInvestasiSection({
  isMine,
}: {
  isMine: boolean;
}) {
  return (
    <>
      {isMine ? (
        <ButtonCustom>Beli Saham</ButtonCustom>
      ) : (
        <ButtonCustom disabled>Investasi Ini Milik Anda</ButtonCustom>
      )}
    </>
  );
}
