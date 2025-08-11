import TextCustom from "@/components/Text/TextCustom";

export default function AdminTitlePage({ title }: { title: string }) {
  return (
    <>
      <TextCustom bold size={25}>
        {title}
      </TextCustom>
    </>
  );
}
