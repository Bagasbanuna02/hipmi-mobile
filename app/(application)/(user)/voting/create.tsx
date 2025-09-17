import {
  ActionIcon,
  BoxButtonOnFooter,
  ButtonCustom,
  CenterCustom,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
  ViewWrapper
} from "@/components";
import DateTimePickerCustom from "@/components/DateInput/DateTimePickerCustom";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_XLARGE } from "@/constants/constans-value";
import { useAuth } from "@/hooks/use-auth";
import { apiVotingCreate } from "@/service/api-client/api-voting";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import _ from "lodash";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function VotingCreate() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    authorId: "",
    title: "",
    deskripsi: "",
    awalVote: "",
    akhirVote: "",
    listVote: [],
  });

  const [listVote, setListVote] = useState([
    {
      name: "Nama Pilihan",
      value: "",
    },
    {
      name: "Nama Pilihan",
      value: "",
    },
  ]);

  const handlerSubmit = async () => {
    if (!data.title || !data.deskripsi || !data.awalVote || !data.akhirVote) {
      Toast.show({
        type: "info",
        text1: "Lengkapi semua data",
      });
      return;
    }

    if (listVote.some((item: any) => item.value === "")) {
      Toast.show({
        type: "info",
        text1: "Lengkapi semua data pilihan",
      });
      return;
    }

    try {
      setIsLoading(true);
      const newData = {
        ...data,
        authorId: user?.id,
        awalVote: new Date(data.awalVote as any).toISOString(),
        akhirVote: new Date(data.akhirVote as any).toISOString(),
        listVote: listVote,
      };

      const response = await apiVotingCreate(newData);
      // console.log("[RESPONSE]", JSON.stringify(response, null, 2));

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Data berhasil disimpan",
        });
        router.replace("/(application)/(user)/voting/(tabs)/status");
      } else {
        Toast.show({
          type: "error",
          text1: "Data gagal disimpan",
        });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonSubmit = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom isLoading={isLoading} onPress={() => handlerSubmit()}>
            Simpan
          </ButtonCustom>
        </BoxButtonOnFooter>
      </>
    );
  };

  return (
    <ViewWrapper footerComponent={buttonSubmit()}>
      <StackCustom gap={"xs"}>
        <TextInputCustom
          label="Judul Voting"
          placeholder="MasukanJudul Voting"
          required
          value={data.title}
          onChangeText={(value: any) => setData({ ...data, title: value })}
        />
        <TextAreaCustom
          label="Deskripsi"
          placeholder="Masukan Deskripsi"
          required
          showCount
          maxLength={1000}
          value={data.deskripsi}
          onChangeText={(value: any) => setData({ ...data, deskripsi: value })}
        />
        <DateTimePickerCustom
          label="Mulai Voting"
          required
          // value={data.awalVote ? new Date(data.awalVote) : null}
          onChange={(value: any) => setData({ ...data, awalVote: value })}
          minimumDate={new Date(Date.now())}
        />
        <DateTimePickerCustom
          disabled={!data.awalVote}
          label="Voting Berakhir"
          required
          // value={data.akhirVote ? new Date(data.akhirVote) : null}
          onChange={(value: any) => setData({ ...data, akhirVote: value })}
          minimumDate={
            data.awalVote ? new Date(data.awalVote) : new Date(Date.now())
          }
        />

        {/* <Grid>
          <Grid.Col span={10}>
            <TextInputCustom
              label="Pilihan"
              placeholder="Masukan Pilihan"
              required
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
        </ButtonCenteredOnly> */}

        {listVote.map((item, index) => (
          <TextInputCustom
            key={index}
            label="Pilihan"
            placeholder="Masukan Pilihan"
            required
            value={item.value}
            onChangeText={(value: any) =>
              setListVote(
                listVote.map((item, i) =>
                  i === index ? { ...item, value } : item
                )
              )
            }
          />
        ))}

        <CenterCustom>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <ActionIcon
              disabled={listVote.length >= 4}
              onPress={() => {
                setListVote([...listVote, { name: "Nama Pilihan", value: "" }]);
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
              disabled={listVote.length <= 2}
              onPress={() => {
                const list = _.clone(listVote);
                list.pop();
                setListVote(list);
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

        <Spacing />
      </StackCustom>
    </ViewWrapper>
  );
}
