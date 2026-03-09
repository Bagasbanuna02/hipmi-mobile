import {
  BaseBox,
  ButtonCustom,
  LoaderCustom,
  Spacing,
  StackCustom,
  TextCustom,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { BASE_URL } from "@/service/api-config";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface EventDetailQRCodeProps {
  userId: string;
  isLoading: boolean;
}

export function EventDetailQRCode({
  userId,
  isLoading,
}: EventDetailQRCodeProps) {
  const { id } = useLocalSearchParams();
  const [useHttpsLink, setUseHttpsLink] = useState(true);

  // HTTPS link untuk Universal Links (iOS) dan App Links (Android)
  // Ini akan membuka file .well-known di Next.js server Anda
  const httpsLink = `https://cld-dkr-hipmi-stg.wibudev.com/event/${id}/confirmation?userId=${userId}`;

  // Custom scheme link untuk fallback atau testing tanpa universal links
  const deepLinkURL = `${BASE_URL}/event/${id}/confirmation?userId=${userId}`;

  // Toggle antara HTTPS link dan custom scheme
  const qrValue = useHttpsLink ? httpsLink : deepLinkURL;

  return (
    <BaseBox>
      <StackCustom style={{ alignItems: "center" }}>
        <TextCustom bold>QR Code Event</TextCustom>
        {isLoading ? <LoaderCustom /> : <QRCode value={qrValue} size={200} />}
      </StackCustom>
      <Spacing />
      <TextCustom color="gray" align="center" size="small">
        {qrValue}
      </TextCustom>
      <Spacing />
      <StackCustom direction="row" gap="sm">
        <ButtonCustom
          onPress={() => setUseHttpsLink(true)}
          backgroundColor={useHttpsLink ? MainColor.yellow : "transparent"}
          textColor={useHttpsLink ? MainColor.black : MainColor.yellow}
          style={[
            stylesButton.smallButton,
            useHttpsLink && stylesButton.border,
          ]}
        >
          HTTPS
        </ButtonCustom>
        <ButtonCustom
          onPress={() => setUseHttpsLink(false)}
          backgroundColor={!useHttpsLink ? MainColor.yellow : "transparent"}
          textColor={!useHttpsLink ? MainColor.black : MainColor.yellow}
          style={[
            stylesButton.smallButton,
            !useHttpsLink && stylesButton.border,
          ]}
        >
          Custom Scheme
        </ButtonCustom>
      </StackCustom>
      <Spacing />
      <TextCustom color="gray" align="center" size={"small"}>
        {useHttpsLink
          ? "✅ Testing Universal Links/App Links (butuh .well-known config)"
          : "🔧 Testing langsung (tanpa domain verification)"}
      </TextCustom>
    </BaseBox>
  );
}

const stylesButton = StyleSheet.create({
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 140,
  },
  border: {
    borderWidth: 1,
    borderColor: MainColor.yellow,
  },
});
