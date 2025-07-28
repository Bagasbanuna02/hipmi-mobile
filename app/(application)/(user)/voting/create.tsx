import {
  BoxButtonOnFooter,
  ButtonCenteredOnly,
  ButtonCustom,
  Grid,
  Spacing,
  StackCustom,
  TextAreaCustom,
  TextInputCustom,
  ViewWrapper,
} from "@/components";
import DateTimePickerCustom from "@/components/DateInput/DateTimePickerCustom";
import { MainColor } from "@/constants/color-palet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function VotingCreate() {
  const buttonSubmit = () => {
    return (
      <>
        <BoxButtonOnFooter>
          <ButtonCustom
            onPress={() =>
              router.replace("/(application)/(user)/voting/(tabs)/status")
            }
          >
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
        />
        <TextAreaCustom
          label="Deskripsi"
          placeholder="Masukan Deskripsi"
          required
          showCount
          maxLength={1000}
        />
        <DateTimePickerCustom label="Mulai Voting" required />
        <DateTimePickerCustom label="Voting Berakhir" required />

        <Grid>
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
        </Grid>

        <ButtonCenteredOnly onPress={() => console.log("add")}>
          Tambah Pilihan
        </ButtonCenteredOnly>
        <Spacing />
      </StackCustom>
    </ViewWrapper>
  );
}
