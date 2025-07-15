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
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function CreateProfile() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    gender: "",
  });

  const handlerSave = () => {
    console.log("data create profile >>", data);
    router.back();
  };

  const footerComponent = (
    <BoxButtonOnFooter>
      <ButtonCustom
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
            onPress={() => router.navigate(`/take-picture/${id}`)}
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
            onPress={() => router.navigate(`/take-picture/${id}`)}
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
          value={data.address}
          onChangeText={(text) => setData({ ...data, address: text })}
        />
        <SelectCustom
          label="Jenis Kelamin"
          placeholder="Pilih jenis kelamin"
          data={[
            { label: "Laki-laki", value: "laki-laki" },
            { label: "Perempuan", value: "perempuan" },
          ]}
          value={data.gender}
          required
          onChange={(value) => setData({ ...(data as any), gender: value })}
        />
        <Spacing />
      </StackCustom>
    </ViewWrapper>
  );
}
