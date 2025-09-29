import {
  BaseBox,
  ButtonCenteredOnly,
  ButtonCustom,
  CenterCustom,
  InformationBox,
  LandscapeFrameUploaded,
  SelectCustom,
  Spacing,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import DIRECTORY_ID from "@/constants/directory-id";
import { useAuth } from "@/hooks/use-auth";
import dummyPembagianDeviden from "@/lib/dummy-data/investment/pembagian-deviden";
import dummyListPencarianInvestor from "@/lib/dummy-data/investment/pencarian-investor";
import dummyPeriodeDeviden from "@/lib/dummy-data/investment/periode-deviden";
import { apiInvestmentCreate } from "@/service/api-client/api-investment";
import { uploadImageService } from "@/service/upload-service";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import pickFile, { IFileData } from "@/utils/pickFile";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function InvestmentCreate() {
  const { user } = useAuth();
  const [data, setData] = useState({
    title: "",
    targetDana: "",
    hargaPerLembar: "",
    totalLembar: "",
    rasioKeuntungan: "",
    pencarianInvestor: "",
    periodeDeviden: "",
    pembagianDeviden: "",
    authorId: "",
    imageId: "",
    prospektusFileId: "",
  });
  const [image, setImage] = useState<string | null>(null);
  const [pdf, setPdf] = useState<IFileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const displayTargetDana = formatCurrencyDisplay(data.targetDana);
  const displayHargaPerLembar = formatCurrencyDisplay(data.hargaPerLembar);
  const displayTotalLembar = formatCurrencyDisplay(
    Number(data.targetDana) / Number(data.hargaPerLembar)
  );

  const handleChangeCurrency = (field: keyof typeof data) => (text: string) => {
    const numeric = text.replace(/\D/g, "");
    setData((prev) => ({ ...prev, [field]: numeric }));
  };

  const handleSubmit = async () => {
    if (!image || !pdf) {
      Toast.show({
        type: "error",
        text1: "Harap pilih gambar dan file PDF",
      });
      return;
    }

    if (
      !data.title ||
      !data.targetDana ||
      !data.hargaPerLembar ||
      !data.rasioKeuntungan ||
      !data.pencarianInvestor ||
      !data.periodeDeviden ||
      !data.pembagianDeviden
    ) {
      Toast.show({
        type: "error",
        text1: "Harap isi semua data",
      });
      return;
    }

    try {
      setIsLoading(true);
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

      const imageId = responseUploadImage.data.id;
      const responseUploadPdf = await uploadImageService({
        imageUri: pdf.uri,
        dirId: DIRECTORY_ID.investasi_prospektus,
      });

      if (!responseUploadPdf.success) {
        Toast.show({
          type: "error",
          text1: "Gagal mengunggah file PDF",
        });
        return;
      }

      const pdfId = responseUploadPdf.data.id;
      const newData = {
        title: data.title,
        targetDana: data.targetDana,
        hargaLembar: data.hargaPerLembar,
        totalLembar: displayTotalLembar,
        roi: data.rasioKeuntungan,
        masterPencarianInvestorId: data.pencarianInvestor,
        masterPembagianDevidenId: data.pembagianDeviden,
        masterPeriodeDevidenId: data.periodeDeviden,
        authorId: user?.id,
        imageId: imageId,
        prospektusFileId: pdfId,
      };

      const response = await apiInvestmentCreate({ data: newData });
      console.log("[RESPONSE]", JSON.stringify(response, null, 2));
      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: response.message,
        });
        router.replace("/investment/portofolio");
      } else {
        Toast.show({
          type: "error",
          text1: "Info",
          text2: response.message,
        });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const [coba, setCoba] = useState("");
  return (
    <ViewWrapper>
      <StackCustom gap={"xs"}>
        <InformationBox text="Gambar investasi bisa berupa ilustrasi, poster atau foto terkait investasi." />
        <LandscapeFrameUploaded image={image as string} />
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

        <InformationBox text="File prospektus wajib untuk diupload, agar calon investor paham dengan prospek investasi yang akan anda jalankan kedepannya. Gunakan format PDF." />

        <BaseBox>
          <CenterCustom>
            {pdf ? (
              <TextCustom>{pdf.name}</TextCustom>
            ) : (
              <FontAwesome5
                name="file-pdf"
                size={30}
                color={MainColor.disabled}
              />
            )}
          </CenterCustom>
        </BaseBox>
        <ButtonCenteredOnly
          icon="upload"
          onPress={() => {
            pickFile({
              setPdfUri: ({ uri, name, size }) => {
                console.log("URI PDF", JSON.stringify(uri, null, 2));
                setPdf({ uri, name, size });
              },
              allowedType: "pdf",
            });
          }}
        >
          Upload File
        </ButtonCenteredOnly>
        <Spacing />

        <TextInputCustom
          required
          placeholder="Judul"
          label="Judul"
          value={data.title}
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
          onChangeText={handleChangeCurrency("hargaPerLembar")}
          value={displayHargaPerLembar}
        />

        <StackCustom gap={0}>
          <TextInputCustom
            required
            placeholder="0"
            label="Total Lembar"
            keyboardType="numeric"
            // onChangeText={handleChangeCurrency("totalLembar")}
            value={displayTotalLembar}
          />
          <TextCustom size={"small"} color="gray">
            *Total lembar dihitung dari, Target Dana / Harga Perlembar
          </TextCustom>
        </StackCustom>
        <Spacing />

        <TextInputCustom
          required
          iconRight="%"
          label="Rasio Keuntungan / ROI %"
          placeholder="0"
          keyboardType="numeric"
          onChangeText={(value) => setData({ ...data, rasioKeuntungan: value })}
          value={
            data.rasioKeuntungan === "" ? "" : data.rasioKeuntungan.toString()
          }
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
            setData({ ...data, pencarianInvestor: value as any })
          }
          value={data.pencarianInvestor}
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
            setData({ ...data, periodeDeviden: value as any })
          }
          value={data.periodeDeviden}
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
            setData({ ...data, pembagianDeviden: value as any })
          }
          value={data.pembagianDeviden}
        />
        <Spacing />
        <ButtonCustom isLoading={isLoading} onPress={() => handleSubmit()}>
          Simpan
        </ButtonCustom>
      </StackCustom>
      <Spacing height={50} />
    </ViewWrapper>
  );
}
