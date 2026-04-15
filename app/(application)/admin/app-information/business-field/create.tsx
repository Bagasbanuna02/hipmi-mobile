import {
  ActionIcon,
  BoxButtonOnFooter,
  ButtonCustom,
  CenterCustom,
  Grid,
  OS_Wrapper,
  Spacing,
  StackCustom,
  TextInputCustom,
} from "@/components";
import AdminBackButtonAntTitle from "@/components/_ShareComponent/Admin/BackButtonAntTitle";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_XLARGE } from "@/constants/constans-value";
import { apiAdminMasterBusinessFieldCreate } from "@/service/api-admin/api-master-admin";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import _ from "lodash";
import { useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function AdminAppInformation_BusinessFieldCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [bidang, setBidang] = useState<any>({
    name: "",
  });
  const [subBidang, setSubBidang] = useState<any[]>([
    {
      name: "",
    },
  ]);

  const handlerSubmit = async () => {
    if (!bidang.name) {
      Toast.show({
        type: "error",
        text1: "Lengkapi Data",
      });
      return;
    }

    if (subBidang[0].name === "") {
      Toast.show({
        type: "error",
        text1: "Lengkapi Sub Bidang",
      });
      return;
    }

    try {
      setIsLoading(true);

      const newData = {
        bidang: bidang,
        subBidang: subBidang,
      };

      console.log("[DATA]", newData);

      const response = await apiAdminMasterBusinessFieldCreate({
        data: newData,
      });

      console.log("[RESPONSE]", response);

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Data berhasil di tambah",
        });
        // router.back();
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal tambah data",
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
      Toast.show({
        type: "error",
        text1: "Gagal tambah data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        disabled={subBidang[0].name === ""}
        onPress={() => handlerSubmit()}
        isLoading={isLoading}
      >
        Tambah
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <OS_Wrapper enableKeyboardHandling contentPaddingBottom={250} footerComponent={buttonSubmit}>
        <StackCustom gap={"xs"}>
          <AdminBackButtonAntTitle title="Tambah Bidang Bisnis" />

          <TextInputCustom
            label="Nama Bidang Bisnis"
            placeholder="Masukan Nama Bidang Bisnis"
            required
            value={bidang.name}
            onChangeText={(value) => setBidang({ ...bidang, name: value })}
          />

          <Divider />
          <Spacing height={5} />

          {subBidang.map((item, index) => (
            <TextInputCustom
              key={index}
              label="Nama Sub Bidang"
              placeholder="Masukan Nama Sub Bidang"
              required
              value={item.name}
              onChangeText={(value) => {
                const list = _.clone(subBidang);
                list[index].name = value;
                setSubBidang(list);
              }}
            />
          ))}

          <CenterCustom>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <ActionIcon
                onPress={() => {
                  setSubBidang([...subBidang, { name: "" }]);
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
                disabled={subBidang.length <= 1}
                onPress={() => {
                  const list = _.clone(subBidang);
                  list.pop();
                  setSubBidang(list);
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
        </StackCustom>
      </OS_Wrapper>
    </>
  );
}
