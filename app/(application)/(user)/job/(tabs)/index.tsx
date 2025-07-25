import {
    AvatarUsernameAndOtherComponent,
    BoxWithHeaderSection,
    FloatingButton,
    SearchInput,
    Spacing,
    TextCustom,
    ViewWrapper
} from "@/components";
import { jobDataDummy } from "@/screens/Job/listDataDummy";
import { router } from "expo-router";

export default function JobBeranda() {
  return (
    <ViewWrapper
      hideFooter
      floatingButton={
        <FloatingButton onPress={() => router.push("/job/create")} />
      }
      headerComponent={<SearchInput placeholder="Cari pekerjaan" />}
    >
      {jobDataDummy.map((item, index) => (
        <BoxWithHeaderSection key={index} onPress={() => router.push(`/job/${item.id}`)}>
          <AvatarUsernameAndOtherComponent avatarHref={`/profile/${item.id}`} />
          <Spacing />
          <TextCustom truncate={2} align="center" bold size="large">
            {item.posisi}
          </TextCustom>
          <Spacing />
        </BoxWithHeaderSection>
      ))}
    </ViewWrapper>
  );
}
