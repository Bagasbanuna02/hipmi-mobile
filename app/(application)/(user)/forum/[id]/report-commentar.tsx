import {
    ButtonCustom,
    Spacing,
    StackCustom,
    ViewWrapper
} from "@/components";
import { AccentColor, MainColor } from "@/constants/color-palet";
import Forum_ReportListSection from "@/screens/Forum/ReportListSection";
import { router } from "expo-router";

export default function ForumReportCommentar() {
  return (
    <>
      <ViewWrapper>
        <StackCustom>
          <Forum_ReportListSection />
          <ButtonCustom
            backgroundColor={MainColor.red}
            textColor={MainColor.white}
            onPress={() => {
              console.log("Report");
              router.back();
            }}
          >
            Report
          </ButtonCustom>
          <ButtonCustom
            backgroundColor={AccentColor.blue}
            textColor={MainColor.white}
            onPress={() => {
              console.log("Lainnya");
              router.replace("/forum/[id]/other-report-commentar");
            }}
          >
            Lainnya
          </ButtonCustom>
          <Spacing/>
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
