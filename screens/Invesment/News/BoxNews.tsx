import { BaseBox, Spacing, TextCustom } from "@/components";

export default function Investment_BoxNews({ item }: { item: { id: string; title: string } }) {
  return (
    <>
      <BaseBox paddingBlock={5} href={`/investment/[id]/(news)/${item.id}`}>
        <Spacing height={10} />
        <TextCustom bold truncate={2}>{item.title}</TextCustom>
        <Spacing height={10} />
      </BaseBox>
    </>
  );
}
