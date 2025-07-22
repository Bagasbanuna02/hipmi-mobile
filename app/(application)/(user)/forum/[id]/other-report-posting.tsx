import {
  BoxButtonOnFooter,
  ButtonCustom,
  TextAreaCustom,
  ViewWrapper,
} from "@/components";
import { MainColor } from "@/constants/color-palet";
import { router } from "expo-router";

export default function ForumOtherReportPosting() {
  const handleSubmit = (
    <BoxButtonOnFooter>
      <ButtonCustom
        backgroundColor={MainColor.red}
        textColor={MainColor.white}
        onPress={() => {
          console.log("Report lainnya");
          router.back();
        }}
      >
        Report
      </ButtonCustom>
    </BoxButtonOnFooter>
  );
  return (
    <>
      <ViewWrapper footerComponent={handleSubmit}>
        <TextAreaCustom placeholder="Laporkan Diskusi" />
      </ViewWrapper>
    </>
  );
}
