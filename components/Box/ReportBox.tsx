import StackCustom from "../Stack/StackCustom";
import TextCustom from "../Text/TextCustom";
import BaseBox from "./BaseBox";

export default function ReportBox({ text }: { text: string }) {
  return (
    <BaseBox>
      <StackCustom gap={"sm"}>
        <TextCustom bold>
          Catatan penolakan
        </TextCustom>
        <TextCustom>{text}</TextCustom>
      </StackCustom>
    </BaseBox>
  );
}
