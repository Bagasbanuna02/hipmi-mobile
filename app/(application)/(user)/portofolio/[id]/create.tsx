/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AvatarComp,
  BaseBox,
  ButtonCenteredOnly,
  CenterCustom,
  InformationBox,
  SelectCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import DUMMY_IMAGE from "@/constants/dummy-image-value";
import Portofolio_ButtonCreate from "@/screens/Portofolio/ButtonCreatePortofolio";
import {
  apiMasterBidangBisnis,
  apiMasterSubBidangBisnis,
} from "@/service/api-client/api-master";
import {
  IMasterBidangBisnis,
  IMasterSubBidangBisnis,
} from "@/types/Type-Master";
import pickImage from "@/utils/pickImage";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import { Avatar } from "react-native-paper";

export default function PortofolioCreate() {
  const { id } = useLocalSearchParams();
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState({
    namaBisnis: "",
    masterBidangBisnisId: "",
    alamatKantor: "",
    tlpn: "",
    deskripsi: "",
  });
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [bidangBisnis, setBidangBisnis] = useState<IMasterBidangBisnis[]>([]);
  const [selectBidangId, setSelectBidangId] = useState<string>("");
  const [subBidangBisnis, setSubBidangBisnis] = useState<
    IMasterSubBidangBisnis[]
  >([]);

  // const [subBidangSelected, setSubBidangSelected] = useState<string[]>([]);
  const [listSubBidangSelected, setListSubBidangSelected] = useState([
    {
      id: "",
    },
  ]);

  const [dataMedsos, setDataMedsos] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
    const callingCode = selectedCountry?.callingCode.replace(/^\+/, "") || "";
    const fixNumber = inputValue.replace(/\s+/g, "");
    const realNumber = callingCode + fixNumber;
    setData({ ...data, tlpn: realNumber });
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  useEffect(() => {
    onLoadMaster();
  }, []);

  const onLoadMaster = async () => {
    try {
      const response = await apiMasterBidangBisnis();
      setBidangBisnis(response.data);
    } catch (error) {
      setBidangBisnis([]);
      console.log("Error onLoadMasterBidangBisnis", error);
    }
  };

  const onLoadMasterSubBidangBisnis = async ({ id }: { id: string }) => {
    try {
      const response = await apiMasterSubBidangBisnis({ id: id });
      setSubBidangBisnis(response.data);
    } catch (error) {
      console.log("Error onLoadMasterBidangBisnis", error);
    }
  };

  return (
    <ViewWrapper
      footerComponent={
        <Portofolio_ButtonCreate
          id={id as string}
          data={data}
          dataMedsos={dataMedsos}
          imageUri={imageUri}
          subBidangSelected={listSubBidangSelected}
          isLoadingCreate={isLoadingCreate}
          setIsLoadingCreate={setIsLoadingCreate}
        />
      }
    >
      {/* <TextCustom>Portofolio Create {id}</TextCustom> */}
      <StackCustom gap={"xs"}>
        <InformationBox text="Lengkapi data bisnis anda." />
        <TextInputCustom
          required
          label="Nama Bisnis"
          placeholder="Masukkan nama bisnis"
          onChangeText={(value: any) => setData({ ...data, namaBisnis: value })}
        />

        <SelectCustom
          label="Bidang Usaha"
          required
          data={bidangBisnis.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          value={data.masterBidangBisnisId}
          onChange={(value) => {
            setData({ ...(data as any), masterBidangBisnisId: value });
            setSelectBidangId(id as string);
            onLoadMasterSubBidangBisnis({ id: value as string });
          }}
        />

        {/* {listSubBidangSelected.map((item, index) => (
          <Grid key={index}>
            <Grid.Col span={10}>
              <SelectCustom
                disabled={selectBidangId === ""}
                label="Sub Bidang Usaha"
                required
                data={subBidangBisnis.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                value={data.sub_bidang_usaha}
                onChange={(value) => {
                  setData({ ...(data as any), sub_bidang_usaha: value });
                  setListSubBidangSelected([
                    ...listSubBidangSelected,
                    { id: value as string },
                  ]);
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
        ))}

        <ButtonCenteredOnly
          onPress={() => {
            setListSubBidangSelected([...listSubBidangSelected, { id: "" }]);
          }}
        >
          Tambah Pilihan
        </ButtonCenteredOnly>
        <Spacing /> */}

        {/* <TextCustom>{JSON.stringify(bidangBisnis, null, 2)}</TextCustom> */}

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
          onChangeText={(value: any) =>
            setData({ ...data, alamatKantor: value })
          }
        />

        <TextAreaCustom
          label="Deskripsi Bisnis"
          placeholder="Masukkan deskripsi bisnis"
          value={data.deskripsi}
          onChangeText={(value: any) => setData({ ...data, deskripsi: value })}
          autosize
          minRows={2}
          maxRows={5}
          required
          showCount
          maxLength={1000}
        />
        <Spacing />

        {/* Logo */}
        <InformationBox text="Upload logo bisnis anda untuk di tampilaka pada portofolio." />

        <CenterCustom>
          <Avatar.Image
            source={imageUri ? { uri: imageUri } : DUMMY_IMAGE.dummy_image}
            size={200}
          />
        </CenterCustom>
        <Spacing />
        <ButtonCenteredOnly
          icon="upload"
          onPress={() => {
            pickImage({
              setImageUri,
            });
          }}
        >
          Upload
        </ButtonCenteredOnly>
        <Spacing height={40} />

        {/* Social Media */}
        <InformationBox text="Isi hanya pada sosial media yang anda miliki." />
        <TextInputCustom
          label="Tiktok"
          placeholder="Masukkan username tiktok"
          onChangeText={(value: any) =>
            setDataMedsos({ ...dataMedsos, tiktok: value })
          }
        />
        <TextInputCustom
          label="Facebook"
          placeholder="Masukkan username facebook"
          onChangeText={(value: any) =>
            setDataMedsos({ ...dataMedsos, facebook: value })
          }
        />
        <TextInputCustom
          label="Instagram"
          placeholder="Masukkan username instagram"
          onChangeText={(value: any) =>
            setDataMedsos({ ...dataMedsos, instagram: value })
          }
        />
        <TextInputCustom
          label="Twitter"
          placeholder="Masukkan username twitter"
          onChangeText={(value: any) =>
            setDataMedsos({ ...dataMedsos, twitter: value })
          }
        />
        <TextInputCustom
          label="Youtube"
          placeholder="Masukkan username youtube"
          onChangeText={(value: any) =>
            setDataMedsos({ ...dataMedsos, youtube: value })
          }
        />
        <Spacing />
      </StackCustom>
    </ViewWrapper>
  );
}
