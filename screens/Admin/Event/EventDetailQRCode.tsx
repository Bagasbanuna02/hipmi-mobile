import { BaseBox, LoaderCustom, Spacing, StackCustom, TextCustom } from "@/components";
import QRCode from "react-native-qrcode-svg";

interface EventDetailQRCodeProps {
  qrValue: string;
  isLoading: boolean;
}

export function EventDetailQRCode({ qrValue, isLoading }: EventDetailQRCodeProps) {
  return (
    <BaseBox>
      <StackCustom style={{ alignItems: "center" }}>
        <TextCustom bold>QR Code Event</TextCustom>
        {isLoading ? (
          <LoaderCustom />
        ) : (
          <QRCode
            value={qrValue}
            size={200}
          />
        )}
      </StackCustom>
      <Spacing />
    </BaseBox>
  );
}
