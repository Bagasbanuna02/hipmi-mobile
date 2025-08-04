import {
  BoxButtonOnFooter,
  ButtonCustom,
  StackCustom,
  ViewWrapper
} from "@/components";
import Donation_ComponentBoxDetailData from "@/screens/Donation/ComponentBoxDetailData";
import Donation_ComponentInfoFundrising from "@/screens/Donation/ComponentInfoFundrising";
import Donation_ComponentStoryFunrising from "@/screens/Donation/ComponentStoryFunrising";
import Donation_ProgressSection from "@/screens/Donation/ProgressSection";
import { useLocalSearchParams } from "expo-router";

export default function DonasiDetailBeranda() {
  const { id } = useLocalSearchParams();

  const buttonSection = (
    <>
      <BoxButtonOnFooter>
        <ButtonCustom>Donasi</ButtonCustom>
      </BoxButtonOnFooter>
    </>
  );

  return (
    <>
      <ViewWrapper footerComponent={buttonSection}>
        <StackCustom>
          <Donation_ComponentBoxDetailData
            bottomSection={<Donation_ProgressSection />}
          />
          <Donation_ComponentInfoFundrising id={id as string} />
          <Donation_ComponentStoryFunrising id={id as string} />
        </StackCustom>
      </ViewWrapper>
    </>
  );
}
