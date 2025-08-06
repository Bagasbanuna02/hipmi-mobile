import BaseBox from "@/components/Box/BaseBox";
import TextCustom from "@/components/Text/TextCustom";
import { TEXT_SIZE_LARGE } from "@/constants/constans-value";

export default function AdminComp_BoxTitle({ title , rightComponent}: { title: string , rightComponent?: React.ReactNode}) {
  return (
    <>
      <BaseBox style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextCustom style={{ alignSelf: "center" }} bold size={TEXT_SIZE_LARGE}>
          {title}
        </TextCustom>
        {rightComponent}
      </BaseBox>
    </>
  );
}
