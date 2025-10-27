import AlertCustom from "@/components/Alert/AlertCustom";
import { router } from "expo-router";

export default function Event_AlertButtonStatusSection({
  id,
  status,
  openAlert,
  setOpenAlert,
  openDeleteAlert,
  setOpenDeleteAlert,
}: {
  id: string;
  status: string;
  openAlert: boolean;
  setOpenAlert: (value: boolean) => void;
  openDeleteAlert: boolean;
  setOpenDeleteAlert: (value: boolean) => void;
}) {
  // --- Alert untuk aksi berdasarkan status ---
  const renderStatusAlert = () => {
    switch (status) {
      case "publish":
        return <></>;

      case "review":
        return (
          <AlertCustom
            isVisible={openAlert}
            title="Batalkan Review"
            message="Apakah Anda yakin ingin membatalkan review?"
            textLeft="Batal"
            textRight="Ya"
            colorRight="green"
            onLeftPress={() => {
              setOpenAlert(false);
            }}
            onRightPress={() => {
              setOpenAlert(false);
              router.back();
            }}
          />
        );

      case "draft":
        return (
          <AlertCustom
            isVisible={openAlert}
            title="Ajukan Review ?"
            message="Apakah Anda yakin ingin mengajukan review kembali?"
            textLeft="Batal"
            textRight="Ya"
            colorRight="green"
            onLeftPress={() => {
              setOpenAlert(false);
              router.back();
            }}
            onRightPress={() => {
              setOpenAlert(false);
              router.back();
            }}
          />
        );

      case "reject":
        return (
          <AlertCustom
            isVisible={openAlert}
            title="Edit Kembali"
            message="Apakah Anda yakin ingin mengedit kembali event ini?"
            textLeft="Batal"
            textRight="Ya"
            colorRight="green"
            onLeftPress={() => {
              setOpenAlert(false);
              router.back();
            }}
            onRightPress={() => {
              setOpenAlert(false);
              router.back();
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Alert berdasarkan status */}
      {renderStatusAlert()}

      {/* Alert untuk hapus - selalu muncul jika openDeleteAlert true */}
      <AlertCustom
        isVisible={openDeleteAlert}
        title="Hapus Event"
        message="Apakah Anda yakin ingin menghapus event ini?"
        textLeft="Batal"
        textRight="Ya, Hapus"
        colorRight="red"
        onLeftPress={() => {
          setOpenDeleteAlert(false);
          router.back();
        }}
        onRightPress={() => {
          // Aksi hapus event
          console.log("Menghapus event dengan ID:", id);
          setOpenDeleteAlert(false);
          router.back();
        }}
      />
    </>
  );
}
