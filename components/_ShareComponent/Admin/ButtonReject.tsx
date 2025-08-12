import { IconReject } from "@/components/_Icon/IconComponent";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { MainColor } from "@/constants/color-palet";

export default function AdminButtonReject({
  title,
  onReject,
}: {
  title: string;
  onReject: () => void;
}) {
  return (
    <>
      <ButtonCustom
        iconLeft={<IconReject />}
        backgroundColor={MainColor.red}
        textColor="white"
        onPress={onReject}
      >
        {title}
      </ButtonCustom>
    </>
  );
}
