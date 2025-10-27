import { IconReject } from "@/components/_Icon/IconComponent";
import ButtonCustom from "@/components/Button/ButtonCustom";
import { MainColor } from "@/constants/color-palet";

export default function AdminButtonReject({
  title,
  onReject,
  isLoading,  
}: {
  title: string;
  onReject: () => void;
  isLoading?: boolean;
}) {
  return (
    <>
      <ButtonCustom
        iconLeft={<IconReject size={16} />}
        backgroundColor={MainColor.red}
        textColor="white"
        onPress={onReject}
        isLoading={isLoading}
      >
        {title}
      </ButtonCustom>
    </>
  );
}
