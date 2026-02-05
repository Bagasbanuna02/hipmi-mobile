/* eslint-disable react-hooks/exhaustive-deps */
import {
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  LandscapeFrameUploaded,
  LoaderCustom,
  NewWrapper,
  SelectCustom,
  Spacing,
  StackCustom,
  TextInputCustom
} from "@/components";
import API_STRORAGE from "@/constants/base-url-api-strorage";
import DIRECTORY_ID from "@/constants/directory-id";
import {
  apiInvestmentGetOne,
  apiInvestmentUpdateData,
} from "@/service/api-client/api-investment";
import { apiMasterInvestment } from "@/service/api-client/api-master";
import { deleteFileService, uploadFileService } from "@/service/upload-service";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import pickFile from "@/utils/pickFile";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
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
  const [loadingMaster, setLoadingMaster] = useState(false);
  const [listPencarianInvestor, setListPencarianInvestor] = useState<any[]>([]);
  const [listPeriodeDeviden, setListPeriodeDeviden] = useState<any[]>([]);
  const [listPembagianDeviden, setListPembagianDeviden] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      onLoadMaster();
      onLoadData();
    }, [id]),
  );

  const onLoadMaster = async () => {
    try {
      setLoadingMaster(true);
      const response = await apiMasterInvestment({ category: "" });

      setListPencarianInvestor(response.data.pencarianInvestor);
      setListPeriodeDeviden(response.data.periodeDeviden);
      setListPembagianDeviden(response.data.pembagianDeviden);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setLoadingMaster(false);
    }
  };

  const onLoadData = async () => {
    try {
      const response = await apiInvestmentGetOne({
        id: id as string,
      });
      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };

  const displayTargetDana = formatCurrencyDisplay(data?.targetDana);
  const displayHargaPerLembar = formatCurrencyDisplay(data?.hargaLembar);
  const realTotalLembar = Number(data?.targetDana) / Number(data?.hargaLembar);
  const displayTotalLembar = formatCurrencyDisplay(realTotalLembar);

  const handleChangeCurrency = (field: keyof typeof data) => (text: string) => {
    const numeric = text.replace(/\D/g, "");
    setData((prev) => ({ ...prev, [field]: numeric }));
  };

  const validateData = () => {
    if (
      !data.title ||
      !data.targetDana ||
      !data.hargaLembar ||
      !data.totalLembar ||
      !data.roi ||
      !data.masterPencarianInvestorId ||
      !data.masterPeriodeDevidenId ||
      !data.masterPembagianDevidenId
    ) {
      Toast.show({
        type: "info",
        text1: "Harap isi semua data",
      });
      return false;
    }

    return true;
  };

  const handleSubmitUpdate = async () => {
    let newData = {
      ...data,
      totalLembar: realTotalLembar.toString(),
    };

    if (!validateData()) {
      return;
    }

    try {
      setIsLoading(true);

      if (image) {
        const responseUploadImage = await uploadFileService({
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

        const deletePrevImage = await deleteFileService({
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
        category: "data",
      });

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
    <NewWrapper
      footerComponent={
        <BoxButtonOnFooter>
          <ButtonCustom isLoading={isLoading} onPress={handleSubmitUpdate}>
            Simpan
          </ButtonCustom>
        </BoxButtonOnFooter>
      }
    >
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
          iconLeft="Rp."
          // disabled
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

        {loadingMaster ? (
          <LoaderCustom />
        ) : (
          <SelectCustom
            required
            placeholder="Pilih batas waktu"
            label="Pencarian Investor"
            data={
              _.isEmpty(listPencarianInvestor)
                ? []
                : listPencarianInvestor.map((item) => ({
                    label: item.name + `${" "}hari`,
                    value: item.id,
                  }))
            }
            onChange={(value) =>
              setData({ ...data, masterPencarianInvestorId: value as any })
            }
            value={data.masterPencarianInvestorId}
          />
        )}

        {loadingMaster ? (
          <LoaderCustom />
        ) : (
          <SelectCustom
            required
            placeholder="Pilih batas waktu"
            label="Pilih Periode Deviden"
            data={
              _.isEmpty(listPeriodeDeviden)
                ? []
                : listPeriodeDeviden.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
            }
            onChange={(value) =>
              setData({ ...data, masterPeriodeDevidenId: value as any })
            }
            value={data.masterPeriodeDevidenId}
          />
        )}

        {loadingMaster ? (
          <LoaderCustom />
        ) : (
          <SelectCustom
            required
            placeholder="Pilih batas waktu"
            label="Pilih Pembagian Deviden"
            data={
              _.isEmpty(listPembagianDeviden)
                ? []
                : listPembagianDeviden.map((item) => ({
                    label: item.name + `${" "}bulan`,
                    value: item.id,
                  }))
            }
            onChange={(value) =>
              setData({ ...data, masterPembagianDevidenId: value as any })
            }
            value={data.masterPembagianDevidenId}
          />
        )}

        <Spacing />
      </StackCustom>
    </NewWrapper>
  );
}
