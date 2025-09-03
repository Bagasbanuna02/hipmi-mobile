/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  BoxButtonOnFooter,
  ButtonCustom,
  CenterCustom,
  SelectCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_XLARGE } from "@/constants/constans-value";
import {
  apiMasterBidangBisnis,
  apiMasterSubBidangBisnis,
} from "@/service/api-client/api-master";
import {
  apiGetOnePortofolio,
  apiUpdatePortofolio,
} from "@/service/api-client/api-portofolio";
import {
  IMasterBidangBisnis,
  IMasterSubBidangBisnis,
} from "@/types/Type-Master";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

interface IFormData {
  id_Portofolio: string;
  namaBisnis: string;
  alamatKantor: string;
  tlpn: string;
  deskripsi: string;
  masterBidangBisnisId: string;
  subBidang: any[];
}

interface IListSubBidangSelected {
  id: string;
  MasterSubBidangBisnis?: {
    id?: string;
    name?: string;
    masterBidangBisnisId?: string;
  };
}

export default function PortofolioEdit() {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});

  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [bidangBisnis, setBidangBisnis] = useState<
    IMasterBidangBisnis[] | null
  >(null);
  const [subBidangBisnis, setSubBidangBisnis] = useState<
    IMasterSubBidangBisnis[] | null
  >(null);
  const [selectedSubBidang, setSelectedSubBidang] = useState<string[]>([]);
  const [listSubBidangSelected, setListSubBidangSelected] = useState<
    IListSubBidangSelected[]
  >([]);

  function handleInputValue(phoneNumber: string) {
    setData({ ...data, tlpn: phoneNumber });
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  const onLoadMasterBidang = async () => {
    try {
      const response = await apiMasterBidangBisnis();
      setBidangBisnis(response.data);

      return response.success;
    } catch (error) {
      setBidangBisnis([]);
      console.log("Error onLoadMasterBidangBisnis", error);
    }
  };

  async function onLoadMasterSubBidangBisnis() {
    try {
      const response = await apiMasterSubBidangBisnis({});
      setSubBidangBisnis(response.data);

      return response.success;
    } catch (error) {
      console.error("Error on load master sub bidang bisnis", error);
    }
  }

  const handleLoadMaster = async (id: string) => {
    const loadBidang = await onLoadMasterBidang();
    const loadSubBidang = await onLoadMasterSubBidangBisnis();

    if (!loadBidang || !loadSubBidang) {
      return;
    }

    onLoadData(id);
  };

  useEffect(() => {
    handleLoadMaster(id as any);
  }, [id]);

  const onLoadData = async (id: string) => {
    const response = await apiGetOnePortofolio({ id: id });

    if (response.success) {
      const fixNumber = response.data.tlpn.replace("62", "");
      setData({ ...response.data, tlpn: fixNumber });

      // Cek apakah ada sub bidang bisnis yang terpilih
      const prevSubBidang = response.data.Portofolio_BidangDanSubBidangBisnis;
      if (prevSubBidang && prevSubBidang.length > 0) {
        setListSubBidangSelected(prevSubBidang);
      } else {
        // Jika tidak ada sub bidang yang terpilih sebelumnya, tetap inisialisasi dengan array kosong
        setListSubBidangSelected([
          {
            id: "",
            MasterSubBidangBisnis: {
              id: "",
              name: "",
            },
          },
        ]);
      }

      const bisnisId = response.data.masterBidangBisnisId;
      handleLoadSelectedSubBidang({
        id: bisnisId,
      });
    }
  };

  // Handler untuk saat komponen pertama kali load
  const handleLoadSelectedSubBidang = ({ id }: { id: string }) => {
    if (!subBidangBisnis) return;

    const filteredSubBidang: any = subBidangBisnis.filter((item) => {
      return item.masterBidangBisnisId === id;
    });
    setSelectedSubBidang(filteredSubBidang);
  };

  // Handler untuk menambah sub bidang bisnis
  const handleAddSubBidang = () => {
    setListSubBidangSelected([
      ...listSubBidangSelected,
      {
        id: "",
        MasterSubBidangBisnis: { id: "", name: "" },
      },
    ]);
  };

  // Handler untuk menghapus sub bidang bisnis
  const handleRemoveSubBidang = (index: number) => {
    if (listSubBidangSelected.length <= 1) return;

    const updatedList = [...listSubBidangSelected];
    updatedList.splice(index, 1);
    setListSubBidangSelected(updatedList);
  };

  // Handler untuk perubahan bidang bisnis
  const handleBidangBisnisChange = (val: string) => {
    const isSameBidang = data?.MasterBidangBisnis?.id === val;

    setData({ ...(data as any), masterBidangBisnisId: val });

    // Reset sub bidang jika ganti bidang
    if (!isSameBidang) {
      setListSubBidangSelected([
        {
          id: "",
          MasterSubBidangBisnis: { id: "", name: "" },
        },
      ]);
    }

    handleLoadSelectedSubBidang({ id: val });
  };

  // Handler untuk update sub bidang
  const handleSubBidangChange = (value: string, index: number) => {
    const select = selectedSubBidang.find((sub: any) => sub.id === value);
    const list: any = _.cloneDeep(listSubBidangSelected);
    list[index] = {
      id: "",
      MasterSubBidangBisnis: select || {
        id: value,
        name: "",
        masterBidangBisnisId: "",
      },
    };
    setListSubBidangSelected(list);
  };

  useEffect(() => {
    if (subBidangBisnis?.length !== undefined && data.masterBidangBisnisId) {
      handleLoadSelectedSubBidang({
        id: data.masterBidangBisnisId,
      });
    }
  }, [subBidangBisnis, data.masterBidangBisnisId]);

  const handleSubmitUpdate = async () => {
    console.log("LIST >>", JSON.stringify(listSubBidangSelected, null, 2));
    // try {
    //   setIsLoading(true);
    //   const callingCode = selectedCountry?.callingCode.replace(/^\+/, "") || "";
    //   const fixNumber = data.tlpn.replace(/\s+/g, "");
    //   const realNumber = callingCode + fixNumber;

    //   const newData: IFormData = {
    //     id_Portofolio: data.id_Portofolio,
    //     namaBisnis: data.namaBisnis,
    //     alamatKantor: data.alamatKantor,
    //     tlpn: realNumber,
    //     deskripsi: data.deskripsi,
    //     masterBidangBisnisId: data.masterBidangBisnisId,
    //     subBidang: listSubBidangSelected,
    //   };

    //   const response = await apiUpdatePortofolio({
    //     id: id as string,
    //     data: newData,
    //     category: "detail",
    //   });

    //   if (!response.success) {
    //     Toast.show({
    //       type: "info",
    //       text1: "Info",
    //       text2: response.message,
    //     });

    //     return;
    //   }

    //   Toast.show({
    //     type: "success",
    //     text1: "Sukses",
    //     text2: "Data terupdate",
    //   });

    //   router.back();
    // } catch (error) {
    //   console.log("Error handleSubmitUpdate", error);
    // } finally {
    //   setIsLoading(false);
    // }
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

  if (!bidangBisnis || !subBidangBisnis) {
    return <ActivityIndicator size="large" color={MainColor.yellow} />;
  }

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
            onChange={(value: any) => {
              handleBidangBisnisChange(value);
            }}
          />

          {listSubBidangSelected.map((item, index) => {
            // Filter data untuk select sub bidang, menghilangkan yang sudah dipilih kecuali untuk item ini sendiri
            const selectedIds = listSubBidangSelected
              .filter((_, i) => i !== index)
              .map((s) => s.MasterSubBidangBisnis?.id)
              .filter((id) => id); // Filter hanya yang memiliki id (tidak kosong)

            const availableSubBidangOptions = (selectedSubBidang || [])
              .filter((sub: any) => {
                // Tampilkan jika ini adalah opsi yang dipilih saat ini atau belum dipilih di sub bidang lainnya

                return (
                  sub.id === item.MasterSubBidangBisnis?.id ||
                  !selectedIds.includes(sub.id)
                );
              })
              .map((sub: any) => ({
                value: sub.id,
                label: sub.name,
              }));

            return (
              <SelectCustom
                key={index}
                label="Sub Bidang Usaha"
                required
                data={availableSubBidangOptions}
                value={item.MasterSubBidangBisnis?.id || null}
                onChange={(value: any) => {
                  handleSubBidangChange(value, index);
                }}
              />
            );
          })}

          <CenterCustom>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <ActionIcon
                disabled={
                  selectedSubBidang.length === listSubBidangSelected.length
                }
                onPress={() => {
                  handleAddSubBidang();
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
                  handleRemoveSubBidang(listSubBidangSelected.length - 1);
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

          <TextCustom>{JSON.stringify(subBidangBisnis, null, 2)}</TextCustom>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
