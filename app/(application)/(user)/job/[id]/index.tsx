/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonCustom, LoaderCustom, PageWrapper, Spacing, StackCustom } from "@/components";
import { MainColor } from "@/constants/color-palet";
import { ICON_SIZE_SMALL } from "@/constants/constans-value";
import Job_BoxDetailSection from "@/screens/Job/BoxDetailSection";
import { apiJobGetOne } from "@/service/api-client/api-job";
import { BASE_URL } from "@/service/api-config";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";

export default function JobDetail() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onLoadData();
  }, [id]);

  const onLoadData = async () => {
    try {
      setIsLoading(true);
      const response = await apiJobGetOne({ id: id as string });

      console.log("DATA", JSON.stringify(response.data, null,2));

      setData(response.data);
    } catch (error) {
      console.log("[ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  const baseUrl = BASE_URL;
  const linkUrl = `${baseUrl}/job-vacancy/`;

  const OpenLinkButton = ({ id }: { id: string }) => {
    const jobUrl = `${linkUrl}${id}`;

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
        iconLeft={
          <Ionicons name="globe" size={ICON_SIZE_SMALL} color="white" />
        }
        onPress={openInBrowser}
        backgroundColor="green"
        textColor="white"
      >
        Buka Lowongan di Browser
      </ButtonCustom>
    );
  };

  const CopyLinkButton = ({ id }: { id: string }) => {
    const jobUrl = `${linkUrl}${id}`;

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
    <PageWrapper>
      {isLoading ? (
        <LoaderCustom />
      ) : (
        <>
          <Job_BoxDetailSection data={data} />
          <StackCustom>
            <OpenLinkButton id={id as string} />
            <CopyLinkButton id={id as string} />
          </StackCustom>
          <Spacing />
        </>
      )}
    </PageWrapper>
  );
}
