/* eslint-disable react-hooks/exhaustive-deps */
import {
  BaseBox,
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  InformationBox,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import DIRECTORY_ID from "@/constants/directory-id";
import { useAuth } from "@/hooks/use-auth";
import {
  apiAdminDonationDetailById,
  apiAdminDonationDisbursementOfFundsCreated,
} from "@/service/api-admin/api-admin-donation";
import { uploadFileService } from "@/service/upload-service";
import { formatCurrencyDisplay } from "@/utils/formatCurrencyDisplay";
import pickFile from "@/utils/pickFile";
import { Image } from "expo-image";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function AdminDonationDisbursementOfFunds() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [data, setData] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [value, setValue] = React.useState({
    nominalCair: "",
    title: "",
    deskripsi: "",
  });

  const [image, setImage] = React.useState<any | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [id]),
  );

  const onLoadData = async () => {
    try {
      const response = await apiAdminDonationDetailById({
        id: id as string,
      });

      if (response.success) {
        setData(response.data.donasi);
      }
    } catch (error) {
      console.log("[ERROR]", error);
      setData(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      Toast.show({
        type: "error",
        text1: "Harap upload bukti transfer",
      });
      return;
    }

    if (!value.nominalCair || !value.title || !value.deskripsi) {
      Toast.show({
        type: "error",
        text1: "Harap isi semua data",
      });
      return;
    }

    try {
      setIsLoading(true);
      const uploadImage = await uploadFileService({
        dirId: DIRECTORY_ID.donasi_bukti_trf_pencairan_dana,
        imageUri: image.uri,
      });

      if (!uploadFileService) {
        Toast.show({
          type: "error",
          text1: "Gagal mengunggah gambar",
        });
        return;
      }

      const imageId = uploadImage.data.id;

      const newData = {
        ...value,
        authorId: user?.id,
        imageId: imageId,
      };

      const response = await apiAdminDonationDisbursementOfFundsCreated({
        id: id as string,
        data: newData,
      });

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.message,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Pencairan dana berhasil disimpan",
      });

      router.back();
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoading}
        onPress={() => {
          handleSubmit();
        }}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <ViewWrapper
      headerComponent={<AdminBackButtonAntTitle title="Pencairan Dana" />}
      footerComponent={buttonSubmit}
    >
      <BaseBox>
        <StackCustom gap="md">
          <TextCustom align="center" bold size="large">
            Dana Tersisa
          </TextCustom>
          <TextCustom align="center" bold size="large">
            Rp {formatCurrencyDisplay(data?.terkumpul - data?.totalPencairan)}
          </TextCustom>
        </StackCustom>
      </BaseBox>

      <BaseBox>
        <TextCustom bold size="large" align="center">
          Form Pencairan Dana
        </TextCustom>
        <Spacing />
        <StackCustom gap={"xs"}>
          <TextInputCustom
            required
            keyboardType="numeric"
            label="Nominal"
            placeholder="0"
            iconLeft={"Rp"}
            value={value.nominalCair}
            onChangeText={(text) => {
              setValue({
                ...value,
                nominalCair: text,
              });
            }}
          />

          <TextInputCustom
            required
            label="Judul"
            placeholder="Masukan judul"
            value={value.title}
            onChangeText={(text) => {
              setValue({
                ...value,
                title: text,
              });
            }}
          />

          <TextAreaCustom
            required
            label="Deskripsi"
            placeholder="Masukan deskripsi"
            showCount
            maxLength={500}
            value={value.deskripsi}
            onChangeText={(text) => {
              setValue({
                ...value,
                deskripsi: text,
              });
            }}
          />
        </StackCustom>
      </BaseBox>

      <Spacing />

      <InformationBox text="Wajib menyertakan bukti transfer" />
      <ButtonCenteredOnly
        onPress={() => {
          pickFile({
            allowedType: "image",
            aspectRatio: [9, 16],
            setImageUri: (file) => {
              setImage(file);
            },
          });
        }}
        icon="upload"
      >
        Upload
      </ButtonCenteredOnly>
      <Spacing />
      <Image source={image?.uri} style={{ width: "100%", height: 300 }} />
      <Spacing />
    </ViewWrapper>
  );
}
