/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ButtonCustom,
  SelectCustom,
  StackCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function ProfileEdit() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState({
    nama: "Bagas Banuna",
    email: "bagasbanuna@gmail.com",
    alamat: "Jember",
    selectedValue: "",
  });

  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt.js", value: "nuxtjs" },
    { label: "Remix", value: "remix" },
    { label: "Sapper", value: "sapper" },
    { label: "SvelteKit", value: "sveltekit" },
  ];

  const handleSave = () => {
    console.log({
      nama: data.nama,
      email: data.email,
      alamat: data.alamat,
      selectedValue: data.selectedValue,
    });
    router.back();
  };

  return (
    <ViewWrapper
      bottomBarComponent={
        <ButtonCustom
          disabled={
            !data.nama || !data.email || !data.alamat || !data.selectedValue
          }
          onPress={handleSave}
        >
          Simpan
        </ButtonCustom>
      }
    >
      <StackCustom gap={"xs"}>
        <SelectCustom
          label="Framework"
          placeholder="Pilih framework favoritmu"
          data={options}
          value={data.selectedValue}
          onChange={(value) => {
            setData({ ...(data as any), selectedValue: value });
          }}
        />

        <TextInputCustom
          label="Nama"
          placeholder="Nama"
          value={data.nama}
          onChangeText={(text) => {
            setData({ ...data, nama: text });
          }}
          required
        />
        <TextInputCustom
          label="Email"
          placeholder="Email"
          value={data.email}
          onChangeText={(text) => {
            setData({ ...data, email: text });
          }}
          required
        />
        <TextInputCustom
          label="Alamat"
          placeholder="Alamat"
          value={data.alamat}
          onChangeText={(text) => {
            setData({ ...data, alamat: text });
          }}
          required
        />
      </StackCustom>
    </ViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
