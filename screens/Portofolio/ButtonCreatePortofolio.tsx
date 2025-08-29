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
}: Props) {
  const handleCreatePortofolio = async () => {
    try {
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

      try {
        const response = await apiPortofolioCreate({
          data: newData,
        });
        console.log("Response >>", JSON.stringify(response, null, 2));
        // return router.replace(`/maps/create`);
        // return router.push(`/maps/create`);
        return router.back();
      } catch (error) {
        throw error;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error as string,
      });
    }
  };

  // const onCreatePortofolio = async ({ fileId }: { fileId: string }) => {
  //   const newData: ICreatePortofolio = {
  //     namaBisnis: data.namaBisnis,
  //     masterBidangBisnisId: data.masterBidangBisnisId,
  //     alamatKantor: data.alamatKantor,
  //     tlpn: data.tlpn,
  //     deskripsi: data.deskripsi,
  //     fileId: fileId,
  //     facebook: dataMedsos.facebook,
  //     twitter: dataMedsos.twitter,
  //     instagram: dataMedsos.instagram,
  //     tiktok: dataMedsos.tiktok,
  //     youtube: dataMedsos.youtube,
  //   };

  //   try {
  //     const response = await apiPortofolioCreate({
  //       id: id,
  //       data: newData,
  //     });
  //     console.log("Response >>", JSON.stringify(response, null, 2));
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }

  //   // router.replace(`/maps/create`);
  // };

  return (
    <BoxButtonOnFooter>
      <ButtonCustom onPress={handleCreatePortofolio}>Selanjutnya</ButtonCustom>
    </BoxButtonOnFooter>
  );
}
