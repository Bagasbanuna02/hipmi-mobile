/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ButtonCustom,
  StackCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function ProfileEdit() {
  const { id } = useLocalSearchParams();

  const [nama, setNama] = useState("Bagas Banuna");
  const [email, setEmail] = useState("bagasbanuna@gmail.com");
  const [alamat, setAlamat] = useState("Bandar Lampung");

  return (
    <ViewWrapper
      bottomBarComponent={
        <ButtonCustom
          disabled={!nama || !email || !alamat}
          onPress={() => {
            console.log("data >>", nama, email, alamat);
            // router.back();
          }}
        >
          Simpan
        </ButtonCustom>
      }
    >
      <StackCustom gap={"xs"}>
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
