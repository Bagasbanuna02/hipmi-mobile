import { BaseBox, TextCustom, ViewWrapper } from "@/components";
import { jobDataDummy } from "@/screens/Job/listDataDummy";

export default function JobArchive() {
  return (
    <ViewWrapper hideFooter>
      {jobDataDummy.map((e, i) => (
        <BaseBox key={i} paddingTop={20} paddingBottom={20}>
          <TextCustom align="center" bold truncate size="large">
            {e.posisi}
          </TextCustom>
        </BaseBox>
      ))}
    </ViewWrapper>
  );
}
