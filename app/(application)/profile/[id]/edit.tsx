/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ButtonCustom,
  SelectCustom,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function ProfileEdit() {
  const { id } = useLocalSearchParams();

  const [nama, setNama] = useState("Bagas Banuna");
  const [email, setEmail] = useState("bagasbanuna@gmail.com");
  const [alamat, setAlamat] = useState("Bandar Lampung");

  const [selectedValue, setSelectedValue] = useState<string | number>("");

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

  return (
    <ViewWrapper
      bottomBarComponent={
        <ButtonCustom
          disabled={!nama || !email || !alamat || !selectedValue}
          onPress={() => {
            console.log("data >>", nama, email, alamat, selectedValue);
            router.back();
          }}
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
          value={selectedValue}
          onChange={setSelectedValue}
        />
        {/* {selectedValue && (
        <Text style={styles.result}>Terpilih: {selectedValue}</Text>
      )} */}

        <TextInputCustom
          label="Nama"
          placeholder="Nama"
          value={nama}
          onChangeText={(text) => {
            setNama(text);
          }}
          required
        />
        <TextInputCustom
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          required
        />
        <TextInputCustom
          label="Alamat"
          placeholder="Alamat"
          value={alamat}
          onChangeText={(text) => {
            setAlamat(text);
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
