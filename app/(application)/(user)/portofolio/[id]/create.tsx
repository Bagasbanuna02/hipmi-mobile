/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionIcon,
  AvatarComp,
  BaseBox,
  ButtonCenteredOnly,
  CenterCustom,
  Grid,
  InformationBox,
  NewWrapper,
  SelectCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { IconPlus } from "@/components/_Icon";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_XLARGE } from "@/constants/constans-value";
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
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
  const [subBidangBisnis, setSubBidangBisnis] = useState<
    IMasterSubBidangBisnis[]
  >([]);

  const [selectedSubBidang, setSelectedSubBidang] = useState<string[]>([]);
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
    let fixNumber = inputValue.replace(/\s+/g, "").replace(/^0+/, "");
    const realNumber = callingCode + fixNumber;
    setData({ ...data, tlpn: realNumber });
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  useFocusEffect(
    useCallback(() => {
      onLoadMaster();
      onLoadMasterSubBidangBisnis();
    }, [])
  );

  const onLoadMaster = async () => {
    try {
      const response = await apiMasterBidangBisnis();
      setBidangBisnis(response.data);
    } catch (error) {
      setBidangBisnis([]);
      console.log("Error onLoadMasterBidangBisnis", error);
    }
  };

  const onLoadMasterSubBidangBisnis = async () => {
    try {
      const response = await apiMasterSubBidangBisnis({});
      setSubBidangBisnis(response.data);
    } catch (error) {
      setSubBidangBisnis([]);
      console.log("Error onLoadMasterBidangBisnis", error);
    }
  };

  const handlerSelectedSubBidang = ({ id }: { id: string }) => {
    const selectedList = subBidangBisnis?.filter(
      (item) => (item?.masterBidangBisnisId as any) === id
    );
    setSelectedSubBidang(selectedList as any[]);
  };

  return (
    <NewWrapper
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
            const isSameBidang = data.masterBidangBisnisId === value;

            if (!isSameBidang) {
              setListSubBidangSelected([{ id: "" }]);
            }

            setData({ ...(data as any), masterBidangBisnisId: value });
            handlerSelectedSubBidang({ id: value as string });
          }}
        />

        {listSubBidangSelected.map((item, index) => (
          <SelectCustom
            key={index}
            disabled={data.masterBidangBisnisId === ""}
            label="Sub Bidang Usaha"
            required
            data={_.map(selectedSubBidang as any)
              .filter((option: any) => {
                const selectedValues = listSubBidangSelected.map((s) => s.id);
                return (
                  option.id === item.id || // biarkan tetap muncul kalau ini valuenya sendiri
                  !selectedValues.includes(option.id)
                );
              })
              .map((e: any) => ({
                value: e.id,
                label: e.name,
              }))}
            value={item.id || null}
            onChange={(value) => {
              const list = _.clone(listSubBidangSelected);
              list[index].id = value as any;
              setListSubBidangSelected(list);
            }}
          />
        ))}

        <CenterCustom>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <ActionIcon
              disabled={
                selectedSubBidang.length === listSubBidangSelected.length
              }
              onPress={() => {
                setListSubBidangSelected([
                  ...listSubBidangSelected,
                  { id: "" },
                ]);
              }}
              icon={
                <Ionicons
                  name="add-circle-outline"
                  size={ICON_SIZE_XLARGE}
                  color={MainColor.black}
                />
              }
              size="xl"
            />
            <ActionIcon
              disabled={listSubBidangSelected.length <= 1}
              onPress={() => {
                const list = _.clone(listSubBidangSelected);
                list.pop();
                setListSubBidangSelected(list);
              }}
              icon={
                <Ionicons
                  name="remove-circle-outline"
                  size={ICON_SIZE_XLARGE}
                  color={MainColor.black}
                />
              }
              size="xl"
            />
          </View>
        </CenterCustom>
        <Spacing />

        {/* <SelectCustom
          label="Bidang Usaha"
          required
          data={bidangBisnis.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          value={null}
          onChange={(value) => {
            setData({ ...(data as any), masterBidangBisnisId: value });
            handlerSelectedSubBidang({ id: value as string });
          }}
        /> */}

        {/* <ButtonCenteredOnly
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
        {/* <Spacing /> */}
      </StackCustom>
    </NewWrapper>
  );
}
