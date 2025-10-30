import TextCustom from "../Text/TextCustom";

export default function NoDataText({ text }: { text?: string }) {
  return (
    <TextCustom color="gray" align="center" bold size={"small"}>
      {text ? text : "Belum ada data"}
    </TextCustom>
  );
}
