import { InformationBox, ViewWrapper } from "@/components";

export default function WaitingRoom() {
  return (
    <>
      <ViewWrapper>
        <InformationBox
          text="Permohonan akses Anda sedang dalam proses verifikasi oleh admin. Harap tunggu, Anda akan menerima pemberitahuan melalui Whatsapp setelah disetujui."
        />
      </ViewWrapper>
    </>
  );
}
