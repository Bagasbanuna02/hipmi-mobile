/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ButtonCustom,
  SelectCustom,
  StackCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import BoxButtonOnFooter from "@/components/Box/BoxButtonOnFooter";
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
    { label: "Laki-laki", value: "laki-laki" },
    { label: "Perempuan", value: "perempuan" },
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
      footerComponent={
        <BoxButtonOnFooter>
          <ButtonCustom
            // disabled={
            //   !data.nama || !data.email || !data.alamat || !data.selectedValue
            // }
            onPress={handleSave}
          >
            Simpan
          </ButtonCustom>
        </BoxButtonOnFooter>
      }
    >
      <StackCustom gap={"xs"}>
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
        <SelectCustom
          required
          label="Jenis Kelamin"
          placeholder="Pilih jenis kelamin"
          data={options}
          value={data.selectedValue}
          onChange={(value) => {
            setData({ ...(data as any), selectedValue: value });
          }}
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
