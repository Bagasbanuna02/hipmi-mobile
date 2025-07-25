import { BaseBox, TextCustom, ViewWrapper } from "@/components";
import { jobDataDummy } from "@/screens/Job/listDataDummy";

export default function JobArchive() {
  return (
    <ViewWrapper>
      {jobDataDummy.map((e, i) => (
        <BaseBox key={i} paddingBlock={20}>
          <TextCustom align="center" bold truncate size="large">
            {e.posisi}
          </TextCustom>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
