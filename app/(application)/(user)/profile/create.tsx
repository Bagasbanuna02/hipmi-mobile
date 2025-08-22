import {
  AvatarCustom,
  ButtonCenteredOnly,
  ButtonCustom,
  SelectCustom,
  Spacing,
  StackCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import BoxButtonOnFooter from "@/components/Box/BoxButtonOnFooter";
import InformationBox from "@/components/Box/InformationBox";
import LandscapeFrameUploaded from "@/components/Image/LandscapeFrameUploaded";
import { useAuth } from "@/hooks/use-auth";
import { apiCreateProfile } from "@/service/api-client/api-profile";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function CreateProfile() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    id: user?.id,
    name: "",
    email: "",
    alamat: "",
    jenisKelamin: "",
  });

  const handlerSave = async () => {
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
      const response = await apiCreateProfile(data);
      console.log("data create profile >>", JSON.stringify(response, null, 2));

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
        text1: "Success",
        text2: "Profile berhasil dibuat",
      });
      router.push("/(application)/(user)/home");
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
          <AvatarCustom size="xl" />
          <Spacing />
          <ButtonCenteredOnly
            icon="upload"
            onPress={() => router.navigate(`/take-picture/${user?.id}`)}
          >
            Upload
          </ButtonCenteredOnly>
        </View>

        <Spacing />

        <View>
          <InformationBox text="Upload foto latar belakang anda." />
          <LandscapeFrameUploaded />
          <Spacing />
          <ButtonCenteredOnly
            icon="upload"
            onPress={() => router.navigate(`/take-picture/${user?.id}`)}
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
