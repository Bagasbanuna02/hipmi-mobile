import {
  BoxButtonOnFooter,
  ButtonCustom,
  SelectCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { apiMasterBidangBisnis } from "@/service/api-client/api-master";
import {
  apiGetOnePortofolio,
  apiUpdatePortofolio,
} from "@/service/api-client/api-portofolio";
import { IMasterBidangBisnis } from "@/types/Type-Master";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import Toast from "react-native-toast-message";

interface IFormData {
  id_Portofolio: string;
  namaBisnis: string;
  alamatKantor: string;
  tlpn: string;
  deskripsi: string;
  masterBidangBisnisId: string;
}

export default function PortofolioEdit() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [bidangBisnis, setBidangBisnis] = useState<IMasterBidangBisnis[]>([]);
  const [data, setData] = useState<any>({});

  function handleInputValue(phoneNumber: string) {
    setData({ ...data, tlpn: phoneNumber });
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  useEffect(() => {
    onLoadData(id as string);
    onLoadMaster();
  }, [id]);

  const onLoadData = async (id: string) => {
    const response = await apiGetOnePortofolio({ id: id });

    if (response.data.tlpn && response.data.tlpn.includes("62")) {
      const fixNumber = response.data.tlpn.replace("62", "");
      console.log("Fix Number >>", fixNumber);
      setData({ ...response.data, tlpn: fixNumber });
    }
  };

  const onLoadMaster = async () => {
    try {
      const response = await apiMasterBidangBisnis();
      setBidangBisnis(response.data);
    } catch (error) {
      setBidangBisnis([]);
      console.log("Error onLoadMasterBidangBisnis", error);
    }
  };

  const handleSubmitUpdate = async () => {
    try {
      setIsLoading(true);
      const callingCode = selectedCountry?.callingCode.replace(/^\+/, "") || "";
      const fixNumber = data.tlpn.replace(/\s+/g, "");
      const realNumber = callingCode + fixNumber;

      const newData: IFormData = {
        id_Portofolio: data.id_Portofolio,
        namaBisnis: data.namaBisnis,
        alamatKantor: data.alamatKantor,
        tlpn: realNumber,
        deskripsi: data.deskripsi,
        masterBidangBisnisId: data.masterBidangBisnisId,
      };

      const response = await apiUpdatePortofolio({
        id: id as string,
        data: newData,
        category: "detail",
      });

      if (!response.success) {
        Toast.show({
          type: "info",
          text1: "Info",
          text2: response.message,
        });

        return
      }

        Toast.show({
              type: "success",
              text1: "Sukses",
              text2: "Data terupdate",
            });

      router.back();
    } catch (error) {
      console.log("Error handleSubmitUpdate", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonUpdate = (
    <BoxButtonOnFooter>
      <ButtonCustom
        isLoading={isLoading}
        disabled={isLoading}
        onPress={handleSubmitUpdate}
      >
        Update
      </ButtonCustom>
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
            value={data.namaBisnis}
            onChangeText={(value: any) =>
              setData({ ...data, namaBisnis: value })
            }
          />

          <SelectCustom
            label="Bidang Usaha"
            required
            data={bidangBisnis?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={data.masterBidangBisnisId}
            onChange={(value) => {
              setData({ ...(data as any), masterBidangBisnisId: value });
            }}
          />

          {/* <Grid>
            <Grid.Col span={10}>
              <SelectCustom
                // disabled
                label="Sub Bidang Usaha"
                required
                data={dummyMasterSubBidangBisnis.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                value={data.masterSubBidangBisnisId}
                onChange={(value) => {
                  setData({ ...(data as any), masterSubBidangBisnisId: value });
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
          </Grid> */}
          {/* <ButtonCenteredOnly onPress={() => console.log("add")}>
            Tambah Pilihan
          </ButtonCenteredOnly>
          <Spacing /> */}

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextCustom semiBold style={{ color: MainColor.white_gray }}>
                Nomor Telepon
              </TextCustom>
              <Text style={{ color: "red" }}> *</Text>
            </View>
            <Spacing height={5} />
            <PhoneInput
              value={data.tlpn}
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
            value={data.alamatKantor}
            onChangeText={(value: any) =>
              setData({ ...data, alamatKantor: value })
            }
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
            maxLength={1000}
          />
          <Spacing />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
