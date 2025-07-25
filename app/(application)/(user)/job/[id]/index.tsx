import {
  BaseBox,
  ButtonCustom,
  Spacing,
  StackCustom,
  TextCustom,
  ViewWrapper,
} from "@/components";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import { jobDataDummy } from "@/screens/Job/listDataDummy";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Alert, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import { MainColor } from "@/constants/color-palet";

export default function JobDetail() {
  const { id } = useLocalSearchParams();

  const jobDetail = jobDataDummy.find((e) => e.id === Number(id));

  const OpenLinkButton = () => {
    const jobUrl =
      "https://stg-hipmi.wibudev.com/job-vacancy/cm6ijt9w8005zucv4twsct657";

    const openInBrowser = async () => {
      const supported = await Linking.canOpenURL(jobUrl);
      if (supported) {
        await Linking.openURL(jobUrl);
      } else {
        Alert.alert("Gagal membuka link", "Browser tidak tersedia.");
      }
    };

    return (
      <ButtonCustom
        iconLeft={<Ionicons name="globe" size={ICON_SIZE_SMALL} color="white" />}
        onPress={openInBrowser}
        backgroundColor="green"
        textColor="white"
      >
        Buka Lowongan di Browser
      </ButtonCustom>
    );
  };

  const CopyLinkButton = () => {
    const jobUrl =
      "https://stg-hipmi.wibudev.com/job-vacancy/cm6ijt9w8005zucv4twsct657";

    const copyToClipboard = async () => {
      await Clipboard.setStringAsync(jobUrl);
      Alert.alert(
        "Link disalin",
        "Tautan lowongan telah disalin ke clipboard."
      );
    };

    return (
      <ButtonCustom
        iconLeft={<Ionicons name="copy" size={ICON_SIZE_SMALL} color="white" />}
        onPress={copyToClipboard}
        backgroundColor={MainColor.orange}
        textColor="white"
      >
        Salin Link
      </ButtonCustom>
    );
  };

  return (
    <ViewWrapper>
      <BaseBox>
        <StackCustom gap={"lg"}>
          <TextCustom align="center" bold size="large">
            {jobDetail?.posisi}
          </TextCustom>

          <StackCustom gap={"sm"}>
            <TextCustom bold>Syarat & Ketentuan :</TextCustom>
            <TextCustom>{jobDetail?.syaratKetentuan}</TextCustom>
          </StackCustom>

          <StackCustom gap={"sm"}>
            <TextCustom bold>Deskripsi :</TextCustom>
            <TextCustom>{jobDetail?.deskripsi}</TextCustom>
          </StackCustom>
        </StackCustom>
      </BaseBox>
      <OpenLinkButton />
      <Spacing/>
      <CopyLinkButton />
    </ViewWrapper>
  );
}
