import {
    BoxButtonOnFooter,
    ButtonCenteredOnly,
    ButtonCustom,
    Grid,
    SelectCustom,
    Spacing,
    StackCustom,
    TextAreaCustom,
    TextCustom,
    TextInputCustom,
    ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import dummyMasterBidangBisnis from "@/lib/dummy-data/master-bidang-bisnis";
import dummyMasterSubBidangBisnis from "@/lib/dummy-data/master-sub-bidang-bisnis";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";

export default function PortofolioEdit() {
  const { id } = useLocalSearchParams();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const [data, setData] = useState({
    namaBisnis: "",
    bidang_usaha: "",
    sub_bidang_usaha: "",
    alamat: "",
    nomor_telepon: "",
    deskripsi: "",
  });

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  function handleSave() {
    console.log(`Update portofolio berhasil ${id}`);
    router.back();
  }

  const buttonUpdate = (
    <BoxButtonOnFooter>
      <ButtonCustom onPress={handleSave}>Simpan</ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={buttonUpdate}>
        <StackCustom gap={"xs"}>
          <TextInputCustom
            required
            label="Nama Bisnis"
            placeholder="Masukkan nama bisnis"
          />

          <SelectCustom
            label="Bidang Usaha"
            required
            data={dummyMasterBidangBisnis.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={data.bidang_usaha}
            onChange={(value) => {
              setData({ ...(data as any), bidang_usaha: value });
            }}
          />

          <Grid>
            <Grid.Col span={10}>
              <SelectCustom
                // disabled
                label="Sub Bidang Usaha"
                required
                data={dummyMasterSubBidangBisnis.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                value={data.sub_bidang_usaha}
                onChange={(value) => {
                  setData({ ...(data as any), sub_bidang_usaha: value });
                }}
              />
            </Grid.Col>
            <Grid.Col
              span={2}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <TouchableOpacity onPress={() => console.log("delete")}>
                <Ionicons name="trash" size={24} color={MainColor.red} />
              </TouchableOpacity>
            </Grid.Col>
          </Grid>
          <ButtonCenteredOnly onPress={() => console.log("add")}>
            Tambah Pilihan
          </ButtonCenteredOnly>
          <Spacing />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextCustom semiBold style={{ color: MainColor.white_gray }}>
                Nomor Telepon
              </TextCustom>
              <Text style={{ color: "red" }}> *</Text>
            </View>
            <Spacing height={5} />
            <PhoneInput
              value={inputValue}
              onChangePhoneNumber={handleInputValue}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={handleSelectedCountry}
              defaultCountry="ID"
              placeholder="xxx-xxx-xxx"
            />
          </View>
          <Spacing />

          <TextInputCustom
            required
            label="Alamat Bisnis"
            placeholder="Masukkan alamat bisnis"
          />

          <TextAreaCustom
            label="Deskripsi Bisnis"
            placeholder="Masukkan deskripsi bisnis"
            value={data.deskripsi}
            onChangeText={(value: any) =>
              setData({ ...data, deskripsi: value })
            }
            autosize
            minRows={2}
            maxRows={5}
            required
            showCount
            maxLength={100}
          />
          <Spacing />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
