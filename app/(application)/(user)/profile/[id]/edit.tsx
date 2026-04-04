import {
  ButtonCustom,
  NewWrapper_V2,
  SelectCustom,
  StackCustom,
  TextInputCustom,
} from "@/components";
import BoxButtonOnFooter from "@/components/Box/BoxButtonOnFooter";
import { apiProfile, apiUpdateProfile } from "@/service/api-client/api-profile";
import { IProfile } from "@/types/Type-Profile";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function ProfileEdit() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState<IProfile | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const options = [
    { label: "Laki-laki", value: "laki-laki" },
    { label: "Perempuan", value: "perempuan" },
  ];

  useEffect(() => {
    onLoadData(id as string);
  }, [id]);

  async function onLoadData(id: string) {
    try {
      const response = await apiProfile({ id });
      setData(response.data);
    } catch (error) {
      console.log("error get profile >>", error);
    }
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await apiUpdateProfile({
        id: id as string,
        data,
        category: "profile",
      });
      if (!response.success) {
        Toast.show({
          type: "info",
          text1: "Info",
          text2: response.message,
        });

        return;
      }

      

      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Profile berhasil diupdate",
      });
      return router.back();
    } catch (error) {
      console.log("error update profile >>", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NewWrapper_V2
      enableKeyboardHandling
      keyboardScrollOffset={100}
      footerComponent={
        <BoxButtonOnFooter>
          <ButtonCustom isLoading={isLoading} onPress={handleUpdate}>
            Update
          </ButtonCustom>
        </BoxButtonOnFooter>
      }
    >
      <StackCustom gap={"xs"}>
        <View onStartShouldSetResponder={() => true}>
          <TextInputCustom
            label="Nama"
            placeholder="Nama"
            value={data?.name}
            onChangeText={(text) => {
              setData({ ...data, name: text });
            }}
            required
          />
        </View>
        <View onStartShouldSetResponder={() => true}>
          <TextInputCustom
            keyboardType="email-address"
            label="Email"
            placeholder="Email"
            value={data?.email}
            onChangeText={(text) => {
              setData({ ...data, email: text });
            }}
            required
          />
        </View>
        <View onStartShouldSetResponder={() => true}>
          <TextInputCustom
            label="Alamat"
            placeholder="Alamat"
            value={data?.alamat}
            onChangeText={(text) => {
              setData({ ...data, alamat: text });
            }}
            required
          />
        </View>
        <View onStartShouldSetResponder={() => true}>
          <SelectCustom
            required
            label="Jenis Kelamin"
            placeholder="Pilih jenis kelamin"
            data={options}
            value={data?.jenisKelamin}
            onChange={(value) => {
              setData({ ...(data as any), jenisKelamin: value });
            }}
          />
        </View>
      </StackCustom>
    </NewWrapper_V2>
  );
}
