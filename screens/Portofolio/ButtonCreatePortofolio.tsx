import { BoxButtonOnFooter, ButtonCustom } from "@/components";
import DIRECTORY_ID from "@/constants/directory-id";
import { apiPortofolioCreate } from "@/service/api-client/api-portofolio";
import { uploadImageService } from "@/service/upload-service";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

interface Props {
  id: string;
  data: any;
  dataMedsos: any;
  imageUri: string | null;
  subBidangSelected: any[];
  isLoadingCreate: boolean;
  setIsLoadingCreate: (value: boolean) => void;
}

interface ICreatePortofolio {
  id: string;
  namaBisnis: string;
  masterBidangBisnisId: string;
  alamatKantor: string;
  tlpn: string;
  deskripsi: string;
  fileId: string;
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  subBidang: any[];
}
export default function Portofolio_ButtonCreate({
  id,
  data,
  dataMedsos,
  imageUri,
  subBidangSelected,
  isLoadingCreate,
  setIsLoadingCreate,
}: Props) {
  const validaasiData = () => {
    if (
      !data.namaBisnis ||
      !data.masterBidangBisnisId ||
      !data.alamatKantor ||
      !data.tlpn ||
      !data.deskripsi ||
      subBidangSelected.map((item) => item.id).includes("") ||
      subBidangSelected.map((item) => item.id).includes(null)
    ) {
      return false;
    }
    return true;
  };

  const handleCreatePortofolio = async () => {
    console.log(
      "Data sub bidang >>",
      JSON.stringify(subBidangSelected, null, 2)
    );
    if (!validaasiData()) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Harap lengkapi data",
      });
      return;
    }

    try {
      setIsLoadingCreate(true);
      let fileId = "";
      if (imageUri) {
        const response = await uploadImageService({
          imageUri: imageUri,
          dirId: DIRECTORY_ID.portofolio_logo,
        });

        fileId = response.data.id;
      }

      // Fix Data
      const newData: ICreatePortofolio = {
        id: id,
        namaBisnis: data.namaBisnis,
        masterBidangBisnisId: data.masterBidangBisnisId,
        alamatKantor: data.alamatKantor,
        tlpn: data.tlpn,
        deskripsi: data.deskripsi,
        fileId: fileId,
        facebook: dataMedsos.facebook,
        twitter: dataMedsos.twitter,
        instagram: dataMedsos.instagram,
        tiktok: dataMedsos.tiktok,
        youtube: dataMedsos.youtube,
        subBidang: subBidangSelected,
      };
      const response = await apiPortofolioCreate({
        data: newData,
      });
      console.log("Response >>", JSON.stringify(response, null, 2));
      // return router.replace(`/maps/create`);
      // return router.push(`/maps/create`);
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Data berhasil disimpan",
      });
      return router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error as string,
      });
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoadingCreate}
        onPress={handleCreatePortofolio}
      >
        Selanjutnya
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
}
