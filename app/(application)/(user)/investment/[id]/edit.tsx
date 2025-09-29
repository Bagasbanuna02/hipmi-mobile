/* eslint-disable react-hooks/exhaustive-deps */
import {
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  SelectCustom,
  Spacing,
  StackCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DIRECTORY_ID from "@/constants/directory-id";
import dummyPembagianDeviden from "@/lib/dummy-data/investment/pembagian-deviden";
import dummyListPencarianInvestor from "@/lib/dummy-data/investment/pencarian-investor";
import dummyPeriodeDeviden from "@/lib/dummy-data/investment/periode-deviden";
import {
  apiInvestmentGetById,
  apiInvestmentUpdateData,
} from "@/service/api-client/api-investment";
import {
  deleteImageService,
  uploadImageService,
} from "@/service/upload-service";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import pickFile from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

interface IInvestment {
  title?: string;
  targetDana?: string;
  hargaLembar?: string;
  totalLembar?: string;
  roi?: string;
  masterPencarianInvestorId?: string;
  masterPeriodeDevidenId?: string;
  masterPembagianDevidenId?: string;
  authorId?: string;
  imageId?: string;
  prospektusFileId?: string;
}

export default function InvestmentEdit() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<IInvestment>({
    title: "",
    targetDana: "",
    hargaLembar: "",
    totalLembar: "",
    roi: "",
    masterPencarianInvestorId: "",
    masterPeriodeDevidenId: "",
    masterPembagianDevidenId: "",
    authorId: "",
    imageId: "",
    prospektusFileId: "",
  });

  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const displayTargetDana = formatCurrencyDisplay(data?.targetDana);
  const displayHargaPerLembar = formatCurrencyDisplay(data?.hargaLembar);
  const displayTotalLembar = formatCurrencyDisplay(
    Number(data?.targetDana) / Number(data?.hargaLembar)
  );

  const handleChangeCurrency = (field: keyof typeof data) => (text: string) => {
    const numeric = text.replace(/\D/g, "");
    setData((prev) => ({ ...prev, [field]: numeric }));
  };

  useFocusEffect(
    useCallback(() => {
      onLoadData();
    }, [id])
  );

  const onLoadData = async () => {
    try {
      const response = await apiInvestmentGetById({
        id: id as string,
      });
      // console.log("[DATA]", JSON.stringify(response.data, null, 2));
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const handleSubmitUpdate = async () => {
    let newData = {
      ...data,
    };

    if (
      newData?.title === "" ||
      newData?.targetDana === "" ||
      newData?.hargaLembar === "" ||
      newData?.totalLembar === "" ||
      newData?.roi === "" ||
      newData?.masterPencarianInvestorId === "" ||
      newData?.masterPeriodeDevidenId === "" ||
      newData?.masterPembagianDevidenId === ""
    ) {
      Toast.show({
        type: "info",
        text1: "Harap isi semua data",
      });
      return;
    }

    try {
      setIsLoading(true);

      if (image) {
        const responseUploadImage = await uploadImageService({
          imageUri: image,
          dirId: DIRECTORY_ID.investasi_image,
        });

        if (!responseUploadImage.success) {
          Toast.show({
            type: "error",
            text1: "Gagal mengunggah gambar",
          });
          return;
        }

        const deletePrevImage = await deleteImageService({
          id: data?.imageId as any,
        });

        if (!deletePrevImage.success) {
          Toast.show({
            type: "error",
            text1: "Gagal menghapus gambar",
          });
          return;
        }

        newData = {
          ...newData,
          imageId: responseUploadImage.data.id,
        };
      }

      const responseUpdate = await apiInvestmentUpdateData({
        id: id as string,
        data: newData,
      });

      console.log("[RESPONSE UPDATE]", JSON.parse(JSON.stringify(responseUpdate)));

      if (responseUpdate.success) {
        Toast.show({
          type: "success",
          text1: "Data berhasil diupdate",
        });
        router.back();
      } else {
        Toast.show({
          type: "error",
          text1: responseUpdate.message,
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Gambar investasi bisa berupa ilustrasi, poster atau foto terkait investasi." />
        <LandscapeFrameUploaded
          image={
            image ? image : API_STRORAGE.GET({ fileId: data?.imageId as any })
          }
        />
        <ButtonCenteredOnly
          icon="upload"
          onPress={() => {
            pickFile({
              setImageUri: ({ uri }) => {
                console.log("URI IMAGE", uri);
                setImage(uri);
              },
              allowedType: "image",
            });
          }}
        >
          Upload
        </ButtonCenteredOnly>

        <Spacing />

        <InformationBox text="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepannya." />

        <TextInputCustom
          required
          placeholder="Judul"
          label="Judul"
          value={data?.title}
          onChangeText={(value) => setData({ ...data, title: value })}
        />

        <TextInputCustom
          required
          iconLeft="Rp."
          placeholder="0"
          label="Target Dana"
          keyboardType="numeric"
          onChangeText={handleChangeCurrency("targetDana")}
          value={displayTargetDana}
        />

        <TextInputCustom
          required
          iconLeft="Rp."
          placeholder="0"
          label="Harga Per Lembar"
          keyboardType="numeric"
          onChangeText={handleChangeCurrency("hargaLembar")}
          value={displayHargaPerLembar}
        />

        <TextInputCustom
          required
          placeholder="0"
          label="Total Lembar"
          keyboardType="numeric"
          onChangeText={(value) => setData({ ...data, totalLembar: value })}
          value={displayTotalLembar}
        />

        <TextInputCustom
          required
          iconRight="%"
          label="Rasio Keuntungan / ROI %"
          placeholder="0"
          keyboardType="numeric"
          onChangeText={(value) => setData({ ...data, roi: value })}
          value={data?.roi === "" ? "" : data?.roi}
        />

        <SelectCustom
          required
          placeholder="Pilih batas waktu"
          label="Pencarian Investor"
          data={dummyListPencarianInvestor.map((item) => ({
            label: item.name + `${" "}hari`,
            value: item.id,
          }))}
          onChange={(value) =>
            setData({ ...data, masterPencarianInvestorId: value as any })
          }
          value={data.masterPencarianInvestorId}
        />

        <SelectCustom
          required
          placeholder="Pilih batas waktu"
          label="Pilih Periode Deviden"
          data={dummyPeriodeDeviden.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={(value) =>
            setData({ ...data, masterPeriodeDevidenId: value as any })
          }
          value={data.masterPeriodeDevidenId}
        />

        <SelectCustom
          required
          placeholder="Pilih batas waktu"
          label="Pilih Pembagian Deviden"
          data={dummyPembagianDeviden.map((item) => ({
            label: item.name + `${" "}bulan`,
            value: item.id,
          }))}
          onChange={(value) =>
            setData({ ...data, masterPembagianDevidenId: value as any })
          }
          value={data.masterPembagianDevidenId}
        />
        <Spacing />
        <ButtonCustom isLoading={isLoading} onPress={handleSubmitUpdate}>
          Simpan
        </ButtonCustom>
      </StackCustom>
      <Spacing height={50} />
    </ViewWrapper>
  );
}
