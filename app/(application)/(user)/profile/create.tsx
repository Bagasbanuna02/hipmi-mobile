import {
  BaseBox,
  ButtonCenteredOnly,
  ButtonCustom,
  SelectCustom,
  Spacing,
  StackCustom,
  TextInputCustom,
  ViewWrapper
} from "@/components";
import BoxButtonOnFooter from "@/components/Box/BoxButtonOnFooter";
import InformationBox from "@/components/Box/InformationBox";
import DIRECTORY_ID from "@/constants/directory-id";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import { useAuth } from "@/hooks/use-auth";
import {
  apiCreateProfile
} from "@/service/api-client/api-profile";
import { apiValidationEmail } from "@/service/api-client/api-validation";
import { uploadImageService } from "@/service/upload-service";
import pickImage from "@/utils/pickImage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { Avatar } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function CreateProfile() {
  const { user } = useAuth();
  const [imagePhoto, setImagePhoto] = useState<string | null>(null);
  const [imageBackground, setImageBackground] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    id: user?.id,
    name: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Lengkapi Profile Anda",
      text2: "Untuk menjelajahi fitur-fitur yang ada",
    });
  }, []);

  const handlerSave = async () => {
    let IMG = {
      imageId: "",
      imageBackgroundId: "",
    };
    if (!data.name || !data.email || !data.alamat || !data.jenisKelamin) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Harap isi semua data",
      });
      return;
    }

    try {
      setIsLoading(true);

      const responseValidateEmail = await apiValidationEmail({
        email: data.email,
      });

      if (!responseValidateEmail.success) {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: responseValidateEmail.message,
        });
        return;
      }

      console.log(
        "responseValidateEmail >>",
        JSON.stringify(responseValidateEmail, null, 2)
      );

      


      

      if (imagePhoto) {
        const responseUploadPhoto = await uploadImageService({
          imageUri: imagePhoto,
          dirId: DIRECTORY_ID.profile_foto,
        });

        console.log(
          "responseUploadPhoto >>",
          JSON.stringify(responseUploadPhoto, null, 2)
        );

        if (responseUploadPhoto.success) {
          const fileIdPhoto = responseUploadPhoto.data.id;

          IMG.imageId = fileIdPhoto;
        }
      }

      if (imageBackground) {
        const responseUploadBackground = await uploadImageService({
          imageUri: imageBackground,
          dirId: DIRECTORY_ID.profile_background,
        });

        console.log(
          "responseUploadBackground >>",
          JSON.stringify(responseUploadBackground, null, 2)
        );

        if (responseUploadBackground.success) {
          const fileIdBackground = responseUploadBackground.data.id;

          IMG.imageBackgroundId = fileIdBackground;
        }
      }

      const fixData = {
        ...data,
        ...IMG,
      };

      const response = await apiCreateProfile(fixData);
      if (response.status === 400) {
        Toast.show({
          type: "error",
          text1: "Email sudah terdaftar",
          text2: "Gunakan email lain",
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Profile berhasil dibuat",
      });

      console.log("fixResponse >>", JSON.stringify(response, null, 2));
      router.push("/(application)/(user)/home");
      return;
    } catch (error) {
      console.log("error create profile >>", error);
    } finally {
      setIsLoading(false);
    }
  };

  const footerComponent = (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoading}
        onPress={handlerSave}
        // disabled={!data.name || !data.email || !data.address || !data.gender}
      >
        Simpan
      </ButtonCustom>
    </BoxButtonOnFooter>
  );

  return (
    <ViewWrapper footerComponent={footerComponent}>
      <StackCustom>
        <InformationBox text="Upload foto profile anda." />
        <View style={{ alignItems: "center" }}>
          <Avatar.Image
            size={100}
            source={imagePhoto ? { uri: imagePhoto } : DUMMY_IMAGE.avatar}
          />
          <Spacing />
          <ButtonCenteredOnly
            icon="upload"
            onPress={() => {
              pickImage({
                setImageUri: setImagePhoto,
              });
            }}
          >
            Upload
          </ButtonCenteredOnly>
        </View>

        <Spacing />

        <View>
          <InformationBox text="Upload foto latar belakang anda." />
          <BaseBox>
            <Image
              source={
                imageBackground
                  ? { uri: imageBackground }
                  : DUMMY_IMAGE.background
              }
              style={{ width: "100%", height: 200 }}
            />
          </BaseBox>
          {/* <Spacing /> */}
          <ButtonCenteredOnly
            icon="upload"
            onPress={() => {
              pickImage({
                setImageUri: setImageBackground,
              });
            }}
          >
            Upload
          </ButtonCenteredOnly>
        </View>

        <Spacing />
        <TextInputCustom
          required
          label="Nama"
          placeholder="Masukkan nama"
          value={data.name}
          onChangeText={(text) => setData({ ...data, name: text })}
        />
        <TextInputCustom
          keyboardType="email-address"
          required
          label="Email"
          placeholder="Masukkan email"
          value={data.email}
          onChangeText={(text) => setData({ ...data, email: text })}
        />
        <TextInputCustom
          required
          label="Alamat"
          placeholder="Masukkan alamat"
          value={data.alamat}
          onChangeText={(text) => setData({ ...data, alamat: text })}
        />
        <SelectCustom
          label="Jenis Kelamin"
          placeholder="Pilih jenis kelamin"
          data={[
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" },
          ]}
          value={data.jenisKelamin}
          required
          onChange={(value) =>
            setData({ ...(data as any), jenisKelamin: value })
          }
        />
        <Spacing />
      </StackCustom>
    </ViewWrapper>
  );
}
